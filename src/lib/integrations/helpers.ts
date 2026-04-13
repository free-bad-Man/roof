import type {
  AmoCustomField,
  AmoValue,
  CityValue,
  LossReasonValue,
  NormalizedLeadPayload,
  ObjectTypeValue,
  ServiceValue,
  SiteLeadPayload,
  SourceValue,
  UtmPayload,
} from './types';

const CITY_VALUES: CityValue[] = [
  'Симферополь',
  'Севастополь',
  'Ялта',
  'Алушта',
  'Феодосия',
  'Евпатория',
  'Саки',
  'Бахчисарай',
  'Судак',
  'Керчь',
  'Джанкой',
  'Другое',
];

const OBJECT_TYPE_VALUES: ObjectTypeValue[] = ['Частный дом', 'Квартира', 'Коммерческий объект', 'Другое'];

const LOSS_REASON_VALUES: LossReasonValue[] = [
  'Дорого',
  'Выбрал конкурента',
  'Неактуально',
  'Не дозвонились',
  'Не наш профиль',
  'Отложил',
  'Другое',
];

const SOURCE_VALUES: SourceValue[] = [
  'Сайт',
  'Яндекс Бизнес',
  'Яндекс Услуги',
  'Авито',
  'Telegram',
  'VK',
  'MAX',
  'Телфин',
  'Почта',
  'Повторный клиент',
  'Рекомендация',
  'Другое',
];

const SERVICE_VALUES: ServiceValue[] = [
  'Ремонт кровли',
  'Восстановление кровли',
  'Гидроизоляция кровли',
  'Мягкая кровля / Sinzatim',
  'Замена кровли',
  'Монтаж кровли',
  'Кровля под ключ',
  'Устранение протечки',
  'Балкон / терраса',
  'Герметизация узлов',
  'Натяжные потолки',
];

export function cleanString(value?: string | null): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const cleaned = value.replace(/\s+/g, ' ').trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D+/g, '');

  if (!digits) {
    return '';
  }

  if (digits.length === 11 && digits.startsWith('8')) {
    return `7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `7${digits}`;
  }

  return digits;
}

export function normalizeBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'y', 'да'].includes(normalized)) {
      return true;
    }
    if (['false', '0', 'no', 'n', 'нет'].includes(normalized)) {
      return false;
    }
  }

  return undefined;
}

export function normalizeNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const cleaned = value.replace(/\s+/g, '').replace(',', '.');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function matchKnownValue<T extends string>(value: string | undefined, knownValues: readonly T[]): T | undefined {
  const normalized = cleanString(value)?.toLowerCase();
  if (!normalized) {
    return undefined;
  }

  return knownValues.find((item) => item.toLowerCase() === normalized);
}

export function normalizeCity(value?: string): CityValue | undefined {
  if (!value) {
    return undefined;
  }

  const exact = matchKnownValue(value, CITY_VALUES);
  if (exact) {
    return exact;
  }

  const normalized = value.toLowerCase();
  if (normalized.includes('симфер')) return 'Симферополь';
  if (normalized.includes('севаст')) return 'Севастополь';
  if (normalized.includes('ялт')) return 'Ялта';
  if (normalized.includes('алушт')) return 'Алушта';
  if (normalized.includes('феодос')) return 'Феодосия';
  if (normalized.includes('евпатор')) return 'Евпатория';
  if (normalized.includes('сак')) return 'Саки';
  if (normalized.includes('бахчис')) return 'Бахчисарай';
  if (normalized.includes('судак')) return 'Судак';
  if (normalized.includes('керч')) return 'Керчь';
  if (normalized.includes('джанк')) return 'Джанкой';

  return 'Другое';
}

export function normalizeObjectType(value?: string): ObjectTypeValue | undefined {
  if (!value) {
    return undefined;
  }

  const exact = matchKnownValue(value, OBJECT_TYPE_VALUES);
  if (exact) {
    return exact;
  }

  const normalized = value.toLowerCase();
  if (normalized.includes('дом')) return 'Частный дом';
  if (normalized.includes('кварт')) return 'Квартира';
  if (normalized.includes('коммер')) return 'Коммерческий объект';
  return 'Другое';
}

export function normalizeLossReason(value?: string): LossReasonValue | undefined {
  return value ? matchKnownValue(value, LOSS_REASON_VALUES) ?? 'Другое' : undefined;
}

export function normalizeSource(value?: string): SourceValue {
  return matchKnownValue(value, SOURCE_VALUES) ?? 'Сайт';
}

export function isKnownServiceValue(value?: string): value is ServiceValue {
  return !!matchKnownValue(value, SERVICE_VALUES);
}

export function toCustomField(fieldId: number, value: AmoValue): AmoCustomField | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return {
    field_id: fieldId,
    values: [{ value }],
  };
}

export function compactFields(fields: Array<AmoCustomField | undefined>): AmoCustomField[] {
  return fields.filter((field): field is AmoCustomField => Boolean(field));
}

export function buildLeadName(input: {
  service?: ServiceValue;
  city?: CityValue;
  name?: string;
}): string {
  const parts = [input.service, input.city, input.name ?? 'Новый клиент'].filter(Boolean);
  return parts.length > 0 ? parts.join(' — ') : 'Новая заявка';
}

function buildUtmLines(utm?: UtmPayload): string[] {
  if (!utm) {
    return [];
  }

  const entries: Array<[string, string | undefined]> = [
    ['utm_source', cleanString(utm.source)],
    ['utm_medium', cleanString(utm.medium)],
    ['utm_campaign', cleanString(utm.campaign)],
    ['utm_term', cleanString(utm.term)],
    ['utm_content', cleanString(utm.content)],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return entries.map(([key, value]) => `${key}: ${value}`);
}

export function buildLeadNote(payload: SiteLeadPayload, service?: ServiceValue): string {
  const lines: string[] = [];

  lines.push('Заявка с сайта');

  const formName = cleanString(payload.formName);
  const pagePath = cleanString(payload.pagePath);
  const referrer = cleanString(payload.referrer);
  const message = cleanString(payload.message);
  const city = cleanString(payload.city);
  const objectType = cleanString(payload.objectType);

  if (formName) lines.push(`Форма: ${formName}`);
  if (pagePath) lines.push(`Страница: ${pagePath}`);
  if (service) lines.push(`Услуга: ${service}`);
  if (city) lines.push(`Город: ${city}`);
  if (objectType) lines.push(`Тип объекта: ${objectType}`);
  if (referrer) lines.push(`Referrer: ${referrer}`);
  lines.push(...buildUtmLines(payload.utm));
  if (message) lines.push(`Комментарий: ${message}`);

  return lines.join('\n');
}

export function normalizePayloadBase(payload: SiteLeadPayload): Omit<
  NormalizedLeadPayload,
  'service' | 'leadName' | 'noteText'
> {
  const phoneRaw = cleanString(payload.phone) ?? '';
  const phoneNormalized = normalizePhone(phoneRaw);
  const formType = payload.formType ?? 'unknown';

  return {
    name: cleanString(payload.name),
    phoneRaw,
    phoneNormalized,
    email: cleanString(payload.email),
    telegram: cleanString(payload.telegram),
    city: normalizeCity(payload.city),
    objectType: normalizeObjectType(payload.objectType),
    message: cleanString(payload.message),
    formType,
    formName: cleanString(payload.formName),
    pagePath: cleanString(payload.pagePath),
    referrer: cleanString(payload.referrer),
    source: normalizeSource(payload.source),
    needsVisit: normalizeBoolean(payload.needsVisit),
    visitAt: cleanString(payload.visitAt),
    address: cleanString(payload.address),
    estimateTotal: normalizeNumber(payload.estimateTotal),
    lossReason: normalizeLossReason(payload.lossReason),
    utm: payload.utm,
    meta: payload.meta,
  };
}
