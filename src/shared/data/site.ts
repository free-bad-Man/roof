import {
  getArticleRegistry,
  getCaseRegistry,
  getServiceRegistry,
} from '@/shared/content';
import type {
  ArticleCard,
  CaseCard,
  FaqItem,
  NavItem,
  ServiceCard,
} from '@/shared/types/content';

export const company = {
  marketingName: 'Крымская Кровельная',
  legalName: 'Крымская кровельная компания',
  descriptor: 'Ремонт, восстановление и гидроизоляция кровли в Крыму',
  slogan: 'Правильные решения для кровли',
  phone: '+7 (979) 036-12-22',
  phoneHref: 'tel:+79790361222',
  telegram: '@krymskaya.krovelnaya',
  telegramHref: 'https://t.me/krymskaya.krovelnaya',
  email: 'krymskaya-krovelnaya@yandex.ru',
  emailHref: 'mailto:krymskaya-krovelnaya@yandex.ru',
  max: '+7 (979) 036-12-22',
  address: 'Симферополь, ул. Лавриненко, 9',
  worktime: 'Пн–Пт: 09:00–13:00, 14:00–18:00',
  geoLine:
    'Офис в Симферополе. Работаем по Симферополю и Крыму: Севастополь, Ялта, Алушта, Феодосия, Евпатория, Саки, Бахчисарай, Судак, Керчь, Джанкой.',
};

export const mainNav: NavItem[] = [
  { label: 'Кровельные работы', href: '/krovelnye-raboty/' },
  { label: 'Гидроизоляция', href: '/gidroizolyatsiya/' },
  { label: 'Натяжные потолки', href: '/natyazhnye-potolki/' },
  { label: 'Наши работы', href: '/nashi-raboty/' },
  { label: 'О компании', href: '/o-kompanii/' },
  { label: 'Контакты', href: '/kontakty/' },
];

export const heroBullets = [
  'Не навязываем замену там, где кровлю можно восстановить',
  'Устраняем причину протечки, а не просто закрываем симптом',
  'Работаем по Симферополю и Крыму',
];

const serviceOrder: string[] = [
  'remont-krovli',
  'gidroizolyatsiya-krovli',
  'vosstanovlenie-myagkoy-krovli-sinzatim',
  'ustranenie-protechek',
  'vosstanovlenie-krovli',
  'balkony-i-terrasy',
  'krovlya-pod-klyuch',
  'pod-klyuch',
];

const serviceOrderMap = new Map<string, number>(
  serviceOrder.map((slug, index) => [slug, index]),
);

export const services: ServiceCard[] = getServiceRegistry()
  .map((item) => ({
    slug: item.slug,
    title: item.title.replace(' в Крыму', ''),
    href: `/${item.section}/${item.slug}/`,
    excerpt: item.excerpt,
    priceLabel: item.priceLabel,
    category: item.section,
  }))
  .sort((a, b) => {
    const aOrder = serviceOrderMap.get(a.slug) ?? 999;
    const bOrder = serviceOrderMap.get(b.slug) ?? 999;
    return aOrder - bOrder;
  });

export const homeFaq: FaqItem[] = [
  {
    question: 'Вы навязываете полную замену кровли?',
    answer:
      'Нет. Сначала оцениваем состояние объекта и подбираем решение по факту: ремонт, восстановление, гидроизоляция или замена, когда она действительно нужна.',
  },
  {
    question: 'Можно ли восстановить мягкую кровлю без демонтажа?',
    answer:
      'Во многих случаях — да. Всё зависит от состояния основания, покрытия и проблемных зон. После оценки объекта подскажем, есть ли смысл в восстановлении.',
  },
  {
    question: 'Почему кровля снова течёт после прошлого ремонта?',
    answer:
      'Частая причина в том, что устранили следствие, а не источник проблемы. Мы смотрим не только на место протечки, а на узлы, примыкания, покрытие и слабые зоны.',
  },
  {
    question: 'Когда уже точно нужна замена, а не ремонт?',
    answer:
      'Когда состояние кровли и основания не позволяет получить разумный результат через локальный ремонт или восстановление. Это определяется по состоянию объекта, а не по шаблону.',
  },
  {
    question: 'Можно ли получить предварительную оценку по фото?',
    answer:
      'Да. Пришлите 2–4 фото объекта, город и краткое описание задачи. После этого сориентируем по возможному решению и следующему шагу.',
  },
  {
    question: 'Вы работаете только по Симферополю?',
    answer:
      'Офис находится в Симферополе. Работаем по Симферополю и по Крыму.',
  },
];

export const cases: CaseCard[] = getCaseRegistry().map((item) => ({
  slug: item.slug,
  title: item.title,
  href: `/nashi-raboty/${item.slug}/`,
  location: item.location,
  problem: item.problem,
  solution: item.solution,
  result: item.result,
}));

export const articles: ArticleCard[] = getArticleRegistry().map((item) => ({
  slug: item.slug,
  title: item.title,
  href: `/stati/${item.slug}/`,
  excerpt: item.excerpt,
}));

export const priceRows = [
  ['Ремонт кровли', 'от 450 ₽/м²'],
  ['Гидроизоляция кровли', 'от 390 ₽/м²'],
  ['Восстановление мягкой кровли по технологии Sinzatim', 'от 590 ₽/м²'],
  ['Кровля под ключ', 'расчёт после осмотра'],
  ['Устранение протечек', 'от 5 000 ₽'],
  ['Натяжные потолки под ключ', 'от 350 ₽/м²'],
] as const;