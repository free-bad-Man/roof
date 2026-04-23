import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate';
import { articlePages } from '@/shared/content/articles';

const PAGE_MAP = {
  'kogda-nuzhen-remont-krovli-a-kogda-zamena': articlePages.kogdaNuzhenRemontKrovliAKogdaZamena,
  'kak-nayti-prichinu-protechki-krovli': articlePages.kakNaytiPrichinuProtechkiKrovli,
  'mozhno-li-vosstanovit-myagkuyu-krovlyu-bez-demontazha': articlePages.mozhnoLiVosstanovitMyagkuyuKrovlyuBezDemontazha,
} as const;

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return Object.keys(PAGE_MAP).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = PAGE_MAP[params.slug as keyof typeof PAGE_MAP];
  if (!item) return {};
  return {
    title: item.seoTitle,
    description: item.seoDescription,
  };
}

export default function Page({ params }: PageProps) {
  const item = PAGE_MAP[params.slug as keyof typeof PAGE_MAP];
  if (!item) notFound();
  return <ArticlePageTemplate data={item} />;
}
