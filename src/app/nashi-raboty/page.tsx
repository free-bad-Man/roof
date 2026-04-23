import type { Metadata } from 'next';
import Link from 'next/link';
import { casePages } from '@/shared/content/cases';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

export const metadata: Metadata = {
  title: 'Наши работы — реальные объекты по Крыму',
  description:
    'Реальные объекты по Крыму: ремонт кровли, устранение протечек и гидроизоляция проблемных зон.',
};

const items = Object.values(casePages);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Наши работы"
        title="Реальные объекты по Крыму"
        subtitle="Вместо шаблонных обещаний показываем понятные кейсы: какая была проблема, какое решение выбрали и какой результат получили по объекту."
        bullets={[
          'Реальные объекты вместо абстрактных обещаний',
          'Акцент на проблеме, решении и результате',
          'Кейсы усиливают доверие к основному кровельному профилю',
        ]}
      />

      <SectionShell title="Кейсы компании">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.slug}
              className="flex h-full flex-col rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">{item.location}</p>
                <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--brand-graphite)]">
                  {item.h1}
                </h2>
                <p className="mt-4 text-[16px] leading-7 text-[var(--brand-graphite)]/72">
                  {item.result}
                </p>
              </div>

              <Link
                href={`/nashi-raboty/${item.slug}/`}
                className="mt-6 inline-flex min-h-11 items-center justify-center self-start whitespace-nowrap rounded-xl border border-white/25 bg-white/55 px-4 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75"
              >
                Смотреть кейс
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>

      <PhotoCta />
      <GeoBlock />
    </>
  );
}
