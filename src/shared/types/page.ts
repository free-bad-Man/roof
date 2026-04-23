export type FaqItem = {
  question: string;
  answer: string;
};

export type CaseTeaserItem = {
  title: string;
  href: string;
  location?: string;
  result?: string;
};

export type ArticleTeaserItem = {
  title: string;
  href: string;
  excerpt?: string;
};

export type ServicePageData = {
  slug: string;
  section: 'krovelnye-raboty' | 'gidroizolyatsiya' | 'natyazhnye-potolki';
  title: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  heroSubtitle: string;
  priceLabel?: string;
  bullets: string[];
  whenItFitsTitle: string;
  whenItFitsText: string;
  signs?: string[];
  noFullReplaceTitle: string;
  noFullReplaceText: string;
  includesTitle: string;
  includesItems: string[];
  stepsTitle?: string;
  steps?: string[];
  faq: FaqItem[];
  relatedCases?: CaseTeaserItem[];
  relatedArticles?: ArticleTeaserItem[];
  leadFormTitle?: string;
  leadFormSubtitle?: string;
  photoCtaTitle?: string;
  photoCtaText?: string;
};
