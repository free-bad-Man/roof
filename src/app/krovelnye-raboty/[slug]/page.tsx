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
  return getServiceStaticParams('krovelnye-raboty');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getServiceBySectionAndSlug('krovelnye-raboty', slug);

  if (!item) {
    return {};
  }

  return buildMetadata({
    path: `/krovelnye-raboty/${slug}/`,
    seo: getServiceSeoEntry('krovelnye-raboty', slug),
    fallbackTitle: item.title,
    fallbackDescription: item.subtitle,
  });
}

export default async function RoofingServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getServiceBySectionAndSlug('krovelnye-raboty', slug);

  if (!item) {
    return notFound();
  }

  return <ServicePageTemplate {...item} />;
}
