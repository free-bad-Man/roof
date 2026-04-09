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

export const services: ServiceCard[] = getServiceRegistry().map((item) => ({
  slug: item.slug,
  title: item.title.replace(' в Крыму', ''),
  href: `/${item.section}/${item.slug}/`,
  excerpt: item.excerpt,
  priceLabel: item.priceLabel,
  category: item.section,
}));

export const homeFaq: FaqItem[] = [
  {
    question: 'Вы занимаетесь только кровлей?',
    answer:
      'Основной профиль компании — ремонт, восстановление и гидроизоляция кровли. Натяжные потолки — отдельное дополнительное направление.',
  },
  {
    question: 'Вы делаете только замену кровли?',
    answer:
      'Нет. Мы определяем, когда нужен ремонт, когда восстановление, когда гидроизоляция, а когда уже действительно нужна замена.',
  },
  {
    question: 'Можно ли восстановить мягкую кровлю без полного демонтажа?',
    answer:
      'Во многих случаях — да. Всё зависит от состояния основания, покрытия и проблемных зон. После осмотра подскажем, есть ли смысл в восстановлении.',
  },
  {
    question: 'Вы устраняете протечки?',
    answer:
      'Да. Это одна из наших ключевых входных услуг. Работаем не только с пятном протечки, а с причиной её появления.',
  },
  {
    question: 'Работаете по Симферополю или по всему Крыму?',
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