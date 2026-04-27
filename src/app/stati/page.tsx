import Link from 'next/link';
import { articles } from '@/shared/data/site';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

const topicLinks = [
  { href: '/krovelnye-raboty/remont-krovli/', label: 'Ремонт кровли' },
  { href: '/gidroizolyatsiya/ustranenie-protechek/', label: 'Протечки' },
  { href: '/gidroizolyatsiya/', label: 'Гидроизоляция' },
  { href: '/krovelnye-raboty/vosstanovlenie-myagkoy-krovli-sinzatim/', label: 'Мягкая кровля' },
];

function getArticleTopic(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('протеч')) {
    return 'Протечки';
  }

  if (normalizedTitle.includes('гидроизоляц')) {
    return 'Гидроизоляция';
  }

  if (normalizedTitle.includes('мягк')) {
    return 'Мягкая кровля';
  }

  return 'Ремонт';
}

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Статьи"
        title="Разборы по кровле, протечкам и восстановлению"
        subtitle="Медиа-раздел Крымской Кровельной: не SEO-полотна, а прикладные материалы по проблемам и решениям. Разбираем ремонт, протечки, гидроизоляцию, мягкую кровлю и ситуации, где не нужна лишняя замена."
        bullets={[
          'Пишем по модели: проблема → причина → решение',
          'Связываем статьи с услугами и кейсами',
          'Помогаем понять следующий шаг по объекту',
        ]}
        leadHref="/kontakty/#lead-form"
      />

      <SectionShell
        eyebrow="Темы"
        title="Полезные материалы по основным задачам"
        intro="Раздел поддерживает экспертность бренда и помогает клиенту быстро разобраться, когда нужен ремонт, где искать причину протечки и когда гидроизоляция или восстановление целесообразнее полной замены."
      >
        <div className="flex flex-wrap gap-3">
          {topicLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-xl border border-white/25 bg-white/55 px-5 text-sm font-semibold text-[var(--brand-graphite)] backdrop-blur-sm transition hover:bg-white/75 hover:text-red-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Медиа"
        title="Статьи по ремонту, протечкам и гидроизоляции"
        intro="Каждый материал ведёт к практическому действию: понять ситуацию, выбрать связанное направление услуги и при необходимости отправить фото объекта."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((item) => (
            <article
              key={item.slug}
              className="flex min-h-full flex-col rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6"
            >
              <p className="text-sm font-semibold text-red-700">
                {getArticleTopic(item.title)}
              </p>

              <h2 className="mt-3 text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--brand-graphite)]">
                {item.title}
              </h2>

              {item.excerpt ? (
                <p className="mt-4 text-[16px] leading-7 text-[var(--brand-graphite)]/72">
                  {item.excerpt}
                </p>
              ) : null}

              <Link
                href={item.href}
                className="mt-6 inline-flex text-sm font-semibold text-[var(--brand-graphite)] transition hover:text-red-700"
              >
                Читать статью →
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>

      <PhotoCta
        title="Есть похожая ситуация?"
        text="Пришлите 2–4 фото объекта, город и краткое описание задачи. Сориентируем по возможному решению и следующему шагу."
      />
    </>
  );
}
