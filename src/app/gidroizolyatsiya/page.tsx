import type { Metadata } from 'next';
import { ListingPageTemplate } from '@/components/templates/ListingPageTemplate';
import { sectionPages } from '@/shared/content/sections';

const data = sectionPages.gidroizolyatsiya;

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
};

export default function Page() {
  return <ListingPageTemplate data={data} />;
}
