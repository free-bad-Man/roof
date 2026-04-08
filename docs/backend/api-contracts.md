# API contracts и server-side контракты

## Почему публичных API мало

Проект на Next.js с SSR/SSG, поэтому контент (`Service`, `CaseStudy`, `Article`, `StaticPageSeo`) лучше читать **на сервере напрямую через Prisma**, а не дублировать это REST API без необходимости. Это помогает держать HTML-first сайт, не плодить лишние endpoint'ы и не превращать сайт в SPA. fileciteturn2file0

Публичными route handlers делаем только то, что реально требует HTTP-входа извне:
- приём лидов с форм;
- вебхук от amoCRM.

## Server actions

### `submitLeadAction(input)`
Назначение:
- использовать в server components и формах App Router без лишнего клиентского слоя;
- валидировать вход;
- сохранить `Lead`;
- попытаться синхронизировать в amoCRM.

Вызывает:
1. `leadInputSchema.parse`
2. `createLead(input)`
3. `syncLeadToAmo(lead.id)` — если amo включена

### Почему server action нужен
Потому что часть форм может работать напрямую из Next.js без отдельного fetch на `/api/leads`, но логика сохранения должна быть общей.

## Route handlers

### 1) `POST /api/leads`
Главный endpoint приёма заявок с сайта.

#### Что принимает
```json
{
  "formType": "HERO",
  "source": "SITE",
  "serviceSlug": "remont-krovli",
  "name": "Андрей",
  "phone": "+79790361222",
  "email": "",
  "telegram": "",
  "city": "Симферополь",
  "objectType": "PRIVATE_HOUSE",
  "message": "Течёт мягкая кровля, нужен осмотр",
  "needsVisit": true,
  "address": "Симферополь, ...",
  "attachments": [
    {
      "url": "https://cdn.example.com/leads/file-1.jpg",
      "name": "roof-1.jpg"
    }
  ],
  "pagePath": "/krovelnye-raboty/remont-krovli/",
  "utm": {
    "source": "yandex",
    "medium": "cpc",
    "campaign": "remont-krovli"
  },
  "referrer": "https://yandex.ru/..."
}
```

#### Валидация
Обязательные поля:
- `formType`
- `phone`

Опциональные, но поддерживаемые:
- `serviceSlug`
- `name`
- `city`
- `objectType`
- `message`
- `needsVisit`
- `attachments`
- `utm`

#### Что делает
1. нормализует телефон;
2. ищет `Service` по `serviceSlug`;
3. создаёт `Lead`;
4. если amoCRM настроена — делает синхронизацию;
5. возвращает короткий ответ для UI.

#### Ответ 201
```json
{
  "ok": true,
  "leadId": "clx...",
  "amoSyncStatus": "PENDING"
}
```

#### Ответ 422
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

#### Ответ 500
```json
{
  "ok": false,
  "error": "Internal server error"
}
```

### 2) `POST /api/amo/webhook`
Входящий webhook от amoCRM.

#### Зачем нужен
Минимальный сценарий:
- обновить локальный `Lead`, если сделка уже создана в amoCRM;
- зафиксировать статус синхронизации;
- позже можно расширить на обновление статусов `WON` / `LOST`.

#### Что проверяем
- header `x-amo-signature` или внутренний shared secret;
- соответствие `amoLeadId` локальной записи.

#### Пример входа
```json
{
  "leadId": "12345678",
  "contactId": "87654321",
  "status": "142",
  "updatedAt": "2026-04-09T10:00:00.000Z"
}
```

#### Ответ 200
```json
{
  "ok": true
}
```

#### Ответ 401
```json
{
  "ok": false,
  "error": "Unauthorized webhook"
}
```

## Контентные server-side функции

### `getPublishedServices()`
Используется в:
- меню;
- разделах услуг;
- блоках “Ключевые услуги”.

### `getServiceBySlug(slug)`
Используется в серверных страницах услуг.

### `getPublishedCaseStudies()`
Используется в:
- `/nashi-raboty/`;
- связанных блоках на страницах услуг.

### `getCaseStudyBySlug(slug)`
Используется в детальной странице кейса.

### `getPublishedArticles()`
Используется в `/stati/` и связанных блоках.

### `getArticleBySlug(slug)`
Используется в детальной странице статьи.

### `getSeoByPath(path)`
Используется на статичных страницах:
- `/`
- `/o-kompanii/`
- `/kontakty/`
- `/simferopol/`
- родительских разделах услуг.

## Правило по контенту

Отдельные публичные CRUD-роуты для услуг, кейсов, статей и SEO **не делаем сейчас**. На текущем этапе нет задачи строить внешнюю админку или headless CMS, а лишний API только усложнит проект.

## Env-переменные

### Обязательные
```env
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SITE_URL=
```

### Для защиты route handlers
```env
LEAD_WEBHOOK_SECRET=
AMOCRM_WEBHOOK_SECRET=
```

### Для amoCRM
```env
AMOCRM_BASE_URL=
AMOCRM_CLIENT_ID=
AMOCRM_CLIENT_SECRET=
AMOCRM_REDIRECT_URI=
AMOCRM_REFRESH_TOKEN=
AMOCRM_PIPELINE_ID=
AMOCRM_STATUS_NEW_ID=
AMOCRM_FIELD_IDS_JSON=
AMOCRM_RESPONSIBLE_USER_ID=
```

`AMOCRM_FIELD_IDS_JSON` удобно хранить как JSON-мапу вида:
```json
{
  "source": 111111,
  "service": 222222,
  "city": 333333,
  "objectType": 444444,
  "needsVisit": 555555,
  "address": 666666
}
```

## Зависимости

```bash
npm i @prisma/client prisma zod
```

Дополнительно по желанию:
```bash
npm i pino
```

Но для старта достаточно Prisma + Zod + встроенного `fetch`.
