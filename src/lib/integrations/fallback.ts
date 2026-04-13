import type {
  LeadSubmissionFallback,
  LeadSubmissionResult,
  NormalizedLeadPayload,
} from './types';

function toFallbackPayload(payload: NormalizedLeadPayload): LeadSubmissionFallback['payload'] {
  return {
    name: payload.name,
    phoneRaw: payload.phoneRaw,
    phoneNormalized: payload.phoneNormalized,
    service: payload.service,
    city: payload.city,
    message: payload.message,
    source: payload.source,
    pagePath: payload.pagePath,
    formName: payload.formName,
  };
}

export function buildFallbackResult(
  reason: string,
  code: LeadSubmissionFallback['code'],
  payload: NormalizedLeadPayload,
  details?: string,
): LeadSubmissionResult {
  return {
    ok: false,
    mode: 'fallback',
    message: reason,
    fallback: {
      reason,
      code,
      payload: toFallbackPayload(payload),
      details,
    },
  };
}

export function handleSubmissionError(
  error: unknown,
  payload: NormalizedLeadPayload,
  code: LeadSubmissionFallback['code'],
): LeadSubmissionResult {
  const message = error instanceof Error ? error.message : 'Unknown integration error';

  console.error('[amocrm] lead submission fallback', {
    code,
    message,
    payload: toFallbackPayload(payload),
  });

  return buildFallbackResult('Lead submission fallback', code, payload, message);
}
