import type { Metadata } from 'next';
import { AboutPageTemplate } from '@/components/templates/AboutPageTemplate';
import { companyContent } from '@/shared/content/company';

export const metadata: Metadata = {
  title: companyContent.about.seoTitle,
  description: companyContent.about.seoDescription,
};

export default function Page() {
  return <AboutPageTemplate />;
}
