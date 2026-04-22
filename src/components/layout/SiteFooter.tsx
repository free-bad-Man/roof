import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/shared/data/site';

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-10 max-w-[1760px] px-3 pb-0 sm:px-4 lg:px-6">
      <div className="mx-auto rounded-t-[32px] border-x border-t border-white/12 bg-white/6 px-4 py-5 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid flex-1 gap-5 md:grid-cols-3 md:gap-6">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">
                Телефон
              </p>
              <a
                href={company.phoneHref}
                className="mt-2 block text-[28px] font-semibold leading-none text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]"
              >
                {company.phone}
              </a>

              <Link
                href="/kontakty/"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--brand-red)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-red-dark)]"
              >
                Получить предварительное решение
              </Link>
            </div>

            <div className="min-w-0">
              <p className="text-[16px] font-semibold leading-6 text-[var(--brand-graphite)]">
                Telegram:
              </p>
              <a
                href="https://t.me/krymskaya.krovelnaya"
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-[16px] leading-7 text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]"
              >
                @krymskaya.krovelnaya
              </a>

              <p className="mt-5 text-[16px] font-semibold leading-6 text-[var(--brand-graphite)]">
                Email:
              </p>
              <a
                href="mailto:krymskaya-krovelnaya@yandex.ru"
                className="mt-1 block text-[16px] leading-7 text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]"
              >
                krymskaya-krovelnaya@yandex.ru
              </a>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">
                Адрес
              </p>
              <p className="mt-2 text-[16px] leading-7 text-[var(--brand-graphite)]">
                Симферополь, ул. Лавриненко, 9
              </p>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">
                Режим работы
              </p>
              <p className="mt-2 text-[16px] leading-7 text-[var(--brand-graphite)]">
                Пн–Пт: 09:00–13:00, 14:00–18:00
              </p>
              <p className="text-[16px] leading-7 text-[var(--brand-graphite)]">
                Сб–Вс: выходной
              </p>
            </div>
          </div>

          <Link
            href="/"
            aria-label="Домашняя страница"
            className="flex shrink-0 items-center justify-start lg:border-l lg:border-white/10 lg:pl-8"
          >
            <Image
              src="/brand/logo/logo-horizontal-white-v2.png"
              alt={company.marketingName}
              width={620}
              height={140}
              className="h-20 w-auto sm:h-24 lg:h-[92px] xl:h-[104px]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}