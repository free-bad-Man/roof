# API contracts и server-side контракты — облегчённая MVP-модель

## Главный принцип

В MVP backend делится на два слоя:

1. **Content layer** — читается напрямую из `content/*`;
2. **Operational layer** — работает через PostgreSQL и обслуживает только заявки и amoCRM sync.

Это значит:
- нет публичного CRUD API для услуг, кейсов, статей и страниц;
- нет админского API под CMS;
- нет дублирования `content/*` в БД;
- публичный HTTP-вход нужен только там, где сайт принимает внешнее событие.

---

## Что не делаем как API

На MVP **не делаем** route handlers вида:
- `GET /api/services`
- `GET /api/cases`
- `GET /api/articles`
- `GET /api/pages`
- `POST /api/services`
- `PATCH /api/articles/:id`
- и любой другой CRUD для контента.

### Почему
Потому что контент должен приходить из `content/*` и рендериться в Next.js напрямую на сервере.
Это лучше соответствует HTML-first архитектуре сайта и не создаёт второй источник правды. fileciteturn2file0

---

## Источники данных

### Контентные данные
Берутся из файлов:
- `content/services/*`
- `content/cases/*`
- `content/articles/*`
- `content/pages/*`

### Операционные данные
Хранятся в PostgreSQL:
- `Lead`
- техполя синхронизации с amoCRM

---

## Server-side функции без публичного API

Ниже — то, что должно жить в `src/lib/server/*` и использоваться страницами, layout и metadata generation напрямую.

### Content readers

#### `getServices()`
Читает услуги из `content/services/*`.

Используется для:
- меню;
- карточек услуг;
- связки `serviceCode -> label -> route`;
- подстановки данных в формы услуг.

#### `getServiceByCode(code)`
Возвращает одну услугу по коду / slug.

Используется в:
- странице услуги;
- генерации metadata;
- маппинге `serviceCode` в заявках.

#### `getCaseStudies()`
Читает кейсы из `content/cases/*`.

#### `getCaseStudyBySlug(slug)`
Читает один кейс по slug.

#### `getArticles()`
Читает статьи из `content/articles/*`.

#### `getArticleBySlug(slug)`
Читает одну статью по slug.

#### `getPageContent(path)`
Читает контент статичных страниц из `content/pages/*`.

Примеры:
- `/`
- `/o-kompanii/`
- `/kontakty/`
- `/krovelnye-raboty/`
- `/gidroizolyatsiya/`

#### `getPageSeo(path)`
Возвращает SEO-данные страницы из `content/pages/*` или из экспортируемого metadata-объекта.

---

## Server-side функции операционного слоя

### `createLead(input)`
Назначение:
- провалидировать и нормализовать входящие данные;
- сохранить заявку в БД;
- вычислить `dedupeKey`;
- вернуть созданный `Lead`.

### `syncLeadToAmo(leadId)`
Назначение:
- прочитать лид из БД;
- преобразовать его в payload для amoCRM;
- отправить контакт и сделку;
- записать `amoLeadId`, `amoContactId`, `amoSyncStatus`, `amoSyncedAt` или `amoSyncError`.

### `markLeadSyncFailed(leadId, error)`
Назначение:
- единообразно пометить неудачную отправку;
- сохранить текст ошибки для ретрая.

### `retryLeadSync(leadId)`
Назначение:
- повторно отправить заявку, если ранняя синхронизация не удалась.

### `findPotentialDuplicateLead(input)`
Назначение:
- мягко проверить недавние совпадения по телефону / email / dedupeKey;
- не блокировать сохранение, а помогать операционной логике.

---

## Route handlers

На MVP достаточно двух route handlers.

---

### 1. `POST /api/leads`
Главная точка входа для всех форм сайта.

Используется для:
- формы первого экрана;
- формы страницы услуги;
- формы “запросить замер / отправить фото”. fileciteturn2file0

### Формат запроса

```json
{
  "formType": "HERO",
  "source": "SITE",
  "serviceCode": "remont-krovli",
  "serviceLabel": "Ремонт кровли",
  "name": "Андрей",
  "phone": "+7 (979) 036-12-22",
  "email": "",
  "telegram": "",
  "city": "Симферополь",
  "objectType": "PRIVATE_HOUSE",
  "message": "Течёт мягкая кровля, нужен осмотр",
  "needsVisit": true,
  "address": "Симферополь, ул. ...",
  "attachments": [
    {
      "url": "https://cdn.example.com/uploads/lead-1.jpg",
      "name": "lead-1.jpg"
    }
  ],
  "pagePath": "/krovelnye-raboty/remont-krovli/",
  "utm": {
    "source": "yandex",
    "medium": "cpc",
    "campaign": "remont-krovli",
    "term": "ремонт кровли",
    "content": "ad-1"
  },
  "referrer": "https://yandex.ru/"
}
```

### Обязательные поля
- `formType`
- `phone`

### Условно-обязательные поля
- `serviceCode` — обязателен для формы услуги, но не для всех сценариев;
- `message` — крайне желателен, но не должен ломать приём лида;
- `serviceLabel` — можно передавать для фиксации человекочитаемого значения.

### Что делает endpoint
1. валидирует вход;
2. нормализует телефон;
3. при необходимости дополняет `serviceLabel` по `serviceCode` из `content/services/*`;
4. вычисляет `dedupeKey`;
5. сохраняет `Lead` в PostgreSQL;
6. запускает синхронизацию с amoCRM;
7. возвращает короткий ответ для UI.

### Ответ `201 Created`

```json
{
  "ok": true,
  "leadId": "clx_example",
  "status": "NEW",
  "amoSyncStatus": "PENDING"
}
```

### Ответ `422 Unprocessable Entity`

```json
{
  "ok": false,
  "error": "Validation failed",
  "issues": [
    {
      "path": ["phone"],
      "message": "Укажите телефон"
    }
  ]
}
```

### Ответ `500 Internal Server Error`

```json
{
  "ok": false,
  "error": "Internal server error"
}
```

---

### 2. `POST /api/amo/webhook`
Минимальный входящий endpoint для событий от amoCRM.

### Зачем нужен
На старте он нужен не для сложной двусторонней синхронизации, а чтобы:
- зафиксировать, что CRM обработала заявку;
- обновить локальный статус по `amoLeadId`;
- сохранить технический след входящего события.

### Что проверяем
- секрет вебхука или другой agreed auth-механизм;
- наличие `amoLeadId` в локальной базе.

### Пример запроса

```json
{
  "leadId": "12345678",
  "contactId": "87654321",
  "status": "142",
  "updatedAt": "2026-04-09T10:00:00.000Z"
}
```

### Что делает endpoint
1. проверяет авторизацию webhook;
2. находит локальный `Lead` по `amoLeadId`;
3. обновляет служебные поля синка;
4. при необходимости сохраняет raw payload.

### Ответ `200 OK`

```json
{
  "ok": true
}
```

### Ответ `401 Unauthorized`

```json
{
  "ok": false,
  "error": "Unauthorized webhook"
}
```

---

## Server actions

### `submitLeadAction(input)`

Назначение:
- использовать формы App Router без лишнего клиентского API-слоя;
- разделять UI и бизнес-логику;
- вызывать ту же доменную логику, что и `/api/leads`.

### Последовательность
1. `validateLeadInput(input)`
2. `createLead(input)`
3. `syncLeadToAmo(lead.id)`
4. вернуть безопасный ответ для интерфейса

### Почему server action нужен
Часть форм может отправляться напрямую из серверных компонентов Next.js. Логика при этом должна быть общей, а не дублироваться отдельно в UI.

---

## Контракт валидации

### Базовые правила
- телефон обязателен;
- имя, email, telegram — опциональны;
- `serviceCode` валидируется как строковый код из `content/services/*`;
- `objectType` ограничен enum;
- `attachments` — массив объектов с `url` и опциональным `name`;
- все строковые поля триммятся;
- телефон нормализуется до единого вида.

### Что важно
Backend не должен зависеть от наличия таблицы `Service`.
Если `serviceCode` неизвестен, endpoint не обязан падать 500.
Безопасный вариант:
- сохранить лид;
- зафиксировать переданное значение;
- при необходимости отправить в amoCRM `serviceLabel` как текст.

---

## Контракт синхронизации с amoCRM

### Вход в интеграцию
Для синка используется `Lead` из БД и маппинг в поля amoCRM.

### Что отправляем в amoCRM

#### Контакт
- `name`
- `phone`
- `email`
- `telegram`

#### Сделка
- название сделки;
- источник;
- услуга;
- город;
- тип объекта;
- описание задачи;
- нужен выезд;
- адрес объекта;
- UTM / страница / реферер — при необходимости в служебные поля или заметку.

### Результат синка
После успешной отправки сохраняются:
- `amoLeadId`
- `amoContactId`
- `amoSyncStatus = SYNCED`
- `amoSyncedAt`

Если синк не удался:
- `amoSyncStatus = FAILED`
- `status = SYNC_FAILED`
- `amoSyncError`

---

## Название сделки в amoCRM

Рекомендуемый формат, согласованный с CRM-логикой:

`[Услуга] — [Город] — [Имя или Новый клиент]`

Примеры:
- `Ремонт кровли — Симферополь — Андрей`
- `Устранение протечки — Ялта — Новый клиент`

Это даёт понятную сделку менеджеру без лишней магии. fileciteturn2file2

---

## Где брать `serviceCode` и `serviceLabel`

### Для формы на странице услуги
- `serviceCode` берётся из данных страницы / файла в `content/services/*`;
- `serviceLabel` можно пробросить сразу из того же источника.

### Для главной формы
- если пользователь выбрал услугу, отправляем код;
- если услуга не выбрана, сохраняем заявку без жёсткой привязки.

### Для формы “запросить замер / отправить фото”
- можно отправлять без `serviceCode`, если сценарий входной и общий.

---

## `.env.example`

В проекте должен лежать минимальный пример окружения.

```env
# App
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/krymskaya_krovelnaya
DIRECT_URL=postgresql://postgres:postgres@localhost:5432/krymskaya_krovelnaya

# Security
LEAD_WEBHOOK_SECRET=change_me
AMOCRM_WEBHOOK_SECRET=change_me

# amoCRM
AMOCRM_BASE_URL=https://example.amocrm.ru
AMOCRM_CLIENT_ID=your_client_id
AMOCRM_CLIENT_SECRET=your_client_secret
AMOCRM_REDIRECT_URI=http://localhost:3000/api/amo/oauth/callback
AMOCRM_REFRESH_TOKEN=your_refresh_token
AMOCRM_PIPELINE_ID=0
AMOCRM_STATUS_NEW_ID=0
AMOCRM_RESPONSIBLE_USER_ID=0
AMOCRM_FIELD_IDS_JSON={"source":111111,"service":222222,"city":333333,"objectType":444444,"needsVisit":555555,"address":666666}
```

---

## Минимальный состав server-side файлов

### `src/lib/server/`
- `db.ts`
- `env.ts`
- `validators/lead.ts`
- `leads/create-lead.ts`
- `leads/find-potential-duplicate.ts`
- `leads/amo-sync.ts`
- `content/get-services.ts`
- `content/get-service-by-code.ts`
- `content/get-cases.ts`
- `content/get-articles.ts`
- `content/get-page-content.ts`

### `src/app/api/`
- `api/leads/route.ts`
- `api/amo/webhook/route.ts`

### `src/app/actions/`
- `submit-lead.ts`

Важно:
контентные helper'ы читают файлы и **не ходят в БД**.

---

## Зависимости

Минимум:

```bash
npm i @prisma/client prisma zod
```

Дополнительно по желанию:

```bash
npm i pino
```

Но для MVP это необязательно.

---

## Итог

Обновлённый backend-контракт MVP выглядит так:

- контент сайта читается только из `content/*`;
- публичный backend ограничен приёмом заявок и webhook от amoCRM;
- PostgreSQL хранит только лиды и техсостояние синхронизации;
- никакого CMS API и дублирования контента в БД нет.
