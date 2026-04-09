import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate';
import {
  getArticleBySlug,
  getArticleSeoEntry,
  getArticleStaticParams,
} from '@/shared/content';
import { buildMetadata } from '@/shared/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getArticleBySlug(slug);

  if (!item) {
    return {};
  }

  return buildMetadata({
    path: `/stati/${slug}/`,
    seo: getArticleSeoEntry(slug),
    fallbackTitle: item.title,
    fallbackDescription: item.excerpt,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getArticleBySlug(slug);

  if (!item) {
    return notFound();
  }

  return <ArticlePageTemplate excerpt={item.excerpt} title={item.title} />;
}
