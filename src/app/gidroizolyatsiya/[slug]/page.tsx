import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import {
  getServiceBySectionAndSlug,
  getServiceSeoEntry,
  getServiceStaticParams,
} from '@/shared/content';
import { buildMetadata } from '@/shared/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceStaticParams('gidroizolyatsiya');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getServiceBySectionAndSlug('gidroizolyatsiya', slug);

  if (!item) {
    return {};
  }

  return buildMetadata({
    path: `/gidroizolyatsiya/${slug}/`,
    seo: getServiceSeoEntry('gidroizolyatsiya', slug),
    fallbackTitle: item.title,
    fallbackDescription: item.subtitle,
  });
}

export default async function WaterproofingServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getServiceBySectionAndSlug('gidroizolyatsiya', slug);

  if (!item) {
    return notFound();
  }

  return <ServicePageTemplate {...item} />;
}