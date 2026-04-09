export type AmoValue = string | number | boolean | null | undefined;

export type AmoCustomFieldValue = {
  value: AmoValue;
};

export type AmoCustomField = {
  field_id: number;
  values: AmoCustomFieldValue[];
};

export type UtmPayload = Partial<{
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}>;

export type SourceValue =
  | 'Сайт'
  | 'Яндекс Бизнес'
  | 'Яндекс Услуги'
  | 'Авито'
  | 'Telegram'
  | 'VK'
  | 'MAX'
  | 'Телфин'
  | 'Почта'
  | 'Повторный клиент'
  | 'Рекомендация'
  | 'Другое';

export type ServiceValue =
  | 'Ремонт кровли'
  | 'Восстановление кровли'
  | 'Гидроизоляция кровли'
  | 'Мягкая кровля / Sinzatim'
  | 'Замена кровли'
  | 'Монтаж кровли'
  | 'Кровля под ключ'
  | 'Устранение протечки'
  | 'Балкон / терраса'
  | 'Герметизация узлов'
  | 'Натяжные потолки';

export type CityValue =
  | 'Симферополь'
  | 'Севастополь'
  | 'Ялта'
  | 'Алушта'
  | 'Феодосия'
  | 'Евпатория'
  | 'Саки'
  | 'Бахчисарай'
  | 'Судак'
  | 'Керчь'
  | 'Джанкой'
  | 'Другое';

export type ObjectTypeValue =
  | 'Частный дом'
  | 'Квартира'
  | 'Коммерческий объект'
  | 'Другое';

export type LossReasonValue =
  | 'Дорого'
  | 'Выбрал конкурента'
  | 'Неактуально'
  | 'Не дозвонились'
  | 'Не наш профиль'
  | 'Отложил'
  | 'Другое';

export type FormType = 'main' | 'service' | 'inspection' | 'callback' | 'unknown';

export interface SiteLeadPayload {
  name?: string;
  phone: string;
  email?: string;
  telegram?: string;
  service?: string;
  city?: string;
  objectType?: string;
  message?: string;
  formType?: FormType;
  formName?: string;
  pagePath?: string;
  referrer?: string;
  source?: SourceValue;
  needsVisit?: boolean;
  visitAt?: string;
  address?: string;
  estimateTotal?: number;
  lossReason?: string;
  utm?: UtmPayload;
  meta?: Record<string, unknown>;
}

export interface NormalizedLeadPayload {
  name?: string;
  phoneRaw: string;
  phoneNormalized: string;
  email?: string;
  telegram?: string;
  service?: ServiceValue;
  city?: CityValue;
  objectType?: ObjectTypeValue;
  message?: string;
  formType: FormType;
  formName?: string;
  pagePath?: string;
  referrer?: string;
  source: SourceValue;
  needsVisit?: boolean;
  visitAt?: string;
  address?: string;
  estimateTotal?: number;
  lossReason?: LossReasonValue;
  utm?: UtmPayload;
  meta?: Record<string, unknown>;
  leadName: string;
  noteText: string;
}

export interface AmoEntityRef {
  id: number;
}

export interface AmoContact extends AmoEntityRef {
  name?: string;
  updated_at?: number;
}

export interface AmoLead extends AmoEntityRef {
  name?: string;
  pipeline_id?: number;
  status_id?: number;
  updated_at?: number;
}

export interface AmoTask extends AmoEntityRef {}

export interface AmoListResponse<T> {
  _embedded?: {
    [key: string]: T[] | undefined;
    contacts?: T[];
    leads?: T[];
  };
}

export interface CreateOrUpdateContactInput {
  name?: string;
  phone?: string;
  email?: string;
  telegram?: string;
}

export interface CreateLeadInput {
  name: string;
  pipelineId: number;
  statusId: number;
  contactId?: number;
  customFieldsValues: AmoCustomField[];
}

export interface UpdateLeadInput {
  leadId: number;
  name?: string;
  statusId?: number;
  customFieldsValues?: AmoCustomField[];
}

export interface CreateTaskInput {
  entityId: number;
  text: string;
  completeTill: number;
}

export type SubmissionMode = 'created' | 'updated' | 'fallback';

export interface LeadSubmissionResult {
  ok: boolean;
  mode: SubmissionMode;
  leadId?: number;
  contactId?: number;
  taskId?: number;
  message: string;
  fallback?: LeadSubmissionFallback;
}

export interface LeadSubmissionFallback {
  reason: string;
  code: 'VALIDATION_ERROR' | 'CONFIG_ERROR' | 'AMO_API_ERROR' | 'UNKNOWN_ERROR';
  payload: Pick<
    NormalizedLeadPayload,
    'name' | 'phoneRaw' | 'phoneNormalized' | 'service' | 'city' | 'message' | 'source' | 'pagePath' | 'formName'
  >;
  details?: string;
}

export interface AmoPipelineConfig {
  id: number;
  statuses: {
    newLead: number;
    qualification?: number;
    inspection?: number;
    estimate?: number;
    inProgress?: number;
    won?: number;
    lost?: number;
  };
  closedStatusIds: number[];
}

export interface AmoFieldConfig {
  lead: {
    serviceId: number;
    sourceId: number;
    cityId: number;
    objectTypeId: number;
    scopeId: number;
    needsVisitId: number;
    visitAtId: number;
    addressId: number;
    estimateTotalId: number;
    lossReasonId: number;
  };
  contact: {
    telegramId?: number;
    emailId?: number;
  };
}

export interface AmoTaskConfig {
  enabled: boolean;
  text: string;
  delayMinutes: number;
}

export interface AmoConfig {
  baseUrl: string;
  accessToken: string;
  pipeline: AmoPipelineConfig;
  fields: AmoFieldConfig;
  task: AmoTaskConfig;
}
