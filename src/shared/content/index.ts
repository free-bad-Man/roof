import type {
  ArticlePageData,
  CasePageData,
  ServicePageData,
  ServiceSection,
} from '@/shared/types/content';

export type SeoEntry = {
  title: string;
  description: string;
  h1?: string;
  noindex?: boolean;
};

type ServiceRouteEntry = {
  slug: string;
  section: ServiceSection;
  title: string;
  excerpt: string;
  priceLabel?: string;
  seo?: SeoEntry;
};

type CaseRouteEntry = {
  slug: string;
  title: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
  seo?: SeoEntry;
};

type ArticleRouteEntry = {
  slug: string;
  title: string;
  excerpt: string;
  seo?: SeoEntry;
};

/**
 * Временный derived adapter-layer.
 * Не source of truth для полного контента и не замена content/*.md / docs/seo/*.md.
 * Здесь только минимальный machine-readable registry для wave-1:
 * slug / title / excerpt / short meta refs.
 */

const SERVICE_ROUTE_REGISTRY: readonly ServiceRouteEntry[] = [
  {
    slug: 'remont-krovli',
    section: 'krovelnye-raboty',
    title: 'Ремонт кровли в Крыму',
    excerpt:
      'Проводим ремонт кровли по состоянию объекта: устраняем протечки, восстанавливаем проблемные зоны и подбираем решение без лишних работ.',
    priceLabel: 'от 450 ₽/м²',
    seo: {
      title: 'Ремонт кровли в Крыму — от 450 ₽/м²',
      description:
        'Ремонт кровли в Симферополе и по Крыму от 450 ₽/м². Устраняем протечки, восстанавливаем проблемные зоны и подбираем решение по фактическому состоянию кровли.',
      h1: 'Ремонт кровли в Крыму',
    },
  },
  {
    slug: 'gidroizolyatsiya-krovli',
    section: 'krovelnye-raboty',
    title: 'Гидроизоляция кровли в Крыму',
    excerpt:
      'Выполняем гидроизоляцию кровли по состоянию объекта: защищаем покрытие, устраняем уязвимые зоны и работаем с причинами протечек.',
    priceLabel: 'от 390 ₽/м²',
    seo: {
      title: 'Гидроизоляция кровли в Крыму — от 390 ₽/м²',
      description:
        'Гидроизоляция кровли в Симферополе и по Крыму от 390 ₽/м². Работаем с мягкой и плоской кровлей, узлами, примыканиями и проблемными зонами.',
      h1: 'Гидроизоляция кровли в Крыму',
    },
  },
  {
    slug: 'vosstanovlenie-myagkoy-krovli-sinzatim',
    section: 'krovelnye-raboty',
    title: 'Восстановление мягкой кровли по технологии Sinzatim',
    excerpt:
      'Технологичное решение для восстановления мягкой кровли, когда важно продлить срок её службы и избежать лишнего демонтажа там, где это возможно.',
    priceLabel: 'от 590 ₽/м²',
    seo: {
      title: 'Восстановление мягкой кровли Sinzatim в Крыму — от 590 ₽/м²',
      description:
        'Восстановление мягкой кровли по технологии Sinzatim в Симферополе и по Крыму от 590 ₽/м². Технологичное решение для проблемных объектов без лишнего демонтажа там, где это возможно.',
      h1: 'Восстановление мягкой кровли по технологии Sinzatim',
    },
  },
  {
    slug: 'krovlya-pod-klyuch',
    section: 'krovelnye-raboty',
    title: 'Кровля под ключ в Крыму',
    excerpt:
      'Комплексный формат работ для частных и коммерческих объектов с понятным составом решения после осмотра и диагностики.',
    priceLabel: 'расчёт после осмотра',
    seo: {
      title: 'Кровля под ключ в Крыму — расчёт после осмотра',
      description:
        'Кровля под ключ в Симферополе и по Крыму. Комплексные кровельные работы для частных и коммерческих объектов с расчётом после осмотра.',
      h1: 'Кровля под ключ в Крыму',
    },
  },
  {
    slug: 'ustranenie-protechek',
    section: 'gidroizolyatsiya',
    title: 'Устранение протечек в Крыму',
    excerpt:
      'Находим причину протечки и подбираем решение по фактическому состоянию объекта: локальный ремонт, герметизация, гидроизоляция или восстановление проблемной зоны.',
    priceLabel: 'от 5 000 ₽',
    seo: {
      title: 'Устранение протечек в Крыму — от 5 000 ₽',
      description:
        'Устраняем протечки кровли, балконов, террас и проблемных узлов в Симферополе и по Крыму. Находим причину проблемы и предлагаем решение без лишних работ.',
      h1: 'Устранение протечек в Крыму',
    },
  },
  {
    slug: 'pod-klyuch',
    section: 'natyazhnye-potolki',
    title: 'Натяжные потолки под ключ',
    excerpt:
      'Отдельное потоковое направление с понятным расчётом, аккуратным монтажом и простой подачей без лишней декоративности.',
    priceLabel: 'от 350 ₽/м²',
    seo: {
      title: 'Натяжные потолки под ключ в Крыму — от 350 ₽/м²',
      description:
        'Натяжные потолки под ключ в Симферополе и по Крыму от 350 ₽/м². Понятный расчёт, аккуратный монтаж и нормальный сервис.',
      h1: 'Натяжные потолки под ключ',
    },
  },
];

const CASE_ROUTE_REGISTRY: readonly CaseRouteEntry[] = [
  {
    slug: 'remont-myagkoy-krovli-simferopol',
    title: 'Ремонт мягкой кровли в Симферополе',
    location: 'Симферополь',
    problem: 'Износ мягкой кровли и локальные протечки.',
    solution: 'Локальное восстановление покрытия и проработка проблемных зон.',
    result: 'Кровля возвращена в рабочее состояние без полной замены.',
    seo: {
      title: 'Ремонт мягкой кровли в Симферополе — кейс',
      description:
        'Кейс по ремонту мягкой кровли в Симферополе: проблема, выбранное решение и результат без полной замены.',
    },
  },
  {
    slug: 'ustranenie-protechki-kommercheskiy-obekt',
    title: 'Устранение протечки на коммерческом объекте',
    location: 'Крым',
    problem: 'Вода проходила через узлы и примыкания.',
    solution: 'Диагностика источника проблемы и точечное восстановление.',
    result: 'Устранена причина протечки, а не только следствие.',
    seo: {
      title: 'Устранение протечки на коммерческом объекте — кейс',
      description:
        'Кейс по устранению протечки на коммерческом объекте: диагностика, точечное решение и результат по факту объекта.',
    },
  },
  {
    slug: 'gidroizolyatsiya-balkona',
    title: 'Гидроизоляция балкона',
    location: 'Крым',
    problem: 'Протечки на балконе после осадков.',
    solution: 'Гидроизоляция уязвимых зон и герметизация узлов.',
    result: 'Балкон защищён от дальнейшего проникновения влаги.',
    seo: {
      title: 'Гидроизоляция балкона — кейс',
      description:
        'Кейс по гидроизоляции балкона: проблемные зоны, выбранное решение и итоговый результат.',
    },
  },
];

const ARTICLE_ROUTE_REGISTRY: readonly ArticleRouteEntry[] = [
  {
    slug: 'kogda-nuzhen-remont-krovli-a-kogda-zamena',
    title: 'Когда нужен ремонт кровли, а когда замена',
    excerpt:
      'Разбираем, в каких случаях хватает ремонта, а когда замена действительно оправдана.',
    seo: {
      title: 'Когда нужен ремонт кровли, а когда замена',
      description:
        'Разбираем, когда хватает ремонта кровли, а когда замена действительно оправдана. Практический разбор по состоянию объекта.',
    },
  },
  {
    slug: 'kak-nayti-prichinu-protechki-krovli',
    title: 'Как найти причину протечки кровли',
    excerpt:
      'Почему нельзя работать только с пятном протечки и как искать источник проблемы.',
    seo: {
      title: 'Как найти причину протечки кровли',
      description:
        'Почему нельзя работать только с пятном протечки и как искать реальную причину проблемы на кровле.',
    },
  },
  {
    slug: 'mozhno-li-vosstanovit-myagkuyu-krovlyu-bez-demontazha',
    title: 'Можно ли восстановить мягкую кровлю без демонтажа',
    excerpt:
      'Краткий разбор, когда восстановление имеет смысл и где работает подход без лишнего демонтажа.',
    seo: {
      title: 'Можно ли восстановить мягкую кровлю без демонтажа',
      description:
        'Краткий разбор, когда восстановление мягкой кровли без лишнего демонтажа действительно имеет смысл.',
    },
  },
];

function toServicePageData(entry: ServiceRouteEntry): ServicePageData {
  return {
    slug: entry.slug,
    section: entry.section,
    title: entry.title,
    subtitle: entry.excerpt,
    priceLabel: entry.priceLabel,
    whenUseful: [],
    includes: [],
    advantages: [],
    faq: [],
  };
}

function toCasePageData(entry: CaseRouteEntry): CasePageData {
  return {
    slug: entry.slug,
    title: entry.title,
    location: entry.location,
    problem: entry.problem,
    solution: entry.solution,
    result: entry.result,
  };
}

function toArticlePageData(entry: ArticleRouteEntry): ArticlePageData {
  return {
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
  };
}

export function getServiceRegistry(section?: ServiceSection) {
  return SERVICE_ROUTE_REGISTRY.filter((item) =>
    section ? item.section === section : true,
  );
}

export function getCaseRegistry() {
  return CASE_ROUTE_REGISTRY;
}

export function getArticleRegistry() {
  return ARTICLE_ROUTE_REGISTRY;
}

export function getServiceBySectionAndSlug(
  section: ServiceSection,
  slug: string,
): ServicePageData | undefined {
  const entry = SERVICE_ROUTE_REGISTRY.find(
    (item) => item.section === section && item.slug === slug,
  );

  return entry ? toServicePageData(entry) : undefined;
}

export function getServiceStaticParams(section?: ServiceSection) {
  return getServiceRegistry(section).map((item) => ({ slug: item.slug }));
}

export function getServiceSeoEntry(
  section: ServiceSection,
  slug: string,
): SeoEntry | undefined {
  return SERVICE_ROUTE_REGISTRY.find(
    (item) => item.section === section && item.slug === slug,
  )?.seo;
}

export function getCaseBySlug(slug: string): CasePageData | undefined {
  const entry = CASE_ROUTE_REGISTRY.find((item) => item.slug === slug);
  return entry ? toCasePageData(entry) : undefined;
}

export function getCaseStaticParams() {
  return CASE_ROUTE_REGISTRY.map((item) => ({ slug: item.slug }));
}

export function getCaseSeoEntry(slug: string): SeoEntry | undefined {
  return CASE_ROUTE_REGISTRY.find((item) => item.slug === slug)?.seo;
}

export function getArticleBySlug(slug: string): ArticlePageData | undefined {
  const entry = ARTICLE_ROUTE_REGISTRY.find((item) => item.slug === slug);
  return entry ? toArticlePageData(entry) : undefined;
}

export function getArticleStaticParams() {
  return ARTICLE_ROUTE_REGISTRY.map((item) => ({ slug: item.slug }));
}

export function getArticleSeoEntry(slug: string): SeoEntry | undefined {
  return ARTICLE_ROUTE_REGISTRY.find((item) => item.slug === slug)?.seo;
}