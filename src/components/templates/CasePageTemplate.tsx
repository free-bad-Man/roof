import { CtaBanner } from '@/components/sections/CtaBanner';
import { GeoSection } from '@/components/sections/GeoSection';

type Props = {
  title: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
};

export function CasePageTemplate({
  title,
  location,
  problem,
  solution,
  result,
}: Props) {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">
            Кейс · {location}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
            Ниже — краткий разбор объекта: в чём была проблема, какое решение
            выбрали и какой результат получили по фактическому состоянию кровли
            или проблемной зоны.
          </p>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">
                Проблема
              </div>
              <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
                {problem}
              </p>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">
                Решение
              </div>
              <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
                {solution}
              </p>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-[var(--brand-bg)] p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">
                Результат
              </div>
              <p className="mt-4 text-base leading-8 text-[var(--brand-graphite)]">
                {result}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-graphite)] md:text-3xl">
              Что важно в этом кейсе
            </h2>

            <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-[var(--brand-muted)]">
              <p>
                Этот кейс показывает не просто факт выполненных работ, а саму
                логику подхода: сначала определить реальную проблему, потом
                выбрать решение по состоянию объекта и только после этого
                переходить к работам.
              </p>

              <p>
                Такой формат особенно важен для кровли, мягкой кровли,
                гидроизоляции и протечек, где шаблонное решение часто даёт
                временный эффект или приводит к лишнему объёму работ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Нужен похожий разбор по вашему объекту?"
        text="Пришлите 2–4 фото объекта, город и кратко опишите проблему. Подскажем, какой следующий шаг будет правильным именно в вашем случае."
      />

      <GeoSection />
    </>
  );
}