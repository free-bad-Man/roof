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

type ArticlePageParams = {
  slug: string;
};

type ArticlePageProps = {
  params: Promise<ArticlePageParams>;
};

export function generateStaticParams() {
  return getArticleStaticParams();
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return buildMetadata({
    path: `/stati/${slug}/`,
    seo: getArticleSeoEntry(slug),
    fallbackTitle: article.title,
    fallbackDescription: article.excerpt,
  });
}

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticlePageTemplate
      title={article.title}
      excerpt={article.excerpt}
    />
  );
}