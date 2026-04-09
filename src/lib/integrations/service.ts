import { getAmoConfig } from './config';
import { compactFields, toCustomField } from './helpers';
import { mapSiteLeadPayload } from './mapping';
import { buildFallbackResult, handleSubmissionError } from './fallback';
import { AmoCrmClient } from './client';
import type { LeadSubmissionResult, SiteLeadPayload } from './types';

function buildLeadCustomFields(clientConfig: ReturnType<typeof getAmoConfig>, payload: ReturnType<typeof mapSiteLeadPayload>) {
  const { lead } = clientConfig.fields;

  return compactFields([
    toCustomField(lead.serviceId, payload.service),
    toCustomField(lead.sourceId, payload.source),
    toCustomField(lead.cityId, payload.city),
    toCustomField(lead.objectTypeId, payload.objectType),
    toCustomField(lead.scopeId, payload.message),
    toCustomField(lead.needsVisitId, payload.needsVisit),
    toCustomField(lead.visitAtId, payload.visitAt),
    toCustomField(lead.addressId, payload.address),
    toCustomField(lead.estimateTotalId, payload.estimateTotal),
    toCustomField(lead.lossReasonId, payload.lossReason),
  ]);
}

export async function submitSiteLead(input: SiteLeadPayload): Promise<LeadSubmissionResult> {
  const normalized = mapSiteLeadPayload(input);

  if (!normalized.phoneNormalized) {
    return buildFallbackResult('Phone is required', 'VALIDATION_ERROR', normalized);
  }

  let config;
  try {
    config = getAmoConfig();
  } catch (error) {
    return handleSubmissionError(error, normalized, 'CONFIG_ERROR');
  }

  const client = new AmoCrmClient(config);

  try {
    let contact = await client.findContactByPhone(normalized.phoneNormalized);

    if (!contact && normalized.email) {
      contact = await client.findContactByEmail(normalized.email);
    }

    if (!contact) {
      contact = await client.createContact({
        name: normalized.name,
        phone: normalized.phoneRaw,
        email: normalized.email,
        telegram: normalized.telegram,
      });
    } else {
      contact = await client.updateContact(contact.id, {
        name: normalized.name,
        phone: normalized.phoneRaw,
        email: normalized.email,
        telegram: normalized.telegram,
      });
    }

    const customFieldsValues = buildLeadCustomFields(config, normalized);
    const existingLead = await client.findRecentLeadByContact(contact.id);

    if (existingLead) {
      const updatedLead = await client.updateLead({
        leadId: existingLead.id,
        name: normalized.leadName,
        customFieldsValues,
      });

      await client.addLeadNote(updatedLead.id, normalized.noteText);

      return {
        ok: true,
        mode: 'updated',
        leadId: updatedLead.id,
        contactId: contact.id,
        message: 'Lead updated in amoCRM',
      };
    }

    const createdLead = await client.createLead({
      name: normalized.leadName,
      pipelineId: config.pipeline.id,
      statusId: config.pipeline.statuses.newLead,
      contactId: contact.id,
      customFieldsValues,
    });

    await client.addLeadNote(createdLead.id, normalized.noteText);

    let taskId: number | undefined;
    if (config.task.enabled) {
      const completeTill = Math.floor(Date.now() / 1000) + config.task.delayMinutes * 60;
      const task = await client.createTask({
        entityId: createdLead.id,
        text: config.task.text,
        completeTill,
      });
      taskId = task.id;
    }

    return {
      ok: true,
      mode: 'created',
      leadId: createdLead.id,
      contactId: contact.id,
      taskId,
      message: 'Lead created in amoCRM',
    };
  } catch (error) {
    return handleSubmissionError(error, normalized, 'AMO_API_ERROR');
  }
}

export function buildLeadPreview(input: SiteLeadPayload) {
  return mapSiteLeadPayload(input);
}
