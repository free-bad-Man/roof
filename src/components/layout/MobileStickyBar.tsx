import { company } from '@/shared/data/site';

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a className="flex h-12 items-center justify-center rounded-full bg-[var(--brand-red)] px-4 text-sm font-semibold text-white" href={company.phoneHref}>
          Позвонить
        </a>
        <a className="flex h-12 items-center justify-center rounded-full border border-[var(--brand-graphite)] px-4 text-sm font-semibold text-[var(--brand-graphite)]" href={company.telegramHref}>
          Отправить фото
        </a>
      </div>
    </div>
  );
}
