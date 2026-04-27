import Link from 'next/link';
import { company } from '@/shared/data/site';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  bullets?: string[];
  priceLabel?: string;
};

export function PageHero({
  eyebrow = 'Крымская кровельная компания',
  title,
  subtitle,
  bullets = [],
  priceLabel,
}: PageHeroProps) {
  return (
    <section className="mx-auto max-w-[1480px] px-4 pb-4 pt-12 md:px-6 lg:px-8 lg:pt-16">
      <div className="mx-auto max-w-[1180px] rounded-[32px] border border-white/25 bg-white/42 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
        <div className="max-w-none">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex rounded-full border border-red-200/80 bg-white/55 px-3 py-1 text-sm font-semibold text-red-700 backdrop-blur-sm">
              {eyebrow}
            </p>

            {priceLabel ? (
              <span className="inline-flex rounded-full border border-white/20 bg-white/60 px-3 py-1 text-sm font-semibold text-[var(--brand-graphite)]">
                {priceLabel}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 max-w-[980px] bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[32px] font-semibold leading-[1.04] tracking-[-0.035em] text-transparent md:text-[40px] lg:text-[48px] xl:text-[52px]">
            {title}
          </h1>

          <p className="mt-8 max-w-[860px] text-[19px] leading-9 text-[var(--brand-graphite)]/68">
            {subtitle}
          </p>

          {bullets.length ? (
            <ul className="mt-6 max-w-[860px] space-y-3 text-[17px] leading-8 text-[var(--brand-graphite)]/78">
              {bullets.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-[max-content_max-content] sm:items-center sm:justify-between">
            <a
              href={company.telegramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 min-w-[228px] items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Отправить фото объекта
            </a>
            <Link
              href="#lead-form"
              className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-xl border border-neutral-300/80 bg-white/55 px-6 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition hover:bg-white/75"
            >
              Получить расчёт
            </Link>
          </div>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-[var(--brand-muted)]">
            Пришлите 2–4 фото объекта, и мы предварительно сориентируем по
            решению и дальнейшим шагам.
          </p>
        </div>
      </div>
    </section>
  );
}
