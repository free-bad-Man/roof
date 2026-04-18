import {
  exchangeCodeForTokens,
  findInstallPayload,
  getExternalRedirectUri,
  saveTokensForInstall,
} from '@/lib/integrations/amocrm-external';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function html(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code')?.trim() ?? '';
  const referer = url.searchParams.get('referer')?.trim() ?? '';
  const state = url.searchParams.get('state')?.trim() ?? '';
  const fromWidget = url.searchParams.get('from_widget')?.trim() ?? '';
  const error = url.searchParams.get('error')?.trim() ?? '';

  console.log('[amo external callback] incoming request', {
    url: request.url,
    codePresent: Boolean(code),
    referer,
    state,
    fromWidget,
    error,
    redirectUri: getExternalRedirectUri(),
  });

  if (error) {
    console.error('[amo external callback] amoCRM returned error', {
      error,
      referer,
      state,
      fromWidget,
    });

    return html(
      `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <title>amoCRM OAuth error</title>
        </head>
        <body>
          <h1>Авторизация amoCRM не завершена</h1>
          <p>amoCRM вернул ошибку: <strong>${escapeHtml(error)}</strong></p>
          <p>Redirect URI: <code>${escapeHtml(getExternalRedirectUri())}</code></p>
        </body>
      </html>
      `,
      400,
    );
  }

  if (!code) {
    console.warn('[amo external callback] no authorization code', {
      referer,
      state,
      fromWidget,
    });

    return html(
      `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <title>amoCRM OAuth callback</title>
        </head>
        <body>
          <h1>Нет authorization code</h1>
          <p>Ожидается параметр <code>code</code> в query string.</p>
          <p>Redirect URI: <code>${escapeHtml(getExternalRedirectUri())}</code></p>
        </body>
      </html>
      `,
      400,
    );
  }

  const install = await findInstallPayload({
    state: state || null,
    referer: referer || null,
  });

  console.log('[amo external callback] install lookup result', {
    found: Boolean(install),
    installKey: install?.key ?? null,
    installState: install?.state ?? null,
    installBaseUrl: install?.baseUrl ?? null,
  });

  if (!install) {
    console.error('[amo external callback] install payload not found', {
      referer,
      state,
      fromWidget,
    });

    return html(
      `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <title>amoCRM OAuth callback</title>
        </head>
        <body>
          <h1>Не найден install payload</h1>
          <p>Сначала должен отработать endpoint <code>/api/amo/external/install</code>.</p>
          <p>Получены параметры:</p>
          <ul>
            <li>state: <code>${escapeHtml(state || '-')}</code></li>
            <li>referer: <code>${escapeHtml(referer || '-')}</code></li>
          </ul>
        </body>
      </html>
      `,
      409,
    );
  }

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      ...(referer ? { referer } : {}),
      install,
    });

    console.log('[amo external callback] token exchange success', {
      installKey: install.key,
      baseUrl: tokens.baseUrl,
      expiresAt: tokens.expiresAt,
      fromWidget,
    });

    await saveTokensForInstall({
      installKey: install.key,
      tokens,
      code,
      ...(fromWidget ? { fromWidget } : {}),
    });

    console.log('[amo external callback] tokens saved', {
      installKey: install.key,
      baseUrl: tokens.baseUrl,
    });

    return html(`
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <title>amoCRM connected</title>
        </head>
        <body>
          <h1>amoCRM подключен</h1>
          <p>Код авторизации успешно обменян на токены и сохранён во временное хранилище.</p>
          <ul>
            <li>Аккаунт: <code>${escapeHtml(tokens.baseUrl)}</code></li>
            <li>Expires at: <code>${escapeHtml(tokens.expiresAt)}</code></li>
            <li>State: <code>${escapeHtml(install.state ?? '-')}</code></li>
            <li>From widget: <code>${escapeHtml(fromWidget || 'false')}</code></li>
          </ul>
        </body>
      </html>
    `);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown amoCRM OAuth error';

    console.error('[amo external callback] token exchange failed', {
      message,
      referer,
      state,
      fromWidget,
      installKey: install.key,
    });

    return html(
      `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <title>amoCRM OAuth error</title>
        </head>
        <body>
          <h1>Не удалось завершить OAuth</h1>
          <p>${escapeHtml(message)}</p>
          <ul>
            <li>referer: <code>${escapeHtml(referer || install.baseUrl || '-')}</code></li>
            <li>redirect_uri: <code>${escapeHtml(getExternalRedirectUri())}</code></li>
          </ul>
        </body>
      </html>
      `,
      502,
    );
  }
}