import Link from 'next/link';
import { company } from '@/shared/data/site';

const footerNav = [
  { href: '/krovelnye-raboty/', label: 'Кровельные работы' },
  { href: '/nashi-raboty/', label: 'Наши работы' },
  { href: '/o-kompanii/', label: 'О компании' },
  { href: '/kontakty/', label: 'Контакты' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.25fr_.85fr_.9fr] md:px-6">
        <div className="space-y-5">
          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--brand-graphite)]">
              {company.marketingName}
            </div>

            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--brand-muted)]">
              {company.descriptor}
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--brand-surface)] p-5">
            <div className="text-sm font-semibold text-[var(--brand-graphite)]">
              Есть протечка или нужно понять состояние кровли?
            </div>

            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
              Пришлите 2–4 фото объекта, город и краткое описание проблемы.
              Подскажем, что целесообразно в вашем случае: ремонт,
              восстановление, гидроизоляция или замена.
            </p>

            <div className="mt-4">
              <Link
                href="/kontakty/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--brand-red)] px-5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Отправить фото объекта
              </Link>
            </div>
          </div>

          <p className="text-sm leading-7 text-[var(--brand-muted)]">
            {company.geoLine}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-[var(--brand-graphite)]">
            Навигация
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-[var(--brand-muted)] transition hover:text-[var(--brand-red)]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[var(--brand-graphite)]">
            Контакты
          </div>

          <div className="mt-4 space-y-3 text-sm text-[var(--brand-muted)]">
            <div>
              <a
                href={company.phoneHref}
                className="transition hover:text-[var(--brand-red)]"
              >
                {company.phone}
              </a>
            </div>

            <div>
              <a
                href={company.telegramHref}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[var(--brand-red)]"
              >
                {company.telegram}
              </a>
            </div>

            <div>
              <a
                href={company.emailHref}
                className="transition hover:text-[var(--brand-red)]"
              >
                {company.email}
              </a>
            </div>

            <div>{company.address}</div>
            <div>{company.worktime}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}