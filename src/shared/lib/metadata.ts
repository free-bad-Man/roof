import type { Metadata } from 'next';
import { company } from '@/shared/data/site';
import type { SeoEntry } from '@/shared/content';

function normalizeSiteUrl(url?: string) {
  return (url || 'https://example.com').replace(/\/$/, '');
}

export function getSiteUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL,
  );
}

export function buildMetadata({
  path,
  seo,
  fallbackTitle,
  fallbackDescription,
}: {
  path: string;
  seo?: SeoEntry;
  fallbackTitle: string;
  fallbackDescription: string;
}): Metadata {
  const title = seo?.title || fallbackTitle;
  const description = seo?.description || fallbackDescription;
  const canonicalPath = path.startsWith('/') ? path : `/${path}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'website',
      locale: 'ru_RU',
      siteName: company.marketingName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: seo?.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}