import { ReactNode } from 'react';

type SectionShellProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function SectionShell({
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionShellProps) {
  return (
    <section className={cx('mx-auto mt-10 max-w-[1180px] px-4 md:px-6 lg:px-8', className)}>
      <div className="rounded-[32px] border border-white/25 bg-white/38 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
        {eyebrow ? (
          <p className="text-sm font-semibold text-red-700">{eyebrow}</p>
        ) : null}

        <h2 className="mt-3 max-w-[860px] bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[30px] font-semibold leading-[1.04] tracking-[-0.03em] text-transparent md:text-[38px] lg:text-[44px]">
          {title}
        </h2>

        {intro ? (
          <p className="mt-5 max-w-[860px] text-[18px] leading-8 text-[var(--brand-graphite)]/68">
            {intro}
          </p>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
