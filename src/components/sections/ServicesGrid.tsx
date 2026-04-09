import Link from 'next/link';
import type { ServiceCard } from '@/shared/types/content';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

export function ServicesGrid({ title, description, items }: { title: string; description?: string; items: ServiceCard[] }) {
  return (
    <Section description={description} title={title}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.href}>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">{item.priceLabel ?? 'по запросу'}</div>
            <h3 className="mt-4 text-2xl font-bold text-[var(--brand-graphite)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.excerpt}</p>
            <Link className="mt-5 inline-flex text-sm font-semibold text-[var(--brand-graphite)] transition hover:text-[var(--brand-red)]" href={item.href}>
              Открыть страницу →
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
