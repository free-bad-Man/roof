import Link from 'next/link';
import { company } from '@/shared/data/site';

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-3">
        <a
          href={company.phoneHref}
          className="flex min-h-12 items-center justify-center rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--brand-graphite)] transition hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
        >
          Позвонить
        </a>

        <a
          href={company.telegramHref}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 items-center justify-center rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--brand-graphite)] transition hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
        >
          Написать
        </a>

        <Link
          href="/kontakty/"
          className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--brand-red)] px-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Фото
        </Link>
      </div>
    </div>
  );
}