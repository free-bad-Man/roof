import type { Metadata } from 'next';
import Link from 'next/link';
import { articlePages } from '@/shared/content/articles';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

export const metadata: Metadata = {
  title: 'Статьи — кровля, протечки, гидроизоляция',
  description:
    'Статьи Крымской Кровельной: когда нужен ремонт, как искать причину протечки и можно ли восстановить мягкую кровлю без демонтажа.',
};

const items = Object.values(articlePages);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Статьи"
        title="Статьи и разборы"
        subtitle="Развиваем контент по модели «проблема → решение»: объясняем, как подойти к кровле, протечкам и восстановлению без шаблонных SEO-текстов."
        bullets={[
          'Контент-опоры: протечки, причины, кровля до/после, мягкая кровля, гидроизоляция узлов',
          'Статьи должны усиливать доверие и профильность компании',
          'Держим акцент на кровле как ядре бренда',
        ]}
      />

      <SectionShell title="Первые статьи">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.slug}
              className="flex h-full flex-col rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <div className="flex-1">
                <h2 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--brand-graphite)]">
                  {item.h1}
                </h2>
                <p className="mt-4 text-[16px] leading-7 text-[var(--brand-graphite)]/72">
                  {item.lead}
                </p>
              </div>

              <Link
                href={`/stati/${item.slug}/`}
                className="mt-6 inline-flex min-h-11 items-center justify-center self-start whitespace-nowrap rounded-xl border border-white/25 bg-white/55 px-4 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75"
              >
                Читать статью
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
