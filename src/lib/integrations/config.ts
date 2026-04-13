declare const process: { env: Record<string, string | undefined> };

import type { AmoConfig } from './types';

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readRequiredEnv(name: string): string {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function readNumberEnv(name: string, required = true): number | undefined {
  const raw = required ? readRequiredEnv(name) : readEnv(name);
  if (!raw) {
    return undefined;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric env: ${name}`);
  }

  return parsed;
}

function readNumberListEnv(name: string): number[] {
  const raw = readEnv(name);
  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item));
}

export function getAmoConfig(): AmoConfig {
  const explicitBaseUrl = readEnv('AMOCRM_BASE_URL');
  const subdomain = readEnv('AMOCRM_SUBDOMAIN');

  const baseUrl = explicitBaseUrl
    ? explicitBaseUrl.replace(/\/$/, '')
    : `https://${readRequiredEnv('AMOCRM_SUBDOMAIN')}.amocrm.ru/api/v4`;

  if (!explicitBaseUrl && !subdomain) {
    throw new Error('Missing required env: AMOCRM_SUBDOMAIN');
  }

  return {
    baseUrl,
    accessToken: readRequiredEnv('AMOCRM_ACCESS_TOKEN'),
    pipeline: {
      id: readNumberEnv('AMOCRM_PIPELINE_ID')!,
      statuses: {
        newLead: readNumberEnv('AMOCRM_STATUS_NEW_ID')!,
        qualification: readNumberEnv('AMOCRM_STATUS_QUALIFICATION_ID', false),
        inspection: readNumberEnv('AMOCRM_STATUS_INSPECTION_ID', false),
        estimate: readNumberEnv('AMOCRM_STATUS_ESTIMATE_ID', false),
        inProgress: readNumberEnv('AMOCRM_STATUS_IN_PROGRESS_ID', false),
        won: readNumberEnv('AMOCRM_STATUS_WON_ID', false),
        lost: readNumberEnv('AMOCRM_STATUS_LOST_ID', false),
      },
      closedStatusIds: readNumberListEnv('AMOCRM_CLOSED_STATUS_IDS'),
    },
    fields: {
      lead: {
        serviceId: readNumberEnv('AMOCRM_FIELD_SERVICE_ID')!,
        sourceId: readNumberEnv('AMOCRM_FIELD_SOURCE_ID')!,
        cityId: readNumberEnv('AMOCRM_FIELD_CITY_ID')!,
        objectTypeId: readNumberEnv('AMOCRM_FIELD_OBJECT_TYPE_ID')!,
        scopeId: readNumberEnv('AMOCRM_FIELD_SCOPE_ID')!,
        needsVisitId: readNumberEnv('AMOCRM_FIELD_NEEDS_VISIT_ID')!,
        visitAtId: readNumberEnv('AMOCRM_FIELD_VISIT_AT_ID')!,
        addressId: readNumberEnv('AMOCRM_FIELD_ADDRESS_ID')!,
        estimateTotalId: readNumberEnv('AMOCRM_FIELD_ESTIMATE_TOTAL_ID')!,
        lossReasonId: readNumberEnv('AMOCRM_FIELD_LOSS_REASON_ID')!,
      },
      contact: {
        telegramId: readNumberEnv('AMOCRM_CONTACT_FIELD_TELEGRAM_ID', false),
        emailId: readNumberEnv('AMOCRM_CONTACT_FIELD_EMAIL_ID', false),
      },
    },
    task: {
      enabled: readEnv('AMOCRM_CREATE_INITIAL_TASK') !== 'false',
      text: readEnv('AMOCRM_INITIAL_TASK_TEXT') ?? 'Связаться с клиентом',
      delayMinutes: readNumberEnv('AMOCRM_INITIAL_TASK_DELAY_MINUTES', false) ?? 15,
    },
  };
}
