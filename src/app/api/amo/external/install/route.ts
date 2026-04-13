import {
  getExternalRedirectUri,
  maskSecret,
  saveInstallPayload,
} from '@/lib/integrations/amocrm-external';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PrimitiveMap = Record<string, string>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

async function readBodyMap(request: Request): Promise<PrimitiveMap> {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';

  if (contentType.includes('application/json')) {
    const json = (await request.json().catch(() => null)) as
      | Record<string, unknown>
      | null;

    if (!json) {
      return {};
    }

    const result: PrimitiveMap = {};
    for (const [key, value] of Object.entries(json)) {
      if (typeof value === 'string') {
        result[key] = value;
      }
    }

    return result;
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData().catch(() => null);
    const result: PrimitiveMap = {};

    if (!formData) {
      return result;
    }

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        result[key] = value;
      }
    }

    return result;
  }

  return {};
}

function mergeParams(url: URL, body: PrimitiveMap) {
  const result: PrimitiveMap = {};

  for (const [key, value] of url.searchParams.entries()) {
    result[key] = value;
  }

  for (const [key, value] of Object.entries(body)) {
    result[key] = value;
  }

  return result;
}

async function handleInstall(request: Request) {
  const url = new URL(request.url);
  const body = request.method === 'POST' ? await readBodyMap(request) : {};
  const input = mergeParams(url, body);

  const clientId = input.client_id;
  const clientSecret = input.client_secret;
  const state = input.state;
  const referer = input.referer;

  if (!isNonEmptyString(clientId) || !isNonEmptyString(clientSecret)) {
    return Response.json(
      {
        ok: false,
        message: 'client_id и client_secret обязательны.',
      },
      { status: 400 },
    );
  }

  const record = await saveInstallPayload({
    clientId,
    clientSecret,
    ...(isNonEmptyString(state) ? { state } : {}),
    ...(isNonEmptyString(referer) ? { referer } : {}),
  });

  return Response.json({
    ok: true,
    message: 'amoCRM external install payload сохранён.',
    install: {
      key: record.key,
      clientId: record.clientId,
      clientSecretMasked: maskSecret(record.clientSecret),
      state: record.state ?? null,
      referer: record.referer ?? null,
      baseUrl: record.baseUrl ?? null,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    },
    redirectUri: getExternalRedirectUri(),
  });
}

export async function GET(request: Request) {
  return handleInstall(request);
}

export async function POST(request: Request) {
  return handleInstall(request);
}