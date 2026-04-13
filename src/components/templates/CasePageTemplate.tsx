import { CtaBanner } from '@/components/sections/CtaBanner';
import { GeoSection } from '@/components/sections/GeoSection';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

type Props = {
  title: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
};

export function CasePageTemplate({ title, location, problem, solution, result }: Props) {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">Кейс · {location}</div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">{title}</h1>
        </div>
      </section>
      <Section title="Кратко по объекту">
        <div className="grid gap-4 md:grid-cols-3">
          <Card><div className="text-sm font-semibold text-[var(--brand-red)]">Проблема</div><p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{problem}</p></Card>
          <Card><div className="text-sm font-semibold text-[var(--brand-red)]">Решение</div><p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{solution}</p></Card>
          <Card><div className="text-sm font-semibold text-[var(--brand-red)]">Результат</div><p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{result}</p></Card>
        </div>
      </Section>
      <CtaBanner title="Нужен похожий разбор по вашему объекту?" text="Пришлите фото и кратко опишите проблему. Подскажем, какой следующий шаг будет правильным." />
      <GeoSection />
    </>
  );
}
