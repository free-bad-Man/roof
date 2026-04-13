# GO / NO-GO

## Verdict
Текущее решение: **NO-GO до закрытия pre-merge блокеров**.

## Почему не GO сейчас
1. Нельзя подтвердить рабочую цепочку формы -> `/api/leads` -> CRM.
2. `/api/leads` в production зависит от обязательного `LEAD_WEBHOOK_URL`; без него будет `501`.
3. `robots` и `sitemap` не подтверждены как готовые release-артефакты.
4. Индивидуальная metadata / canonical для части first-wave страниц не подтверждена напрямую.
5. Есть расхождение между первой волной запуска и прямым подтверждением geo-route `simferopol`.

## Что уже в хорошем состоянии
- Build/run scripts собраны.
- Next.js app routes для основного сайта и `/api/leads` присутствуют.
- Canonical/noindex helper для SEO в проекте уже заложен.
- Docker / Compose / deploy flow под VPS собраны.
- Release order `dev` -> `main` -> production зафиксирован.

## Условия перехода в GO
### Обязательные
- Подтверждён реальный submit всех трёх форм в `/api/leads`.
- Подтверждён успешный тестовый лид до webhook / CRM.
- Подтверждены `robots.txt` и `sitemap.xml`.
- Подтверждена metadata на ключевых first-wave страницах.
- Подтверждён или снят из релиза `/simferopol/`.

### После этого
- выполнить preflight
- merge в `main`
- deploy на VPS
- выполнить smoke-test

## Финальное правило релиза
Пока хоть один blocker из списка выше открыт, merge в `main` под production релиз не рекомендован.
