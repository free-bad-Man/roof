import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type AmoExternalInstallPayload = {
  clientId: string;
  clientSecret: string;
  state?: string;
  referer?: string;
};

export type AmoExternalTokenSet = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  serverTime?: number;
  baseUrl: string;
};

type AmoExternalInstallRecord = {
  key: string;
  clientId: string;
  clientSecret: string;
  state?: string;
  referer?: string;
  baseUrl?: string;
  createdAt: string;
  updatedAt: string;
  tokens?: AmoExternalTokenSet;
  lastCallback?: {
    code?: string;
    fromWidget?: string;
    receivedAt: string;
  };
};

type AmoExternalStore = {
  installs: AmoExternalInstallRecord[];
};

type ExchangeCodeParams = {
  code: string;
  referer?: string;
  install: AmoExternalInstallRecord;
};

const DEFAULT_STORAGE_RELATIVE_PATH = '.runtime/amocrm-external.json';

function nowIso() {
  return new Date().toISOString();
}

function ensureTrailingSlash(value: string) {
  return value.endsWith('/') ? value : `${value}/`;
}

function getStoragePath() {
  const configured =
    process.env.AMOCRM_EXTERNAL_INSTALL_STORAGE_PATH?.trim() || '';

  if (configured) {
    return path.isAbsolute(configured)
      ? configured
      : path.join(process.cwd(), configured);
  }

  return path.join(process.cwd(), DEFAULT_STORAGE_RELATIVE_PATH);
}

export function getExternalRedirectUri() {
  const explicit =
    process.env.AMOCRM_EXTERNAL_REDIRECT_URI?.trim() ||
    process.env.AMOCRM_REDIRECT_URI?.trim();

  if (explicit) {
    return ensureTrailingSlash(explicit);
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'
  ).replace(/\/+$/, '');

  return `${siteUrl}/api/amo/oauth/callback/`;
}

function normalizeAmoBaseUrl(input?: string | null) {
  if (!input) {
    return null;
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(withProtocol);
    const hostname = url.hostname.toLowerCase();

    if (!hostname.endsWith('.amocrm.ru') && !hostname.endsWith('.kommo.com')) {
      return null;
    }

    return `${url.protocol}//${hostname}`;
  } catch {
    return null;
  }
}

function buildRecordKey(input: {
  state?: string;
  referer?: string;
  clientId: string;
}) {
  const normalizedBaseUrl = normalizeAmoBaseUrl(input.referer);

  if (input.state?.trim()) {
    return `state:${input.state.trim()}`;
  }

  if (normalizedBaseUrl) {
    return `base:${normalizedBaseUrl}`;
  }

  return `client:${input.clientId.trim()}`;
}

async function readStore(): Promise<AmoExternalStore> {
  const storagePath = getStoragePath();

  try {
    const raw = await readFile(storagePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<AmoExternalStore>;

    return {
      installs: Array.isArray(parsed.installs) ? parsed.installs : [],
    };
  } catch {
    return { installs: [] };
  }
}

async function writeStore(store: AmoExternalStore) {
  const storagePath = getStoragePath();
  await mkdir(path.dirname(storagePath), { recursive: true });
  await writeFile(storagePath, JSON.stringify(store, null, 2), 'utf8');
}

export async function saveInstallPayload(
  payload: AmoExternalInstallPayload,
): Promise<AmoExternalInstallRecord> {
  const store = await readStore();
  const normalizedBaseUrl = normalizeAmoBaseUrl(payload.referer);
  const recordKey = buildRecordKey({
    state: payload.state,
    referer: payload.referer,
    clientId: payload.clientId,
  });

  const existingIndex = store.installs.findIndex((item) => item.key === recordKey);
  const timestamp = nowIso();

  const record: AmoExternalInstallRecord = {
    key: recordKey,
    clientId: payload.clientId.trim(),
    clientSecret: payload.clientSecret.trim(),
    ...(payload.state?.trim() ? { state: payload.state.trim() } : {}),
    ...(payload.referer?.trim() ? { referer: payload.referer.trim() } : {}),
    ...(normalizedBaseUrl ? { baseUrl: normalizedBaseUrl } : {}),
    createdAt:
      existingIndex >= 0 ? store.installs[existingIndex].createdAt : timestamp,
    updatedAt: timestamp,
    ...(existingIndex >= 0 && store.installs[existingIndex].tokens
      ? { tokens: store.installs[existingIndex].tokens }
      : {}),
    ...(existingIndex >= 0 && store.installs[existingIndex].lastCallback
      ? { lastCallback: store.installs[existingIndex].lastCallback }
      : {}),
  };

  if (existingIndex >= 0) {
    store.installs[existingIndex] = record;
  } else {
    store.installs.unshift(record);
  }

  await writeStore(store);
  return record;
}

export async function findInstallPayload(input: {
  state?: string | null;
  referer?: string | null;
}) {
  const store = await readStore();
  const normalizedBaseUrl = normalizeAmoBaseUrl(input.referer);

  const byState =
    input.state?.trim()
      ? store.installs.find((item) => item.state === input.state?.trim())
      : undefined;

  if (byState) {
    return byState;
  }

  if (normalizedBaseUrl) {
    const byBaseUrl = store.installs.find(
      (item) => item.baseUrl === normalizedBaseUrl,
    );

    if (byBaseUrl) {
      return byBaseUrl;
    }
  }

  return store.installs[0] ?? null;
}

export async function exchangeCodeForTokens(params: ExchangeCodeParams) {
  const redirectUri = getExternalRedirectUri();
  const baseUrl =
    normalizeAmoBaseUrl(params.referer) ||
    params.install.baseUrl ||
    normalizeAmoBaseUrl(params.install.referer);

  if (!baseUrl) {
    throw new Error(
      'Не удалось определить base URL аккаунта amoCRM по referer/install payload.',
    );
  }

  const response = await fetch(`${baseUrl}/oauth2/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      client_id: params.install.clientId,
      client_secret: params.install.clientSecret,
      grant_type: 'authorization_code',
      code: params.code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(
      `amoCRM token exchange failed. ${details || `HTTP ${response.status}`}`,
    );
  }

  const json = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: number;
    server_time?: number;
  };

  if (!json.access_token || !json.refresh_token || !json.expires_in) {
    throw new Error('amoCRM вернул неполный набор токенов.');
  }

  const expiresAt = new Date(Date.now() + json.expires_in * 1000).toISOString();

  const tokens: AmoExternalTokenSet = {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    tokenType: json.token_type || 'Bearer',
    expiresIn: json.expires_in,
    expiresAt,
    ...(typeof json.server_time === 'number'
      ? { serverTime: json.server_time }
      : {}),
    baseUrl,
  };

  return tokens;
}

export async function saveTokensForInstall(input: {
  installKey: string;
  tokens: AmoExternalTokenSet;
  code?: string;
  fromWidget?: string;
}) {
  const store = await readStore();
  const index = store.installs.findIndex((item) => item.key === input.installKey);

  if (index < 0) {
    throw new Error('Install payload not found for token save.');
  }

  const current = store.installs[index];
  store.installs[index] = {
    ...current,
    baseUrl: input.tokens.baseUrl,
    tokens: input.tokens,
    updatedAt: nowIso(),
    lastCallback: {
      ...(input.code ? { code: input.code } : {}),
      ...(input.fromWidget ? { fromWidget: input.fromWidget } : {}),
      receivedAt: nowIso(),
    },
  };

  await writeStore(store);
  return store.installs[index];
}

export async function getStoredExternalState() {
  return readStore();
}

export function maskSecret(secret: string) {
  if (secret.length <= 8) {
    return '***';
  }

  return `${secret.slice(0, 4)}***${secret.slice(-4)}`;
}