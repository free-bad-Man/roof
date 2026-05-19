const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function cleanValue(value: string | null) {
  return value?.trim() || '';
}

export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = cleanValue(params.get(key));

    if (value) {
      utm[key] = value;
    }
  }

  return utm;
}

export function hasUtmParams(utm: UtmParams) {
  return Object.values(utm).some((value) => Boolean(value?.trim()));
}

export function appendUtmToFormData(formData: FormData, utm = getUtmParams()) {
  for (const [key, value] of Object.entries(utm)) {
    if (value?.trim()) {
      formData.set(key, value.trim());
    }
  }
}
