# Release checklist

## Статус проверки
- Дата проверки: 2026-04-10
- Роль: Агент 8 — QA / release-control
- Ветка для проверки: `dev`
- Целевой релиз: `main` -> production on VPS

## Что проверено по фактам

### 1) Buildability
- [x] В проекте есть скрипты `dev`, `build`, `start`, `typecheck`; `build` = `next build`. Node engine: `>=20.9.0`.
- [x] Dockerfile собирает приложение через `npm run build` на этапе builder.
- [ ] Отдельный результат `npm run typecheck` не подтверждён в доступных артефактах.
- [ ] Наличие Prisma schema / migrations не подтверждено напрямую через доступные файлы.

### 2) Ключевые маршруты первой волны
Подтверждены route-файлами / структурой репозитория:
- [x] `/`
- [x] `/krovelnye-raboty/`
- [x] `/krovelnye-raboty/[slug]/`
- [x] `/gidroizolyatsiya/`
- [x] `/gidroizolyatsiya/[slug]/`
- [x] `/natyazhnye-potolki/`
- [x] `/natyazhnye-potolki/[slug]/`
- [x] `/nashi-raboty/`
- [x] `/nashi-raboty/[slug]/`
- [x] `/stati/`
- [x] `/stati/[slug]/`
- [x] `/o-kompanii/`
- [x] `/kontakty/`
- [x] `/api/leads`
- [ ] `/simferopol/` как app-route напрямую не подтверждён из доступных route-файлов; контент geo есть.

### 3) Формы и `/api/leads`
- [x] API-роут `src/app/api/leads/route.ts` существует.
- [x] Роут валидирует `name`, `phone`, `comment`.
- [x] Роут отправляет payload во внешний webhook / CRM.
- [ ] E2E-цепочка формы -> API не готова к релизу: в `LeadForm.tsx` нет `action`, `onSubmit` или другого видимого client-side submit wiring.
- [ ] Production без `LEAD_WEBHOOK_URL` даст `501` и фактически отключит приём лидов.

### 4) SEO-критерии первой волны
- [x] Есть helper для canonical / robots / metadata: `buildMetadata()`.
- [x] Для service-slug страниц реализован `generateMetadata()`.
- [x] `trailingSlash: true` включён.
- [ ] Для главной и части верхнеуровневых страниц индивидуальные metadata в проверенных route-файлах не подтверждены.
- [ ] `robots.txt` / `robots.ts` не подтверждены в доступных route-файлах.
- [ ] `sitemap.xml` / `sitemap.ts` не подтверждены в доступных route-файлах.

### 5) Index / noindex logic
- [x] В helper есть логика `seo?.noindex` -> `robots: { index: false, follow: false }`.
- [ ] Наполнение `seo.noindex` для служебных / неиндексируемых страниц отдельно не подтверждено.
- [ ] Страницы thank-you / service URLs / test URLs как реальные route-файлы не проверялись.

### 6) Canonical / sitemap / robots на уровне release-check
- [x] Canonical поддержан helper-функцией `buildMetadata()`.
- [ ] Реальная генерация sitemap не подтверждена.
- [ ] Реальная генерация robots не подтверждена.
- [ ] Проверка итогового HTML head по production build не подтверждена.

### 7) Готовность к deploy на VPS
- [x] Есть `Dockerfile`.
- [x] Есть `docker-compose.yml` c `db` и `app`.
- [x] Есть `deploy.sh`.
- [x] Release flow фиксирует: deploy only from `main`.
- [x] Compose публикует app только на `127.0.0.1:3000`, что согласуется с Nginx впереди.
- [x] Env map описан отдельно для app/db.
- [ ] Фактическая Nginx-конфигурация production на сервере не проверена; есть только example/docs.

## Что блокирует релиз
1. Формы на фронтенде не подтверждены как реально отправляющие данные в `/api/leads`.
2. `LEAD_WEBHOOK_URL` обязателен для приёма лидов; без него API отвечает `501`.
3. `robots` / `sitemap` не подтверждены в коде как готовые release-артефакты.
4. Для части first-wave страниц не подтверждена индивидуальная metadata / canonical-настройка на уровне page routes.
5. Geo-page `simferopol` заявлена в первой волне, но route-файл не подтверждён напрямую в проверенных app routes.

## Что не блокирует релиз
1. MAX как отдельный канал — второй этап.
2. Расширение контентной волны сверх стартового минимума.
3. Дополнительные рекламные / брендовые носители.
4. Усложнение CRM-автоматизаций сверх зафиксированного минимального набора.

## Что обязательно исправить до merge в `main`
- Подключить реальную отправку всех трёх форм в `/api/leads` и прогнать happy-path / validation / error-path.
- Завести и проверить production `LEAD_WEBHOOK_URL` (+ token при необходимости).
- Подтвердить release-уровень `robots` и `sitemap` в коде.
- Подтвердить metadata для главной, верхнеуровневых разделов, контактов и о компании.
- Подтвердить route `/simferopol/` или снять его из первой волны релиза.

## Что можно вынести в post-release
- Расширение статей и кейсов сверх первой волны.
- Доработки аналитики / целей beyond base setup.
- Дополнительные CRM-улучшения, не влияющие на приём лида.
- Тонкие UX-полировки форм и анимации.

## Порядок релиза
1. Работа и проверка в `dev`.
2. Preflight / smoke на уровне release-gate.
3. Merge в `main`.
4. Deploy на VPS только из `main`.
5. Post-deploy smoke-check и лог-контроль.
