import Image from 'next/image';
import Link from 'next/link';
import { company, mainNav } from '@/shared/data/site';
import { Button } from '@/shared/ui/Button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-0 sm:px-4 lg:px-6">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-5 rounded-b-[32px] border-x border-b border-white/12 bg-white/6 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
        <Link
          className="flex shrink-0 items-center"
          href="/"
          aria-label="Домашняя страница"
        >
          <Image
            src="/brand/logo/logo-horizontal-white-v2.png"
            alt={company.marketingName}
            width={620}
            height={140}
            priority
            className="h-20 w-auto sm:h-24 lg:h-[96px] xl:h-[104px]"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              className="whitespace-nowrap text-sm font-semibold leading-none text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)] xl:text-[15px]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
          <a
            className="whitespace-nowrap text-sm font-semibold text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)] xl:text-[15px]"
            href={company.phoneHref}
          >
            {company.phone}
          </a>

          <Button
            href="/kontakty/#lead-form"
            variant="primary"
            className="whitespace-nowrap px-5 py-3"
          >
            Отправить фото
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <a
            href={company.phoneHref}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 bg-white/8 px-3 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/12"
            aria-label="Позвонить"
          >
            Позвонить
          </a>

          <Link
            href="/kontakty/#lead-form"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--brand-red)] px-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-red-dark)]"
          >
            Фото
          </Link>
        </div>
      </div>
    </header>
  );
}
