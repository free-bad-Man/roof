import { LeadForm } from '@/components/forms/LeadForm';
import { CasesTeaser } from '@/components/ui/CasesTeaser';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageFaq } from '@/components/ui/PageFaq';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';
import type { FaqItem, ServicePageData } from '@/shared/types/page';

type ServiceSection =
  | 'krovelnye-raboty'
  | 'gidroizolyatsiya'
  | 'natyazhnye-potolki';

type LegacyServicePageTemplateProps = {
  slug: string;
  section: ServiceSection;
  title: string;
  subtitle: string;
  priceLabel?: string;
  whenUseful: string[];
  includes: string[];
  advantages: string[];
  faq: FaqItem[];
};

type ServicePageTemplateProps =
  | { data: ServicePageData }
  | LegacyServicePageTemplateProps;

function isDataMode(
  props: ServicePageTemplateProps,
): props is { data: ServicePageData } {
  return 'data' in props;
}

function getSectionEyebrow(section: ServiceSection) {
  switch (section) {
    case 'gidroizolyatsiya':
      return 'Гидроизоляция';
    case 'natyazhnye-potolki':
      return 'Натяжные потолки';
    case 'krovelnye-raboty':
    default:
      return 'Кровельные работы';
  }
}

function normalizeData(props: ServicePageTemplateProps): ServicePageData {
  if (isDataMode(props)) {
    return props.data;
  }

  return {
    slug: props.slug,
    section: props.section,
    title: props.title,
    h1: props.title,
    seoTitle: props.title,
    seoDescription: props.subtitle,
    heroSubtitle: props.subtitle,
    priceLabel: props.priceLabel,
    bullets: props.advantages,
    whenItFitsTitle: 'Когда подходит услуга',
    whenItFitsText:
      'Ниже — ситуации, в которых это решение действительно целесообразно по состоянию объекта.',
    signs: props.whenUseful,
    noFullReplaceTitle: 'Почему не всегда нужна полная замена',
    noFullReplaceText:
      'Сначала оцениваем фактическое состояние объекта и только потом предлагаем сценарий работ. Если задачу можно решить без лишнего объёма, не уводим в ненужную полную замену.',
    includesTitle: 'Что входит в работу',
    includesItems: props.includes,
    faq: props.faq,
    relatedCases: [],
    relatedArticles: [],
    leadFormTitle: 'Оставить заявку по услуге',
    leadFormSubtitle:
      'Свяжемся, уточним детали и подскажем следующий шаг.',
    photoCtaTitle: 'Есть фото объекта или проблемной зоны?',
    photoCtaText:
      'Пришлите 2–4 фото объекта, город и краткое описание проблемы. Подскажем, можно ли начать с оценки по фото или нужен выезд.',
  };
}

export function ServicePageTemplate(props: ServicePageTemplateProps) {
  const data = normalizeData(props);

  return (
    <>
      <PageHero
        eyebrow={getSectionEyebrow(data.section)}
        title={data.h1}
        subtitle={data.heroSubtitle}
        bullets={data.bullets}
        priceLabel={data.priceLabel}
      />

      <SectionShell title={data.whenItFitsTitle} intro={data.whenItFitsText}>
        {data.signs?.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {data.signs.map((item) => (
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
        ) : null}
      </SectionShell>

      <SectionShell
        title={data.noFullReplaceTitle}
        intro={data.noFullReplaceText}
      />

      <SectionShell title={data.includesTitle}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.includesItems.map((item) => (
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

      {data.steps?.length ? (
        <SectionShell title={data.stepsTitle || 'Этапы работ'}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.steps.map((item, index) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-red-700">
                  Этап {index + 1}
                </p>
                <p className="mt-3 text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>
      ) : null}

      <CasesTeaser items={data.relatedCases || []} />

      <PageFaq items={data.faq} />

      <LeadForm
        variant="service"
        title={data.leadFormTitle || 'Оставить заявку по услуге'}
        subtitle={
          data.leadFormSubtitle ||
          'Свяжемся, уточним детали и подскажем следующий шаг.'
        }
        serviceHiddenValue={data.title}
      />

      <PhotoCta title={data.photoCtaTitle} text={data.photoCtaText} />
      <GeoBlock />
    </>
  );
}