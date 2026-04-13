import { articles } from '@/shared/data/site';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

export default function ArticlesIndexPage() {
  return (
    <Section title="Статьи" description="Контент идёт по модели проблема → причина → решение → следующий шаг.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((item) => (
          <Card key={item.href}>
            <h2 className="text-xl font-bold text-[var(--brand-graphite)]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.excerpt}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
