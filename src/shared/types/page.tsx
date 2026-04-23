import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { servicePages } from '@/shared/content/services';

export default function Page() {
  return <ServicePageTemplate data={servicePages.remontKrovli} />;
}
