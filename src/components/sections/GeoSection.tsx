import { company } from '@/shared/data/site';

export function GeoSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">
              География работы
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-4xl">
              Работаем по Симферополю и Крыму
            </h2>

            <p className="mt-5 text-base leading-8 text-[var(--brand-muted)]">
              {company.geoLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}