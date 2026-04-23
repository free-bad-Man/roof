import type { Metadata } from 'next';
import { ContactsPageTemplate } from '@/components/templates/ContactsPageTemplate';
import { companyContent } from '@/shared/content/company';

export const metadata: Metadata = {
  title: companyContent.contacts.seoTitle,
  description: companyContent.contacts.seoDescription,
};

export default function Page() {
  return <ContactsPageTemplate />;
}
