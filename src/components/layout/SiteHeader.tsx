import Link from 'next/link';
import { company, mainNav } from '@/shared/data/site';
import { Button } from '@/shared/ui/Button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(245,246,248,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link className="min-w-0" href="/">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--brand-graphite)] md:text-base">{company.marketingName}</div>
          <div className="hidden text-xs text-[var(--brand-muted)] md:block">{company.descriptor}</div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {mainNav.map((item) => (
            <Link key={item.href} className="text-sm font-medium text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a className="text-sm font-semibold text-[var(--brand-graphite)]" href={company.phoneHref}>
            {company.phone}
          </a>
          <Button href="#lead-form" variant="primary">Получить расчёт</Button>
        </div>
      </div>
    </header>
  );
}
