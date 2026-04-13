import { normalizePhone, toCustomField } from './helpers';
import type {
  AmoConfig,
  AmoContact,
  AmoLead,
  AmoListResponse,
  AmoTask,
  CreateLeadInput,
  CreateOrUpdateContactInput,
  CreateTaskInput,
  UpdateLeadInput,
} from './types';

type AmoContactFieldCode = 'PHONE' | 'EMAIL';

type AmoFieldByCode = {
  field_code: AmoContactFieldCode;
  values: Array<{ value: string }>;
};

export class AmoCrmClient {
  constructor(private readonly config: AmoConfig) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`amoCRM request failed (${response.status}) ${path}: ${body}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  async findContactByPhone(phone: string): Promise<AmoContact | null> {
    const normalized = normalizePhone(phone);
    if (!normalized) {
      return null;
    }

    const response = await this.request<AmoListResponse<AmoContact>>(
      `/contacts?query=${encodeURIComponent(normalized)}&limit=10`,
    );

    return response._embedded?.contacts?.[0] ?? null;
  }

  async findContactByEmail(email: string): Promise<AmoContact | null> {
    if (!email) {
      return null;
    }

    const response = await this.request<AmoListResponse<AmoContact>>(
      `/contacts?query=${encodeURIComponent(email)}&limit=10`,
    );

    return response._embedded?.contacts?.[0] ?? null;
  }

  private buildContactCustomFields(input: CreateOrUpdateContactInput): Array<AmoFieldByCode | ReturnType<typeof toCustomField>> {
    const customFields: Array<AmoFieldByCode | ReturnType<typeof toCustomField>> = [];

    if (input.phone) {
      customFields.push({ field_code: 'PHONE', values: [{ value: input.phone }] });
    }

    if (input.email) {
      customFields.push({ field_code: 'EMAIL', values: [{ value: input.email }] });
    }

    if (this.config.fields.contact.telegramId && input.telegram) {
      customFields.push(toCustomField(this.config.fields.contact.telegramId, input.telegram));
    }

    if (this.config.fields.contact.emailId && input.email) {
      customFields.push(toCustomField(this.config.fields.contact.emailId, input.email));
    }

    return customFields.filter(Boolean) as Array<AmoFieldByCode | ReturnType<typeof toCustomField>>;
  }

  async createContact(input: CreateOrUpdateContactInput): Promise<AmoContact> {
    const payload = [
      {
        name: input.name ?? 'Новый контакт',
        custom_fields_values: this.buildContactCustomFields(input),
      },
    ];

    const response = await this.request<{ _embedded?: { contacts?: AmoContact[] } }>('/contacts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const contact = response._embedded?.contacts?.[0];
    if (!contact) {
      throw new Error('amoCRM did not return created contact');
    }

    return contact;
  }

  async updateContact(contactId: number, input: CreateOrUpdateContactInput): Promise<AmoContact> {
    const customFields = this.buildContactCustomFields(input);

    return await this.request<AmoContact>(`/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: contactId,
        ...(input.name ? { name: input.name } : {}),
        ...(customFields.length > 0 ? { custom_fields_values: customFields } : {}),
      }),
    });
  }

  async findRecentLeadByContact(contactId: number): Promise<AmoLead | null> {
    const response = await this.request<AmoListResponse<AmoLead>>(
      `/leads?filter[contacts][0][id]=${contactId}&filter[pipeline_id]=${this.config.pipeline.id}&limit=20`,
    );

    const leads = response._embedded?.leads ?? [];
    const activeLeads = leads.filter((lead) => !this.config.pipeline.closedStatusIds.includes(lead.status_id ?? -1));

    activeLeads.sort((a, b) => (b.updated_at ?? 0) - (a.updated_at ?? 0));
    return activeLeads[0] ?? null;
  }

  async createLead(input: CreateLeadInput): Promise<AmoLead> {
    const payload = [
      {
        name: input.name,
        pipeline_id: input.pipelineId,
        status_id: input.statusId,
        custom_fields_values: input.customFieldsValues,
        _embedded: input.contactId
          ? {
              contacts: [{ id: input.contactId }],
            }
          : undefined,
      },
    ];

    const response = await this.request<{ _embedded?: { leads?: AmoLead[] } }>('/leads', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const lead = response._embedded?.leads?.[0];
    if (!lead) {
      throw new Error('amoCRM did not return created lead');
    }

    return lead;
  }

  async updateLead(input: UpdateLeadInput): Promise<AmoLead> {
    return await this.request<AmoLead>(`/leads/${input.leadId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: input.leadId,
        ...(input.name ? { name: input.name } : {}),
        ...(input.statusId ? { status_id: input.statusId } : {}),
        ...(input.customFieldsValues ? { custom_fields_values: input.customFieldsValues } : {}),
      }),
    });
  }

  async addLeadNote(leadId: number, text: string): Promise<void> {
    await this.request(`/leads/${leadId}/notes`, {
      method: 'POST',
      body: JSON.stringify([
        {
          note_type: 'common',
          params: {
            text,
          },
        },
      ]),
    });
  }

  async createTask(input: CreateTaskInput): Promise<AmoTask> {
    const response = await this.request<{ _embedded?: { tasks?: AmoTask[] } }>('/tasks', {
      method: 'POST',
      body: JSON.stringify([
        {
          text: input.text,
          entity_id: input.entityId,
          entity_type: 'leads',
          complete_till: input.completeTill,
        },
      ]),
    });

    const task = response._embedded?.tasks?.[0];
    if (!task) {
      throw new Error('amoCRM did not return created task');
    }

    return task;
  }
}
