import type { NextRequest } from 'next/server';
import type {
  LeadRequestPayload,
  LeadResponsePayload,
} from '@/shared/types/lead';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type AmoFieldIds = Partial<
  Record<
    | 'source'
    | 'service'
    | 'city'
    | 'formName'
    | 'pagePath'
    | 'pageTitle'
    | 'referer',
    number
  >
>;

type AmoAccessTokenResponse = {
  access_token: string;
};

type AmoLeadResponseItem = {
  id?: number;
};

function jsonResponse(
  body: LeadResponsePayload,
  status = 200,
): Response {
  return Response.json(body, { status });
}

function badRequest(message: string, status = 400) {
  return jsonResponse({ ok: false, message }, status);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function parseIntegerEnv(name: string): number | null {
  const raw = process.env[name];

  if (!raw) {
    return null;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseAmoFieldIds(): AmoFieldIds {
  const raw = process.env.AMOCRM_FIELD_IDS_JSON;

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: AmoFieldIds = {};

    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        result[key as keyof AmoFieldIds] = value;
      }

      if (typeof value === 'string' && value.trim()) {
        const numeric = Number.parseInt(value, 10);

        if (Number.isFinite(numeric)) {
          result[key as keyof AmoFieldIds] = numeric;
        }
      }
    }

    return result;
  } catch {
    return {};
  }
}

function buildLeadName(payload: LeadRequestPayload) {
  const parts = [
    payload.deal.service?.trim(),
    payload.deal.city?.trim(),
    payload.client.name.trim(),
  ].filter(Boolean);

  return parts.join(' — ') || 'Заявка с сайта';
}

function buildComment(payload: LeadRequestPayload) {
  const lines: string[] = [
    `Форма: ${payload.formName}`,
    `Источник: ${payload.source}`,
    `Страница: ${payload.pagePath}`,
  ];

  if (isNonEmptyString(payload.pageTitle)) {
    lines.push(`Заголовок страницы: ${payload.pageTitle.trim()}`);
  }

  if (isNonEmptyString(payload.referer)) {
    lines.push(`Referer: ${payload.referer.trim()}`);
  }

  lines.push('');
  lines.push('Задача клиента:');
  lines.push(payload.deal.comment.trim());

  if (isNonEmptyString(payload.client.telegram)) {
    lines.push('');
    lines.push(`Telegram: ${payload.client.telegram.trim()}`);
  }

  if (payload.utm && Object.keys(payload.utm).length > 0) {
    lines.push('');
    lines.push('UTM:');
    for (const [key, value] of Object.entries(payload.utm)) {
      if (isNonEmptyString(value)) {
        lines.push(`${key}: ${value.trim()}`);
      }
    }
  }

  return lines.join('\n');
}

function buildLeadCustomFields(
  payload: LeadRequestPayload,
  fieldIds: AmoFieldIds,
) {
  const items: Array<{
    field_id: number;
    values: Array<{ value: string }>;
  }> = [];

  const pushField = (fieldId: number | undefined, value: string | undefined) => {
    if (!fieldId || !isNonEmptyString(value)) {
      return;
    }

    items.push({
      field_id: fieldId,
      values: [{ value: value.trim() }],
    });
  };

  pushField(fieldIds.source, payload.source);
  pushField(fieldIds.service, payload.deal.service);
  pushField(fieldIds.city, payload.deal.city);
  pushField(fieldIds.formName, payload.formName);
  pushField(fieldIds.pagePath, payload.pagePath);
  pushField(fieldIds.pageTitle, payload.pageTitle);
  pushField(fieldIds.referer, payload.referer);

  return items;
}

function getAmoConfig() {
  const baseUrl = process.env.AMOCRM_BASE_URL?.trim() ?? '';
  const clientId = process.env.AMOCRM_CLIENT_ID?.trim() ?? '';
  const clientSecret = process.env.AMOCRM_CLIENT_SECRET?.trim() ?? '';
  const redirectUri = process.env.AMOCRM_REDIRECT_URI?.trim() ?? '';
  const refreshToken = process.env.AMOCRM_REFRESH_TOKEN?.trim() ?? '';
  const pipelineId = parseIntegerEnv('AMOCRM_PIPELINE_ID');
  const statusId = parseIntegerEnv('AMOCRM_STATUS_NEW_ID');
  const responsibleUserId = parseIntegerEnv('AMOCRM_RESPONSIBLE_USER_ID');

  const isConfigured =
    Boolean(baseUrl) &&
    Boolean(clientId) &&
    Boolean(clientSecret) &&
    Boolean(redirectUri) &&
    Boolean(refreshToken) &&
    pipelineId !== null &&
    statusId !== null;

  return {
    baseUrl,
    clientId,
    clientSecret,
    redirectUri,
    refreshToken,
    pipelineId,
    statusId,
    responsibleUserId,
    isConfigured,
  };
}

async function getAmoAccessToken() {
  const config = getAmoConfig();

  if (!config.isConfigured) {
    throw new Error('amoCRM не настроен.');
  }

  const response = await fetch(`${config.baseUrl}/oauth2/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: config.refreshToken,
      redirect_uri: config.redirectUri,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(
      `Не удалось обновить access token amoCRM. ${details || `HTTP ${response.status}`}`,
    );
  }

  const json = (await response.json()) as AmoAccessTokenResponse;

  if (!isNonEmptyString(json.access_token)) {
    throw new Error('amoCRM вернул пустой access token.');
  }

  return json.access_token;
}

async function createAmoLead(payload: LeadRequestPayload) {
  const config = getAmoConfig();

  if (!config.isConfigured || config.pipelineId === null || config.statusId === null) {
    throw new Error('amoCRM не настроен.');
  }

  const accessToken = await getAmoAccessToken();
  const fieldIds = parseAmoFieldIds();

  const leadPayload = [
    {
      name: buildLeadName(payload),
      pipeline_id: config.pipelineId,
      status_id: config.statusId,
      ...(config.responsibleUserId
        ? { responsible_user_id: config.responsibleUserId }
        : {}),
      custom_fields_values: buildLeadCustomFields(payload, fieldIds),
      _embedded: {
        contacts: [
          {
            first_name: payload.client.name.trim(),
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [{ value: payload.client.phone.trim() }],
              },
              ...(isNonEmptyString(payload.client.email)
                ? [
                    {
                      field_code: 'EMAIL',
                      values: [{ value: payload.client.email.trim() }],
                    },
                  ]
                : []),
            ],
          },
        ],
      },
    },
  ];

  const response = await fetch(`${config.baseUrl}/api/v4/leads/complex`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
    body: JSON.stringify(leadPayload),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(
      `Не удалось создать лид в amoCRM. ${details || `HTTP ${response.status}`}`,
    );
  }

  const json = (await response.json()) as {
    _embedded?: {
      leads?: AmoLeadResponseItem[];
    };
  };

  const leadId = json._embedded?.leads?.[0]?.id;

  await addAmoLeadNote({
    baseUrl: config.baseUrl,
    accessToken,
    leadId,
    noteText: buildComment(payload),
  });

  return {
    leadId: leadId ? String(leadId) : undefined,
  };
}

async function addAmoLeadNote(params: {
  baseUrl: string;
  accessToken: string;
  leadId?: number;
  noteText: string;
}) {
  if (!params.leadId) {
    return;
  }

  await fetch(`${params.baseUrl}/api/v4/leads/${params.leadId}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.accessToken}`,
    },
    cache: 'no-store',
    body: JSON.stringify([
      {
        note_type: 'common',
        params: {
          text: params.noteText,
        },
      },
    ]),
  }).catch(() => {
    // Нота не должна ломать приём лида.
  });
}

function getWebhookConfig() {
  const url = process.env.LEAD_WEBHOOK_URL?.trim() ?? '';
  const token = process.env.LEAD_WEBHOOK_TOKEN?.trim() ?? '';

  return {
    url,
    token,
    isConfigured: Boolean(url),
  };
}

async function sendToWebhook(payload: LeadRequestPayload) {
  const webhook = getWebhookConfig();

  if (!webhook.isConfigured) {
    throw new Error('Webhook не настроен.');
  }

  const response = await fetch(webhook.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(webhook.token ? { Authorization: `Bearer ${webhook.token}` } : {}),
    },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(
      `Не удалось передать заявку в webhook-интеграцию. ${details || `HTTP ${response.status}`}`,
    );
  }

  return {};
}

function validatePayload(payload: LeadRequestPayload | null) {
  if (!payload) {
    return 'Некорректное тело запроса.';
  }

  if (!isNonEmptyString(payload.client?.name)) {
    return 'Поле «Имя» обязательно.';
  }

  if (!isNonEmptyString(payload.client?.phone)) {
    return 'Поле «Телефон» обязательно.';
  }

  if (!isNonEmptyString(payload.deal?.comment)) {
    return 'Поле с описанием задачи обязательно.';
  }

  if (!isNonEmptyString(payload.formName)) {
    return 'Поле formName обязательно.';
  }

  if (!isNonEmptyString(payload.pagePath)) {
    return 'Поле pagePath обязательно.';
  }

  return null;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as LeadRequestPayload | null;
  const validationError = validatePayload(payload);

  if (validationError || !payload) {
    return badRequest(validationError ?? 'Некорректное тело запроса.');
  }

  const amoConfig = getAmoConfig();
  const webhookConfig = getWebhookConfig();

  if (!amoConfig.isConfigured && !webhookConfig.isConfigured) {
    return badRequest(
      'Не настроен приём заявок. Заполните amoCRM env-переменные или включите fallback через LEAD_WEBHOOK_URL.',
      501,
    );
  }

  try {
    if (amoConfig.isConfigured) {
      const result = await createAmoLead(payload);

      return jsonResponse({
        ok: true,
        message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        ...(result.leadId ? { leadId: result.leadId } : {}),
      });
    }

    await sendToWebhook(payload);

    return jsonResponse({
      ok: true,
      message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    });
  } catch (amoError) {
    if (webhookConfig.isConfigured) {
      try {
        await sendToWebhook(payload);

        return jsonResponse({
          ok: true,
          message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        });
      } catch (webhookError) {
        const message =
          webhookError instanceof Error
            ? webhookError.message
            : 'Не удалось передать заявку в резервный webhook.';
        return badRequest(message, 502);
      }
    }

    const message =
      amoError instanceof Error
        ? amoError.message
        : 'Не удалось передать заявку в amoCRM.';
    return badRequest(message, 502);
  }
}