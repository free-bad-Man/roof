import type { Metadata } from 'next';
import { CityPageTemplate } from '@/components/templates/CityPageTemplate';
import { simferopolPage } from '@/shared/content/simferopol';

export const metadata: Metadata = {
  title: simferopolPage.seoTitle,
  description: simferopolPage.seoDescription,
};

export default function Page() {
  return <CityPageTemplate data={simferopolPage} />;
}
