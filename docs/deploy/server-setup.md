# Server setup

## 1. Что подготовить заранее
До настройки сервера должны быть готовы:
- домен и A-запись на IP VPS;
- доступ по SSH;
- ветки `dev` и `main` в одном repo;
- production-значения env-переменных.

## 2. Базовый сервер
Ниже пример для Ubuntu 24.04/22.04.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw nginx certbot python3-certbot-nginx ca-certificates gnupg
```

## 3. Docker и compose plugin
```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

## 4. Firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 5. Рабочая структура на VPS
```bash
sudo mkdir -p /opt/roof/{app,env,backups/postgres,shared/logs,shared/uploads}
sudo chown -R $USER:$USER /opt/roof
```

## 6. Клонирование проекта
```bash
cd /opt/roof/app
git clone <REPO_URL> .
git checkout main
```

Если репозиторий уже клонирован:
```bash
cd /opt/roof/app
git fetch origin
git checkout main
git pull origin main
```

## 7. Создание env-файлов
Создать вручную:
- `/opt/roof/env/.env.production`
- `/opt/roof/env/.env.db`

Шаблоны и назначение переменных описаны в `docs/deploy/env-map.md`.

## 8. Установка Nginx-конфига
1. Скопировать `docs/deploy/nginx.conf.example` в `/etc/nginx/sites-available/krymroof.conf`
2. Подставить реальный домен
3. Активировать конфиг:

```bash
sudo ln -s /etc/nginx/sites-available/krymroof.conf /etc/nginx/sites-enabled/krymroof.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 9. SSL / HTTPS
После того как домен уже смотрит на VPS и HTTP-конфиг отрабатывает:

```bash
sudo certbot --nginx -d example.ru -d www.example.ru
```

Если `www` не нужен, выпускать только на основной домен.

Проверка автообновления сертификатов:
```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

## 10. Первый запуск контейнеров
Из директории проекта:

```bash
cd /opt/roof/app
docker compose --env-file /opt/roof/env/.env.production up -d --build db
docker compose --env-file /opt/roof/env/.env.production run --rm app sh -lc 'npx prisma migrate deploy'
docker compose --env-file /opt/roof/env/.env.production up -d --build app
```

Если используете приложенный `deploy.sh`, тогда:

```bash
cd /opt/roof/app
chmod +x deploy.sh
./deploy.sh
```

## 11. Что проверить сразу после запуска
- `docker compose ps`
- `docker compose logs app --tail=100`
- `docker compose logs db --tail=100`
- открывается главная по HTTPS
- нет 502 от Nginx
- работает форма заявки
- работает интеграционный модуль CRM
- Prisma migrations применились без ошибок

## 12. Базовая дисциплина сервера
- не вести разработку на VPS;
- не редактировать production-код вручную в контейнере;
- не хранить секреты в git;
- не открывать порт PostgreSQL наружу;
- все релизы делать только из `main`.
