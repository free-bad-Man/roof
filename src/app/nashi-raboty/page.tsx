import Link from 'next/link';
import { cases } from '@/shared/data/site';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

const serviceLinks = [
  { href: '/krovelnye-raboty/', label: 'Кровельные работы' },
  { href: '/gidroizolyatsiya/', label: 'Гидроизоляция' },
  { href: '/krovelnye-raboty/remont-krovli/', label: 'Ремонт кровли' },
  { href: '/gidroizolyatsiya/ustranenie-protechek/', label: 'Устранение протечек' },
];

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Наши работы"
        title="Реальные объекты и практические решения"
        subtitle="Сильнее любых общих обещаний работают реальные кейсы: какая была проблема, какое решение выбрали и какой результат получили. Ниже — первая волна объектов по кровле, гидроизоляции и протечкам."
        bullets={[
          'Показываем проблему, решение и результат',
          'Не подменяем опыт шаблонными обещаниями',
          'Связываем кейсы с услугами и заявкой по фото',
        ]}
      />

      <SectionShell
        eyebrow="Витрина кейсов"
        title="Объекты по кровле и гидроизоляции"
        intro="Каждый кейс помогает понять логику подхода: сначала определить реальную проблему, затем выбрать решение по состоянию объекта и только после этого выполнять работы."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.slug}
              className="flex min-h-full flex-col rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6"
            >
              {item.location ? (
                <p className="text-sm font-semibold text-red-700">
                  {item.location}
                </p>
              ) : null}

              <h2 className="mt-3 text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--brand-graphite)]">
                {item.title}
              </h2>

              <div className="mt-5 space-y-4 text-[16px] leading-7 text-[var(--brand-graphite)]/72">
                {item.problem ? (
                  <p>
                    <span className="font-semibold text-[var(--brand-graphite)]">
                      Проблема:
                    </span>{' '}
                    {item.problem}
                  </p>
                ) : null}

                {item.solution ? (
                  <p>
                    <span className="font-semibold text-[var(--brand-graphite)]">
                      Решение:
                    </span>{' '}
                    {item.solution}
                  </p>
                ) : null}

                {item.result ? (
                  <p>
                    <span className="font-semibold text-[var(--brand-graphite)]">
                      Результат:
                    </span>{' '}
                    {item.result}
                  </p>
                ) : null}
              </div>

              <Link
                href={item.href}
                className="mt-6 inline-flex text-sm font-semibold text-[var(--brand-graphite)] transition hover:text-red-700"
              >
                Смотреть кейс →
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Услуги"
        title="Связанные направления работ"
        intro="Если у вас похожая задача, можно сразу перейти в профильный раздел услуги или отправить фото объекта для предварительной оценки."
      >
        <div className="flex flex-wrap gap-3">
          {serviceLinks.map((item) => (
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

      <PhotoCta
        title="Есть похожая задача по кровле или протечке?"
        text="Пришлите 2–4 фото объекта, город и краткое описание проблемы. Подскажем, какой формат работ целесообразен именно в вашем случае."
      />
    </>
  );
}
