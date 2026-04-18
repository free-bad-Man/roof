#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/roof/app"
ENV_FILE="/opt/roof/env/.env.production"
DB_ENV_FILE="/opt/roof/env/.env.db"
BACKUP_DIR="/opt/roof/backups/postgres"
TIMESTAMP="$(date +%F_%H-%M-%S)"

cd "$APP_DIR"
mkdir -p "$BACKUP_DIR"

echo "[1/7] Update code from main"
git fetch origin
git checkout main
git pull origin main

echo "[2/7] Start database if needed"
docker compose --env-file "$ENV_FILE" up -d db

echo "[3/7] Backup database"
set +e
docker compose exec -T db sh -lc 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' | gzip > "$BACKUP_DIR/roof_${TIMESTAMP}.sql.gz"
BACKUP_STATUS=$?
set -e
if [ $BACKUP_STATUS -ne 0 ]; then
  echo "[WARN] Database backup skipped or failed. Continue only if this is the very first deploy."
fi

find "$BACKUP_DIR" -type f -name '*.sql.gz' | sort | head -n -7 | xargs -r rm -f

echo "[4/7] Build application image"
docker compose --env-file "$ENV_FILE" build app

if [ -f "$APP_DIR/prisma/schema.prisma" ]; then
  echo "[5/7] Apply Prisma migrations"
  docker compose --env-file "$ENV_FILE" run --rm app sh -lc 'npx prisma migrate deploy'
else
  echo "[5/7] Skip Prisma migrations (prisma/schema.prisma not found)"
fi

echo "[6/7] Restart application"
docker compose --env-file "$ENV_FILE" up -d app

echo "[7/7] Cleanup old dangling images"
docker image prune -f >/dev/null 2>&1 || true

echo "[OK] Deploy finished"
docker compose ps
