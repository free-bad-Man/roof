export type NavItem = {
  label: string;
  href: string;
};

export type ServiceSection = 'krovelnye-raboty' | 'gidroizolyatsiya' | 'natyazhnye-potolki';

export type ServiceCard = {
  slug: string;
  title: string;
  href: string;
  excerpt: string;
  priceLabel?: string;
  category: ServiceSection;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  section: ServiceSection;
  title: string;
  subtitle: string;
  priceLabel?: string;
  whenUseful: string[];
  includes: string[];
  advantages: string[];
  faq: FaqItem[];
};

export type CasePageData = {
  slug: string;
  title: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
};

export type ArticlePageData = {
  slug: string;
  title: string;
  excerpt: string;
  body?: string[];
};

export type CaseCard = {
  slug: string;
  title: string;
  href: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
};

export type ArticleCard = {
  slug: string;
  title: string;
  href: string;
  excerpt: string;
};
