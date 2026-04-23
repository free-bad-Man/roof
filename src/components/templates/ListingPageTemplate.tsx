import { LeadForm } from '@/components/forms/LeadForm';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';
import type { SectionPageData } from '@/shared/content/sections';

type ListingPageTemplateProps = {
  data: SectionPageData;
};

export function ListingPageTemplate({ data }: ListingPageTemplateProps) {
  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.h1}
        subtitle={data.subtitle}
        bullets={[...data.bullets]}
      />

      <SectionShell title={data.introTitle} intro={data.introText}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.trustItems.map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                — {item}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

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