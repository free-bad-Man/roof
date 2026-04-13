import type {
  LeadFormVariant,
  LeadRequestPayload,
  LeadResponsePayload,
} from '@/shared/types/lead';

export const LEAD_ENDPOINT = '/api/leads';

export function getFormNameByVariant(variant: LeadFormVariant) {
  switch (variant) {
    case 'service':
      return 'Сайт — Страница услуги';
    case 'inspection':
      return 'Сайт — Замер / фото';
    case 'main':
    default:
      return 'Сайт — Главная форма';
  }
}

function getTrimmedValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function pickUtm(searchParams: URLSearchParams) {
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'yclid', 'ysclid'];
  return keys.reduce<Record<string, string>>((acc, key) => {
    const value = searchParams.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});
}

export function buildLeadPayload({
  formData,
  variant,
  pagePath,
  pageTitle,
  searchParams,
  referer,
}: {
  formData: FormData;
  variant: LeadFormVariant;
  pagePath: string;
  pageTitle?: string;
  searchParams: URLSearchParams;
  referer?: string;
}): LeadRequestPayload {
  const payload: LeadRequestPayload = {
    source: 'Сайт',
    formName: getFormNameByVariant(variant),
    pagePath,
    pageTitle,
    referer,
    utm: pickUtm(searchParams),
    client: {
      name: getTrimmedValue(formData, 'name'),
      phone: getTrimmedValue(formData, 'phone'),
    },
    deal: {
      service: getTrimmedValue(formData, 'service') || undefined,
      city: getTrimmedValue(formData, 'city') || undefined,
      comment: getTrimmedValue(formData, 'comment'),
    },
  };

  return payload;
}

export async function submitLeadPayload(
  payload: LeadRequestPayload,
  endpoint: string = LEAD_ENDPOINT,
): Promise<LeadResponsePayload> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as LeadResponsePayload | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data?.message || 'Не удалось отправить заявку.');
  }

  return data;
}
