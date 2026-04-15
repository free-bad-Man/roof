import { HomePageTemplate } from '@/components/templates/HomePageTemplate';
import {
  articles,
  cases,
  homeFaq,
  priceRows,
  services,
} from '@/shared/data/site';

export default function HomePage() {
  return (
    <HomePageTemplate
      services={services}
      prices={priceRows}
      cases={cases}
      faq={homeFaq}
      articles={articles}
    />
  );
}