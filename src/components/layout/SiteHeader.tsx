import Link from 'next/link';
import { company, mainNav } from '@/shared/data/site';
import { Button } from '@/shared/ui/Button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(245,246,248,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:gap-6 md:px-6">
        <Link className="min-w-0" href="/">
          <div className="truncate text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--brand-graphite)] md:text-base">
            {company.marketingName}
          </div>
          <div className="hidden text-xs leading-5 text-[var(--brand-muted)] md:block">
            {company.descriptor}
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              className="text-sm font-medium text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            className="text-sm font-semibold text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]"
            href={company.phoneHref}
          >
            {company.phone}
          </a>
          <Button href="/kontakty/" variant="primary">
            Отправить фото
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={company.phoneHref}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-black/10 px-3 text-sm font-semibold text-[var(--brand-graphite)] transition hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
            aria-label="Позвонить"
          >
            Позвонить
          </a>
          <Link
            href="/kontakty/"
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--brand-red)] px-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Фото
          </Link>
        </div>
      </div>
    </header>
  );
}