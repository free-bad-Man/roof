import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CasePageTemplate } from '@/components/templates/CasePageTemplate';
import { casePages } from '@/shared/content/cases';

const PAGE_MAP = {
  'remont-myagkoy-krovli-simferopol': casePages.remontMyagkoyKrovliSimferopol,
  'ustranenie-protechki-kommercheskiy-obekt': casePages.ustranenieProtechkiKommercheskiyObekt,
  'gidroizolyatsiya-balkona': casePages.gidroizolyatsiyaBalkona,
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
  return <CasePageTemplate data={item} />;
}
