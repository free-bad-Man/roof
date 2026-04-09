import type { NextRequest } from 'next/server';
import type {
  LeadRequestPayload,
  LeadResponsePayload,
} from '@/shared/types/lead';

function badRequest(message: string, status = 400) {
  return Response.json(
    { ok: false, message } satisfies LeadResponsePayload,
    { status },
  );
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as LeadRequestPayload | null;

  if (!payload) {
    return badRequest('Некорректное тело запроса.');
  }

  if (!payload.client?.name) {
    return badRequest('Поле «Имя» обязательно.');
  }

  if (!payload.client?.phone) {
    return badRequest('Поле «Телефон» обязательно.');
  }

  if (!payload.deal?.comment) {
    return badRequest('Поле с описанием задачи обязательно.');
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const webhookToken = process.env.LEAD_WEBHOOK_TOKEN;

  if (!webhookUrl) {
    return badRequest(
      'LEAD_WEBHOOK_URL не настроен. Подключите CRM/webhook-адаптер для приёма заявок.',
      501,
    );
  }

  const upstreamResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(webhookToken ? { Authorization: `Bearer ${webhookToken}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!upstreamResponse.ok) {
    return badRequest('Не удалось передать заявку в CRM-интеграцию.', 502);
  }

  return Response.json({
    ok: true,
    message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
  } satisfies LeadResponsePayload);
}