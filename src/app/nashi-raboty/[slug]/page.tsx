import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CasePageTemplate } from '@/components/templates/CasePageTemplate';
import {
  getCaseBySlug,
  getCaseSeoEntry,
  getCaseStaticParams,
} from '@/shared/content';
import { buildMetadata } from '@/shared/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    return {};
  }

  return buildMetadata({
    path: `/nashi-raboty/${slug}/`,
    seo: getCaseSeoEntry(slug),
    fallbackTitle: item.title,
    fallbackDescription: item.result,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    return notFound();
  }

  return (
    <CasePageTemplate
      location={item.location}
      problem={item.problem}
      result={item.result}
      solution={item.solution}
      title={item.title}
    />
  );
}