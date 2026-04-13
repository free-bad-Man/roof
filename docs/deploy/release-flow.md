# Release flow

## Правило релиза
В production попадает только то, что уже вошло в `main`.

Схема простая:
- локальная работа — в `dev`;
- проверка и финализация — до merge;
- выкладка на VPS — только из `main`.

## 1. Перед релизом локально
Перед merge в `main` нужно убедиться, что:
- приложение собирается без ошибок;
- Prisma schema и migrations актуальны;
- env-переменные для новых интеграций добавлены в `env-map`;
- изменения не ломают формы, SEO-критичные страницы и CRM-связку.

## 2. Merge в main
После локальной проверки:
1. завершить работу в `dev`;
2. слить изменения в `main`;
3. зафиксировать commit, который идёт в production.

## 3. Обновление на VPS
### Вариант без скрипта
```bash
cd /opt/roof/app
git fetch origin
git checkout main
git pull origin main

docker compose --env-file /opt/roof/env/.env.production build app
docker compose --env-file /opt/roof/env/.env.production up -d db
docker compose --env-file /opt/roof/env/.env.production run --rm app sh -lc 'npx prisma migrate deploy'
docker compose --env-file /opt/roof/env/.env.production up -d app
```

### Вариант со скриптом
```bash
cd /opt/roof/app
./deploy.sh
```

## 4. Что делает релиз обязательно
1. подтягивает `main`;
2. создаёт backup БД;
3. собирает новый образ приложения;
4. поднимает или проверяет PostgreSQL;
5. применяет `prisma migrate deploy`;
6. перезапускает приложение;
7. удаляет старые dangling images по возможности.

## 5. Проверка после релиза
Минимальный smoke-check:
- главная открывается по HTTPS;
- ключевые страницы услуг отвечают `200 OK`;
- форма отправки заявки работает;
- интеграция amoCRM не упала;
- сервер не отдаёт 502/504;
- `docker compose ps` показывает `app` и `db` в состоянии `Up`.

## 6. Логи после релиза
```bash
docker compose logs app --tail=200
docker compose logs db --tail=200
```

Если нужна живая проверка:
```bash
docker compose logs -f app
```

## 7. Если релиз неудачный
### Быстрый rollback по коду
```bash
cd /opt/roof/app
git log --oneline -n 5
git checkout <PREVIOUS_STABLE_COMMIT>
./deploy.sh
```

После аварийного отката вернуть рабочую ветку обратно:
```bash
git checkout main
```

### Если проблема в данных
Если релиз менял схему БД и нужен откат данных:
1. остановить приложение;
2. восстановить backup PostgreSQL;
3. поднять приложение снова.

## 8. Восстановление backup PostgreSQL
Пример:
```bash
gunzip -c /opt/roof/backups/postgres/roof_YYYY-MM-DD_HH-MM-SS.sql.gz | \
  docker exec -i roof-db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

Практически: сначала остановить `app`, затем восстановить БД, затем снова поднять `app`.

## 9. Частота релизов
Для этого проекта лучше держать релизы простыми и редкими:
- выкладывать только собранные изменения;
- не делать «мелкие правки прямо на сервере»;
- один понятный релиз лучше трёх хаотичных.
