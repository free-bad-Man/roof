import Link from 'next/link';
import { CaseTeaserItem } from '@/shared/types/page';
import { SectionShell } from './SectionShell';

type CasesTeaserProps = {
  items: CaseTeaserItem[];
};

export function CasesTeaser({ items }: CasesTeaserProps) {
  if (!items.length) return null;

  return (
    <SectionShell
      title="Реальные объекты по Крыму"
      intro="Сильнее любых общих обещаний работают реальные кейсы: какая была проблема, какое решение выбрали и какой результат получили по объекту."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.href}
            className="flex h-full flex-col rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
          >
            <div className="flex-1">
              {item.location ? (
                <p className="text-sm font-semibold text-red-700">{item.location}</p>
              ) : null}

              <h3 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--brand-graphite)]">
                {item.title}
              </h3>

              {item.result ? (
                <p className="mt-4 text-[16px] leading-7 text-[var(--brand-graphite)]/72">
                  {item.result}
                </p>
              ) : null}
            </div>

            <Link
              href={item.href}
              className="mt-6 inline-flex min-h-11 items-center justify-center self-start whitespace-nowrap rounded-xl border border-white/25 bg-white/55 px-4 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75"
            >
              Смотреть кейс
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
