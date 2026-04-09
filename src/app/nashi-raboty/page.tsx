import { cases } from '@/shared/data/site';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

export default function CasesIndexPage() {
  return (
    <Section title="Наши работы" description="Раздел нужен как SEO-усиление и как коммерческое подтверждение реальными объектами.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((item) => (
          <Card key={item.href}>
            <div className="text-sm font-semibold text-[var(--brand-red)]">{item.location}</div>
            <h2 className="mt-3 text-xl font-bold text-[var(--brand-graphite)]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.result}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
