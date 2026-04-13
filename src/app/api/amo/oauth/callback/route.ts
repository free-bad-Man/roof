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

  if (error) {
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

  if (!install) {
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

    await saveTokensForInstall({
      installKey: install.key,
      tokens,
      code,
      ...(fromWidget ? { fromWidget } : {}),
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
          <p>Дальше можно переносить актуальные ключи в env или подключать следующий patch, который переведёт <code>/api/leads</code> на это хранилище.</p>
        </body>
      </html>
    `);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown amoCRM OAuth error';

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