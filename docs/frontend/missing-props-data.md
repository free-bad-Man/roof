# Missing props / data

## 1. Контент, который уже можно рендерить как структуру, но нельзя финализировать без данных
- Финальные фото объектов для главной, услуг, кейсов
- Галереи до/после по каждому кейсу
- Список реальных отзывов
- Карта офиса / embed и координаты
- Финальные meta title / description для всех второстепенных страниц

## 2. Для service template
Нужны пропсы:
- `heroImage`
- `serviceBenefits[]`
- `relatedCases[]`
- `relatedArticles[]`
- `priceNote`
- `faq[]` по каждой конкретной услуге
- `formSourceName` для CRM-меток

## 3. Для case template
Нужны пропсы:
- `gallery[]`
- `objectType`
- `workScope`
- `city`
- `duration`
- `beforeText`
- `afterText`
- `relatedServiceHref`

## 4. Для article template
Нужны пропсы:
- `publishedAt`
- `author`
- `toc[]`
- `bodyBlocks[]`
- `relatedService`
- `faq[]`, если статья коммерчески усиливает услугу

## 5. Для forms / CRM
Нужны технические данные:
- endpoint или action для отправки формы
- UTM capture strategy
- source naming map для amoCRM
- webhook / server action schema
- success state / error state copy

## 6. Для header / footer
Нужно подтвердить:
- финальный формат логотипа для сайта: горизонтальная версия или текстовый lockup
- нужны ли отдельные ссылки на WhatsApp / MAX в видимом UI
- будет ли отдельная страница `simferopol/` в первой волне
