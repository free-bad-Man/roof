# Deploy overview

## Цель
Этот контур фиксирует простой production-only деплой для проекта «Крымская Кровельная»:
- один VPS;
- один repo;
- деплой только из `main`;
- приложение Next.js + TypeScript работает в Docker;
- PostgreSQL работает в Docker как часть production-контура;
- Nginx стоит на VPS и работает как reverse proxy + SSL-терминация;
- локальная разработка остаётся на ноуте, dev-стенд на VPS не нужен.

## Итоговая схема
1. На VPS хранится рабочая директория `/opt/roof`.
2. В ней лежит clone production-репозитория и production env-файлы.
3. `docker compose` поднимает 2 сервиса:
   - `app` — Next.js приложение;
   - `db` — PostgreSQL.
4. Nginx на хосте принимает HTTP/HTTPS и проксирует запросы в контейнер `app` на `127.0.0.1:3000`.
5. Секреты не хранятся в git. Они живут только на VPS.
6. Перед обновлением релиза делается backup БД.

## Почему именно так
Этот вариант соответствует уже утверждённому контуру:
- без Kubernetes;
- без staging на VPS;
- без отдельного CI/CD-контура;
- без разведения на несколько серверов;
- без изменений архитектуры сайта и приложения.

## Production-контур
- **Хост:** Ubuntu VPS
- **Reverse proxy:** Nginx на хосте
- **SSL:** Let's Encrypt / Certbot
- **App runtime:** Docker container
- **DB:** PostgreSQL container + named volume
- **Persistence:** docker volume для БД + папка backup на VPS
- **Перезапуск:** `restart: unless-stopped`
- **Release source:** только ветка `main`

## Директории на VPS
Рекомендуемая структура:

```text
/opt/roof
  ├─ app/                  # git clone production-репозитория
  ├─ shared/
  │   ├─ logs/
  │   └─ uploads/          # только если приложению реально нужно файловое хранилище
  ├─ backups/
  │   └─ postgres/
  └─ env/
      ├─ .env.production
      └─ .env.db
```

## Что лежит где
- код проекта: `/opt/roof/app`
- production env приложения: `/opt/roof/env/.env.production`
- env PostgreSQL: `/opt/roof/env/.env.db`
- резервные копии БД: `/opt/roof/backups/postgres`
- Nginx site config: `/etc/nginx/sites-available/krymroof.conf`
- symlink Nginx: `/etc/nginx/sites-enabled/krymroof.conf`

## Порты
- `80` — HTTP, нужен для редиректа и выпуска сертификата
- `443` — HTTPS
- `127.0.0.1:3000` — приложение внутри VPS, наружу не публикуется
- `5432` — PostgreSQL внутри docker network, наружу не публикуется

## Базовый цикл релиза
1. Разработка идёт локально в `dev`.
2. Готовые изменения сливаются в `main`.
3. На VPS из `main` подтягивается код.
4. Перед релизом делается backup БД.
5. Собирается новый image приложения.
6. Применяются Prisma migrations.
7. Перезапускается контейнер приложения.
8. Проверяются главная, ключевые услуги, формы, интеграции.

## Минимальный backup и rollback
### Backup
Перед каждым релизом:
- делаем `pg_dump` в `/opt/roof/backups/postgres`;
- храним как минимум последние 7 файлов.

### Rollback
Если релиз проблемный:
1. вернуть предыдущий commit или tag в `main` либо на сервере checkout на предыдущий стабильный commit;
2. заново выполнить deploy;
3. если релиз затронул схему БД и нужно откатить данные — восстановить последний backup PostgreSQL.

## Что не входит в этот контур
- отдельный staging;
- blue-green;
- Kubernetes;
- отдельные managed services;
- сложный CI/CD;
- вынесение PostgreSQL в отдельный сервер на старте.
