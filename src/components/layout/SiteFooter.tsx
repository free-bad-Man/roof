import Link from 'next/link';
import { company, mainNav } from '@/shared/data/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--brand-graphite)]">{company.marketingName}</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--brand-muted)]">{company.descriptor}</p>
          <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">{company.geoLine}</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-[var(--brand-graphite)]">Навигация</div>
          <div className="mt-4 flex flex-col gap-3">
            {mainNav.map((item) => (
              <Link key={item.href} className="text-sm text-[var(--brand-muted)] transition hover:text-[var(--brand-red)]" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-[var(--brand-graphite)]">Контакты</div>
          <div className="mt-4 space-y-3 text-sm text-[var(--brand-muted)]">
            <div><a href={company.phoneHref}>{company.phone}</a></div>
            <div><a href={company.telegramHref}>{company.telegram}</a></div>
            <div><a href={company.emailHref}>{company.email}</a></div>
            <div>{company.address}</div>
            <div>{company.worktime}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
