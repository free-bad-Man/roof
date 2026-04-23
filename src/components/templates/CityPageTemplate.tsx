import { LeadForm } from '@/components/forms/LeadForm';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

type CityServiceItem = {
  href: string;
  title: string;
  excerpt: string;
  price?: string;
};

type CityPageData = {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  subtitle: string;
  bullets: readonly string[];
  introTitle: string;
  introText: string;
  servicesTitle: string;
  servicesSubtitle: string;
  services: readonly CityServiceItem[];
  pricesTitle: string;
  pricesIntro: string;
  prices: readonly (readonly [string, string])[];
  leadFormTitle: string;
  leadFormSubtitle: string;
  photoCtaTitle: string;
  photoCtaText: string;
};

type CityPageTemplateProps = {
  data: CityPageData;
};

export function CityPageTemplate({ data }: CityPageTemplateProps) {
  return (
    <>
      <PageHero
        eyebrow="Симферополь"
        title={data.h1}
        subtitle={data.subtitle}
        bullets={[...data.bullets]}
      />

      <SectionShell title={data.introTitle} intro={data.introText} />

      <ServicesGrid
        title={data.servicesTitle}
        subtitle={data.servicesSubtitle}
        items={[...data.services]}
      />

      <SectionShell title={data.pricesTitle} intro={data.pricesIntro}>
        <div className="grid gap-4 md:grid-cols-2">
          {data.prices.map((item) => (
            <div
              key={item[0]}
              className="flex items-center justify-between gap-4 rounded-[24px] border border-white/20 bg-white/32 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-[16px] leading-7 text-[var(--brand-graphite)]/86">
                {item[0]}
              </p>
              <p className="shrink-0 text-sm font-semibold text-red-700">
                {item[1]}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <LeadForm
        variant="inspection"
        title={data.leadFormTitle}
        subtitle={data.leadFormSubtitle}
      />

      <PhotoCta title={data.photoCtaTitle} text={data.photoCtaText} />
      <GeoBlock />
    </>
  );
}
