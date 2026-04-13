# Component map — Крымская Кровельная

## App router
- `src/app/layout.tsx` — глобальный layout
- `src/app/page.tsx` — главная
- `src/app/krovelnye-raboty/page.tsx` — индекс раздела
- `src/app/krovelnye-raboty/[slug]/page.tsx` — шаблон услуги кровли
- `src/app/gidroizolyatsiya/page.tsx` — индекс раздела
- `src/app/gidroizolyatsiya/[slug]/page.tsx` — шаблон услуги гидроизоляции
- `src/app/natyazhnye-potolki/page.tsx` — индекс раздела
- `src/app/natyazhnye-potolki/[slug]/page.tsx` — шаблон услуги потолков
- `src/app/nashi-raboty/page.tsx` — индекс кейсов
- `src/app/nashi-raboty/[slug]/page.tsx` — шаблон кейса
- `src/app/stati/page.tsx` — индекс статей
- `src/app/stati/[slug]/page.tsx` — шаблон статьи
- `src/app/o-kompanii/page.tsx` — о компании
- `src/app/kontakty/page.tsx` — контакты

## Layout components
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/layout/MobileStickyBar.tsx`

## Forms
- `src/components/forms/LeadForm.tsx`
  - variant `main`
  - variant `service`
  - variant `inspection`

## Sections
- `HeroSection`
- `ServicesGrid`
- `PriceTableSection`
- `StepsSection`
- `FaqSection`
- `CtaBanner`
- `GeoSection`

## Page templates
- `HomePageTemplate`
- `ServicePageTemplate`
- `CasePageTemplate`
- `ArticlePageTemplate`
- `AboutPageTemplate`
- `ContactsPageTemplate`

## Shared UI
- `Button`
- `Card`
- `Section`
- `InputField`
- `TextareaField`
- `SelectField`
- `Accordion`

## Shared data
- `src/shared/data/site.ts` — контакты, навигация, цены, кейсы, FAQ, статьи
- `src/shared/data/service-pages.ts` — данные шаблонов услуг
- `src/shared/types/content.ts` — типы контента
- `src/shared/lib/cn.ts` — helper для className

## Очерёдность подключения в реальный repo
1. Layout + globals
2. Shared UI
3. Header / Footer / Mobile CTA
4. Home template
5. Service template
6. Case + article templates
7. Dynamic data source вместо локальных mock-данных
8. Подключение amoCRM / API / CMS
