import { cn } from '@/shared/lib/cn';
import type { ReactNode } from 'react';

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('py-10 md:py-16', className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 max-w-3xl">
          {eyebrow ? <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">{eyebrow}</div> : null}
          <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-graphite)] md:text-4xl">{title}</h2>
          {description ? <p className="mt-4 text-base leading-7 text-[var(--brand-muted)]">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
