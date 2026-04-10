# Preflight

## Назначение
Этот документ запускается перед merge в `main`. Его задача — не «идеальный QA-процесс», а короткий release-gate для production-only модели.

## Gate 0. Ветка и порядок
- [ ] Все изменения собраны в `dev`
- [ ] Объём релиза понятен
- [ ] Релиз идёт в production только через `main`
- [ ] Для релиза зафиксирован commit / набор коммитов

## Gate 1. Сборка
- [ ] `npm ci`
- [ ] `npm run build`
- [ ] `npm run typecheck`
- [ ] Нет ошибок импортов / alias / runtime-конфига

## Gate 2. Контент и first-wave routes
- [ ] Главная готова
- [ ] Раздел «Кровельные работы» готов
- [ ] `remont-krovli` готов
- [ ] `gidroizolyatsiya-krovli` готов
- [ ] `vosstanovlenie-myagkoy-krovli-sinzatim` готов
- [ ] `ustranenie-protechek` готов
- [ ] `krovlya-pod-klyuch` готов
- [ ] `natyazhnye-potolki/pod-klyuch` готов
- [ ] `nashi-raboty` готова
- [ ] `o-kompanii` готова
- [ ] `kontakty` готовы
- [ ] `simferopol` либо готов, либо официально снят из первой волны

## Gate 3. Формы и lead-flow
- [ ] Главная форма реально отправляет данные
- [ ] Форма услуги реально отправляет данные
- [ ] Форма замера / фото реально отправляет данные
- [ ] `/api/leads` принимает валидный payload
- [ ] Валидация обязательных полей работает
- [ ] Ошибки понятны пользователю
- [ ] `LEAD_WEBHOOK_URL` задан в production env
- [ ] webhook / CRM endpoint отвечает стабильно

## Gate 4. SEO release minimum
- [ ] На first-wave страницах есть уникальный title
- [ ] На first-wave страницах есть description
- [ ] На first-wave страницах один H1
- [ ] Canonical подтверждён
- [ ] Robots logic подтверждена
- [ ] `/robots.txt` доступен
- [ ] `/sitemap.xml` доступен
- [ ] Неиндексируемые страницы закрыты от индексации

## Gate 5. Infra / deploy readiness
- [ ] Production env заполнен
- [ ] `NEXT_PUBLIC_SITE_URL` совпадает с боевым доменом
- [ ] База доступна по `DATABASE_URL`
- [ ] Nginx проксирует на `127.0.0.1:3000`
- [ ] SSL готов
- [ ] `deploy.sh` актуален
- [ ] backup DB работает
- [ ] `prisma migrate deploy` проверен на staging-like шаге или вручную до релиза

## Gate 6. Rollback readiness
- [ ] Есть предыдущий стабильный commit
- [ ] Понятен rollback-сценарий по коду
- [ ] Понятен rollback-сценарий по БД
- [ ] Логи команды после релиза известны

## Release decision
### GO допускается только если:
- все блоки 1–5 закрыты
- нет blocker по lead-flow
- нет blocker по robots/sitemap/canonical
- нет blocker по ключевым маршрутам первой волны

### NO-GO если:
- формы не отправляют лид
- `/api/leads` не может передать лид дальше
- ключевые страницы дают 404/500
- sitemap / robots не готовы
- production env не собран
