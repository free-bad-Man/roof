import { Buffer } from 'node:buffer';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PhotoLeadResponsePayload = {
  ok: boolean;
  message: string;
  leadId?: string;
  attachedFiles?: number;
};

type AmoAccessTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  base_domain?: string;
};

type AmoTokenStorage = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  base_url?: string;
  updated_at?: string;
};

type PhotoLeadData = {
  source: string;
  formName: string;
  pagePath: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  comment: string;
};

type UploadedAmoFile = {
  uuid: string;
  name: string;
  size: number;
  type?: string;
  downloadUrl?: string;
  previewUrl?: string;
};

const AMO_TOKEN_REFRESH_SKEW_MS = 5 * 60 * 1000;
const DEFAULT_AMO_TOKEN_STORAGE_PATH = '.runtime/amocrm-tokens.json';
const MAX_PHOTO_FILES = 6;
const MAX_PHOTO_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_PHOTO_TOTAL_SIZE_BYTES = 32 * 1024 * 1024;

function jsonResponse(
  body: PhotoLeadResponsePayload,
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseIntegerEnv(name: string): number | null {
  const raw = process.env[name];

  if (!raw) {
    return null;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function getNumericAmoId(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number.parseInt(value, 10);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function getAmoLeadIdFromResponse(json: unknown): number | undefined {
  if (Array.isArray(json)) {
    for (const item of json) {
      const id = getAmoLeadIdFromResponse(item);

      if (id) {
        return id;
      }
    }

    return undefined;
  }

  if (!isRecord(json)) {
    return undefined;
  }

  const directId = getNumericAmoId(json.id);

  if (directId) {
    return directId;
  }

  const embedded = json._embedded;

  if (isRecord(embedded)) {
    const leads = embedded.leads;

    if (Array.isArray(leads)) {
      for (const lead of leads) {
        const id = getAmoLeadIdFromResponse(lead);

        if (id) {
          return id;
        }
      }
    }
  }

  const lead = json.lead;

  if (lead) {
    return getAmoLeadIdFromResponse(lead);
  }

  return undefined;
}

function getAmoTokenStoragePath() {
  return (
    process.env.AMOCRM_TOKEN_STORAGE_PATH?.trim() ||
    DEFAULT_AMO_TOKEN_STORAGE_PATH
  );
}

async function readAmoTokenStorage(): Promise<AmoTokenStorage> {
  try {
    const raw = await readFile(getAmoTokenStoragePath(), 'utf8');
    const parsed = JSON.parse(raw) as Partial<AmoTokenStorage>;

    return {
      access_token: isNonEmptyString(parsed.access_token)
        ? parsed.access_token.trim()
        : undefined,
      refresh_token: isNonEmptyString(parsed.refresh_token)
        ? parsed.refresh_token.trim()
        : undefined,
      expires_at:
        typeof parsed.expires_at === 'number' && Number.isFinite(parsed.expires_at)
          ? parsed.expires_at
          : undefined,
      base_url: isNonEmptyString(parsed.base_url)
        ? parsed.base_url.trim()
        : undefined,
      updated_at: isNonEmptyString(parsed.updated_at)
        ? parsed.updated_at.trim()
        : undefined,
    };
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return {};
    }

    throw new Error('Не удалось прочитать хранилище токенов amoCRM.');
  }
}

async function writeAmoTokenStorage(tokenStorage: AmoTokenStorage) {
  const storagePath = getAmoTokenStoragePath();

  await mkdir(dirname(storagePath), { recursive: true });
  await writeFile(
    storagePath,
    `${JSON.stringify(tokenStorage, null, 2)}\n`,
    'utf8',
  );
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

function getAmoBaseUrlFromTokenResponse(json: AmoAccessTokenResponse, fallback: string) {
  if (isNonEmptyString(json.base_domain)) {
    return `https://${json.base_domain.trim().replace(/^https?:\/\//, '')}`;
  }

  return fallback;
}

async function getAmoAccessToken() {
  const config = getAmoConfig();

  if (!config.isConfigured) {
    throw new Error('amoCRM не настроен.');
  }

  const tokenStorage = await readAmoTokenStorage();
  const now = Date.now();

  if (
    isNonEmptyString(tokenStorage.access_token) &&
    typeof tokenStorage.expires_at === 'number' &&
    tokenStorage.expires_at - now > AMO_TOKEN_REFRESH_SKEW_MS
  ) {
    return {
      accessToken: tokenStorage.access_token,
      baseUrl: tokenStorage.base_url || config.baseUrl,
    };
  }

  const refreshToken = tokenStorage.refresh_token || config.refreshToken;

  if (!isNonEmptyString(refreshToken)) {
    throw new Error('amoCRM refresh token не найден в storage или env.');
  }

  const baseUrl = tokenStorage.base_url || config.baseUrl;
  const response = await fetch(`${baseUrl}/oauth2/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: config.redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Не удалось обновить access token amoCRM. HTTP ${response.status}`,
    );
  }

  const json = (await response.json()) as AmoAccessTokenResponse;

  if (!isNonEmptyString(json.access_token)) {
    throw new Error('amoCRM вернул пустой access token.');
  }

  const updatedBaseUrl = getAmoBaseUrlFromTokenResponse(json, baseUrl);
  const expiresInSeconds =
    typeof json.expires_in === 'number' && Number.isFinite(json.expires_in)
      ? json.expires_in
      : 24 * 60 * 60;
  const updatedAccessToken = json.access_token.trim();
  const updatedRefreshToken = isNonEmptyString(json.refresh_token)
    ? json.refresh_token.trim()
    : refreshToken;

  const updatedTokenStorage: AmoTokenStorage = {
    access_token: updatedAccessToken,
    refresh_token: updatedRefreshToken,
    expires_at: now + expiresInSeconds * 1000,
    base_url: updatedBaseUrl,
    updated_at: new Date(now).toISOString(),
  };

  await writeAmoTokenStorage(updatedTokenStorage);

  return {
    accessToken: updatedAccessToken,
    baseUrl: updatedBaseUrl,
  };
}

function buildPhotoLeadName(data: PhotoLeadData) {
  const parts = [
    'Фото объекта',
    data.service.trim(),
    data.city.trim(),
    data.name.trim(),
  ].filter(Boolean);

  return parts.join(' — ');
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)} МБ`;
  }

  return `${Math.max(1, Math.round(size / 1024))} КБ`;
}

function getAmoFileDownloadUrl(file: UploadedAmoFile) {
  return file.downloadUrl || file.previewUrl || '';
}

function getNestedString(value: unknown, path: string[]) {
  let current: unknown = value;

  for (const key of path) {
    if (!isRecord(current)) {
      return '';
    }

    current = current[key];
  }

  return isNonEmptyString(current) ? current.trim() : '';
}

function getFirstPreviewUrl(value: unknown) {
  if (!isRecord(value) || !Array.isArray(value.previews)) {
    return '';
  }

  for (const preview of value.previews) {
    const downloadLink = getNestedString(preview, ['download_link']);

    if (downloadLink) {
      return downloadLink;
    }
  }

  return '';
}

function buildPhotoLeadComment(data: PhotoLeadData, files: File[], uploadedFiles: UploadedAmoFile[]) {
  const lines = [
    `Форма: ${data.formName}`,
    `Источник: ${data.source}`,
    `Страница: ${data.pagePath}`,
    '',
    'Заявка с фото объекта:',
    `Город: ${data.city}`,
    `Услуга / направление: ${data.service || 'не указано'}`,
    data.comment ? `Комментарий клиента: ${data.comment}` : '',
    '',
    `Фото прикреплено к сделке: ${uploadedFiles.length} из ${files.length}`,
  ].filter(Boolean);

  if (uploadedFiles.length > 0) {
    lines.push('');
    lines.push('Прикреплённые файлы:');

    for (const file of uploadedFiles) {
      const fileUrl = getAmoFileDownloadUrl(file);

      lines.push(
        fileUrl
          ? `— ${file.name} (${formatFileSize(file.size)}): ${fileUrl}`
          : `— ${file.name} (${formatFileSize(file.size)})`,
      );
    }
  }

  return lines.join('\n');
}

async function createAmoPhotoLead(data: PhotoLeadData) {
  const config = getAmoConfig();

  if (!config.isConfigured || config.pipelineId === null || config.statusId === null) {
    throw new Error('amoCRM не настроен.');
  }

  const { accessToken, baseUrl } = await getAmoAccessToken();

  const leadPayload = [
    {
      name: buildPhotoLeadName(data),
      pipeline_id: config.pipelineId,
      status_id: config.statusId,
      ...(config.responsibleUserId
        ? { responsible_user_id: config.responsibleUserId }
        : {}),
      _embedded: {
        contacts: [
          {
            first_name: data.name.trim(),
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [{ value: data.phone.trim() }],
              },
            ],
          },
        ],
      },
    },
  ];

  const response = await fetch(`${baseUrl}/api/v4/leads/complex`, {
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

  const json = (await response.json()) as unknown;
  const leadId = getAmoLeadIdFromResponse(json);

  if (!leadId) {
    throw new Error('amoCRM создал сделку, но ID сделки не найден в ответе.');
  }

  return {
    leadId,
    accessToken,
    baseUrl,
  };
}

async function addAmoLeadNote(params: {
  baseUrl: string;
  accessToken: string;
  leadId: number;
  noteText: string;
}) {
  const response = await fetch(`${params.baseUrl}/api/v4/leads/${params.leadId}/notes`, {
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
  }).catch((error) => {
    console.error('[amoCRM photo note] request failed.', error);
    return null;
  });

  if (!response) {
    return;
  }

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    console.error(
      `[amoCRM photo note] failed. HTTP ${response.status}`,
      details,
    );
  }
}

async function getAmoDriveUrl(baseUrl: string, accessToken: string) {
  const response = await fetch(`${baseUrl}/api/v4/account?with=drive_url`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(
      `Не удалось получить drive_url amoCRM. ${details || `HTTP ${response.status}`}`,
    );
  }

  const json = (await response.json()) as { drive_url?: string };

  if (!isNonEmptyString(json.drive_url)) {
    throw new Error('amoCRM не вернул drive_url для загрузки файлов.');
  }

  return json.drive_url.trim().replace(/\/$/, '');
}

function sanitizeFileName(name: string) {
  const trimmed = name.trim() || 'photo.jpg';
  return trimmed.replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120);
}

async function uploadFileToAmoDrive(params: {
  driveUrl: string;
  accessToken: string;
  file: File;
}) {
  const fileName = sanitizeFileName(params.file.name);
  const contentType = params.file.type || 'application/octet-stream';
  const bytes = Buffer.from(await params.file.arrayBuffer());

  const sessionResponse = await fetch(`${params.driveUrl}/v1.0/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.accessToken}`,
    },
    cache: 'no-store',
    body: JSON.stringify({
      file_name: fileName,
      file_size: bytes.length,
      content_type: contentType,
      with_preview: true,
    }),
  });

  if (!sessionResponse.ok) {
    const details = await sessionResponse.text().catch(() => '');
    throw new Error(
      `Не удалось создать сессию загрузки файла ${fileName}. ${details || `HTTP ${sessionResponse.status}`}`,
    );
  }

  const session = (await sessionResponse.json()) as {
    upload_url?: string;
    max_part_size?: number;
  };

  if (!isNonEmptyString(session.upload_url)) {
    throw new Error(`amoCRM не вернул upload_url для файла ${fileName}.`);
  }

  const maxPartSize =
    typeof session.max_part_size === 'number' && session.max_part_size > 0
      ? session.max_part_size
      : 512 * 1024;

  let uploadUrl = session.upload_url;
  let offset = 0;
  let uploadedJson: unknown = null;

  while (offset < bytes.length) {
    const end = Math.min(offset + maxPartSize, bytes.length);
    const chunk = bytes.subarray(offset, end);

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${params.accessToken}`,
      },
      cache: 'no-store',
      body: chunk,
    });

    if (!uploadResponse.ok) {
      const details = await uploadResponse.text().catch(() => '');
      throw new Error(
        `Не удалось загрузить файл ${fileName}. ${details || `HTTP ${uploadResponse.status}`}`,
      );
    }

    uploadedJson = await uploadResponse.json();
    offset = end;

    if (offset < bytes.length) {
      if (!isRecord(uploadedJson) || !isNonEmptyString(uploadedJson.next_url)) {
        throw new Error(`amoCRM не вернул next_url для файла ${fileName}.`);
      }

      uploadUrl = uploadedJson.next_url;
    }
  }

  if (!isRecord(uploadedJson) || !isNonEmptyString(uploadedJson.uuid)) {
    throw new Error(`amoCRM не вернул uuid после загрузки файла ${fileName}.`);
  }

  return {
    uuid: uploadedJson.uuid,
    name: fileName,
    size: bytes.length,
    type: isNonEmptyString(uploadedJson.type) ? uploadedJson.type : undefined,
    downloadUrl: getNestedString(uploadedJson, ['_links', 'download', 'href']),
    previewUrl: getFirstPreviewUrl(uploadedJson),
  };
}

async function bindAmoFilesToLead(params: {
  baseUrl: string;
  accessToken: string;
  leadId: number;
  files: UploadedAmoFile[];
}) {
  if (params.files.length === 0) {
    return;
  }

  const response = await fetch(`${params.baseUrl}/api/v4/leads/${params.leadId}/files`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.accessToken}`,
    },
    cache: 'no-store',
    body: JSON.stringify(
      params.files.map((file) => ({
        file_uuid: file.uuid,
      })),
    ),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(
      `Не удалось прикрепить фото к сделке amoCRM. ${details || `HTTP ${response.status}`}`,
    );
  }
}

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getPhotoFiles(formData: FormData) {
  return formData
    .getAll('photos')
    .filter((item): item is File => item instanceof File && item.size > 0);
}

function validatePhotoLead(data: PhotoLeadData, files: File[]) {
  if (!isNonEmptyString(data.name)) {
    return 'Поле «Имя» обязательно.';
  }

  if (!isNonEmptyString(data.phone)) {
    return 'Поле «Телефон» обязательно.';
  }

  if (!isNonEmptyString(data.city)) {
    return 'Поле «Город» обязательно.';
  }

  if (files.length === 0) {
    return 'Прикрепите хотя бы одно фото объекта.';
  }

  if (files.length > MAX_PHOTO_FILES) {
    return `Можно прикрепить не больше ${MAX_PHOTO_FILES} фото.`;
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > MAX_PHOTO_TOTAL_SIZE_BYTES) {
    return 'Общий размер фото не должен превышать 32 МБ.';
  }

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      return `Файл ${file.name} не похож на изображение.`;
    }

    if (file.size > MAX_PHOTO_FILE_SIZE_BYTES) {
      return `Файл ${file.name} больше 8 МБ.`;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return badRequest('Некорректное тело запроса.');
  }

  const data: PhotoLeadData = {
    source: getText(formData, 'source') || 'Сайт',
    formName: getText(formData, 'formName') || 'Сайт — Фото объекта',
    pagePath: getText(formData, 'pagePath') || '/kontakty/',
    name: getText(formData, 'name'),
    phone: getText(formData, 'phone'),
    city: getText(formData, 'city'),
    service: getText(formData, 'service'),
    comment: getText(formData, 'comment'),
  };

  const files = getPhotoFiles(formData);
  const validationError = validatePhotoLead(data, files);

  if (validationError) {
    return badRequest(validationError);
  }

  try {
    const lead = await createAmoPhotoLead(data);
    const driveUrl = await getAmoDriveUrl(lead.baseUrl, lead.accessToken);
    const uploadedFiles: UploadedAmoFile[] = [];

    for (const file of files) {
      const uploaded = await uploadFileToAmoDrive({
        driveUrl,
        accessToken: lead.accessToken,
        file,
      });

      uploadedFiles.push(uploaded);
    }

    await bindAmoFilesToLead({
      baseUrl: lead.baseUrl,
      accessToken: lead.accessToken,
      leadId: lead.leadId,
      files: uploadedFiles,
    });

    await addAmoLeadNote({
      baseUrl: lead.baseUrl,
      accessToken: lead.accessToken,
      leadId: lead.leadId,
      noteText: buildPhotoLeadComment(data, files, uploadedFiles),
    });

    return jsonResponse({
      ok: true,
      message: 'Фото и заявка отправлены. Мы свяжемся с вами в ближайшее время.',
      leadId: String(lead.leadId),
      attachedFiles: uploadedFiles.length,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Не удалось отправить фото-заявку в amoCRM.';

    console.error('[amoCRM photo lead] failed.', error);

    return badRequest(message, 502);
  }
}
