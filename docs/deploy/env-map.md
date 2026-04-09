# Env map

## Принцип
Production env-переменные не хранятся в репозитории. На VPS используются два файла:
- `/opt/roof/env/.env.production` — env приложения;
- `/opt/roof/env/.env.db` — env PostgreSQL.

`docker-compose.yml` читает оба файла через `env_file`.

## 1. Файл `/opt/roof/env/.env.db`
Используется контейнером PostgreSQL.

```dotenv
POSTGRES_DB=roof_prod
POSTGRES_USER=roof_user
POSTGRES_PASSWORD=change_me_strong_password
```

## 2. Файл `/opt/roof/env/.env.production`
Используется контейнером приложения.

```dotenv
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://example.ru

DATABASE_URL=postgresql://roof_user:change_me_strong_password@db:5432/roof_prod?schema=public

# Пример для NextAuth / session / encryption, если используется
APP_SECRET=change_me_long_random_secret

# Пример для CRM / телефонии / мессенджеров — оставить только реально используемые
AMOCRM_BASE_URL=
AMOCRM_CLIENT_ID=
AMOCRM_CLIENT_SECRET=
AMOCRM_REDIRECT_URI=
AMOCRM_REFRESH_TOKEN=

TELEFIN_API_KEY=
TELEFIN_API_SECRET=

TELEGRAM_BOT_TOKEN=
VK_GROUP_TOKEN=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

## 3. Какие переменные обязательны уже на старте
Минимум для первого production-деплоя:
- `NODE_ENV`
- `PORT`
- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

Если приложение использует авторизацию, подписи токенов, cookies или шифрование, тогда ещё:
- `APP_SECRET`

## 4. Какие переменные добавляются по мере интеграций
Так как у проекта уже предусмотрены формы и CRM-связка, новые production-значения нужно добавлять только по факту реального использования, без мусора и заготовок «на будущее». Это соответствует общему проектному принципу — не раздувать систему без необходимости.

Чаще всего это:
- amoCRM
- Telegram
- VK
- почта
- телефония

## 5. Что не делать с env
- не коммитить production env в git;
- не хранить секреты в `docker-compose.yml`;
- не писать реальные пароли в документации;
- не дублировать один и тот же секрет в нескольких местах без причины.

## 6. Практический порядок обновления env
Если релиз требует новые env-переменные:
1. обновить `docs/deploy/env-map.md` в репозитории;
2. вручную добавить переменные на VPS в `/opt/roof/env/.env.production`;
3. проверить синтаксис файла;
4. выполнить релиз.

## 7. Как проверить env внутри контейнера
```bash
docker compose exec app printenv | sort
```

Для точечной проверки:
```bash
docker compose exec app sh -lc 'echo "$NODE_ENV" && echo "$NEXT_PUBLIC_SITE_URL"'
```
