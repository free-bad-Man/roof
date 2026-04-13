# amoCRM external integration setup

## Что делает этот patch

Patch добавляет 2 публичных endpoint для внешнего OAuth-сценария amoCRM:

- `/api/amo/external/install`
- `/api/amo/oauth/callback`

`/api/leads` не меняется.

## Какое хранение выбрано

Для этого patch выбран минимальный практичный вариант без БД:

- install payload (`client_id`, `client_secret`, `state`)
- результат callback (`access_token`, `refresh_token`, `expires_at`, `baseUrl`)

сохраняются в JSON-файл:

- по умолчанию: `.runtime/amocrm-external.json`
- либо в путь из `AMOCRM_EXTERNAL_INSTALL_STORAGE_PATH`

Это нормально для текущего single-VPS MVP.

### Важно
Это хранилище:
- не требует новой БД
- не требует смены deploy-контура
- подходит для первого запуска внешней интеграции

Но:
- файл должен переживать рестарты/redeploy
- после успешной установки лучше перенести актуальные данные в нормальный secret storage или следующим patch перевести `/api/leads` на чтение из этого хранилища

## Какие env нужны

Минимум:

```env
NEXT_PUBLIC_SITE_URL=https://krimskaya-krovelnaya.ru
AMOCRM_EXTERNAL_REDIRECT_URI=https://krimskaya-krovelnaya.ru/api/amo/oauth/callback
AMOCRM_EXTERNAL_INSTALL_STORAGE_PATH=.runtime/amocrm-external.json