import { PhotoCta } from '@/components/ui/PhotoCta';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { SectionShell } from '@/components/ui/SectionShell';
import { companyContent } from '@/shared/content/company';

const data = companyContent.about;

export function AboutPageTemplate() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title={data.h1}
        subtitle={data.subtitle}
        bullets={[
          'Профильная кровельная компания, а не универсальная стройка',
          'Подбираем решение по состоянию объекта',
          'Честная смета, этапы и сопровождение',
        ]}
      />

      <SectionShell title="Кто мы" intro={data.intro} />

      <SectionShell title="На чём строится подход компании" intro={data.positioning}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.principles.map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                {item}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <PhotoCta />
      <GeoBlock />
    </>
  );
}
