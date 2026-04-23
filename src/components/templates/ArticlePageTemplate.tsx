import type { ArticlePageData } from '@/shared/content/articles';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { SectionShell } from '@/components/ui/SectionShell';

type ArticlePageTemplateProps = {
  data: ArticlePageData;
};

export function ArticlePageTemplate({ data }: ArticlePageTemplateProps) {
  return (
    <>
      <PageHero
        eyebrow="Статьи"
        title={data.h1}
        subtitle={data.intro}
        bullets={[
          'Пишем по модели «проблема → решение»',
          'Объясняем спокойно, по делу и без рекламного шума',
          'Держим акцент на кровле как основном профиле компании',
        ]}
      />

      <SectionShell title="Кратко по сути" intro={data.lead} />

      {data.sections.map((section) => (
        <SectionShell key={section.title} title={section.title}>
          <div className="space-y-4">
            {section.paragraphs.map((item) => (
              <p
                key={item}
                className="max-w-[900px] text-[18px] leading-8 text-[var(--brand-graphite)]/72"
              >
                {item}
              </p>
            ))}
          </div>
        </SectionShell>
      ))}

      <PhotoCta />
      <GeoBlock />
    </>
  );
}
