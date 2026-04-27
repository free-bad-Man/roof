import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

type Props = {
  title: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
};

const insightItems = [
  'Сначала важно определить реальную причину проблемы, а не только видимый след протечки или износа.',
  'Решение выбирается по состоянию объекта: локальный ремонт, гидроизоляция, восстановление или замена.',
  'Кейс ценен не шаблонным обещанием, а связкой: что было, почему выбрали такой сценарий и какой получили результат.',
];

export function CasePageTemplate({
  title,
  location,
  problem,
  solution,
  result,
}: Props) {
  const caseBlocks = [
    { title: 'Проблема', text: problem },
    { title: 'Решение', text: solution },
    { title: 'Результат', text: result },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Кейс · ${location}`}
        title={title}
        subtitle="Ниже — краткий разбор реального объекта: в чём была проблема, какое решение выбрали и какой результат получили по фактическому состоянию кровли или проблемной зоны."
        bullets={[
          'Реальный объект, а не шаблонное обещание',
          'Разбор по схеме: проблема → решение → результат',
          'Подход по состоянию объекта, без лишнего объёма работ',
        ]}
      />

      <SectionShell
        eyebrow="Разбор объекта"
        title="Проблема, решение и результат"
        intro="Такой формат показывает не только факт выполненных работ, но и логику выбора решения. Это особенно важно для кровли, гидроизоляции, мягкой кровли и протечек."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {caseBlocks.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-red-700">
                {item.title}
              </p>
              <p className="mt-4 text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Что важно"
        title="Что важно в этом кейсе"
        intro="Крымская Кровельная не продаёт один универсальный сценарий для всех объектов. В каждом случае сначала нужно понять состояние кровли, узлов, примыканий и основания, а уже потом выбирать формат работ."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {insightItems.map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-white/20 bg-white/38 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                — {item}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <PhotoCta
        title="Нужен похожий разбор по вашему объекту?"
        text="Пришлите 2–4 фото объекта, город и кратко опишите проблему. Подскажем, какой следующий шаг будет правильным именно в вашем случае."
      />

      <GeoBlock />
    </>
  );
}
