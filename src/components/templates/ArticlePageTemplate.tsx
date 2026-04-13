import { CtaBanner } from '@/components/sections/CtaBanner';
import { Section } from '@/shared/ui/Section';

type Props = {
  title: string;
  excerpt: string;
};

export function ArticlePageTemplate({ title, excerpt }: Props) {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">Статья</div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">{excerpt}</p>
        </div>
      </section>
      <Section title="Каркас статьи">
        <div className="max-w-3xl space-y-6 text-base leading-8 text-[var(--brand-muted)]">
          <p>1. Проблема и типовой контекст.</p>
          <p>2. Что чаще всего является причиной.</p>
          <p>3. Когда хватает локального решения, а когда нужен больший объём работ.</p>
          <p>4. Что важно проверить на объекте.</p>
          <p>5. Что делать дальше: заявка, фото, выезд, расчёт.</p>
        </div>
      </Section>
      <CtaBanner title="Есть похожая ситуация на объекте?" text="Пришлите фото и задачу — сориентируем по решению и следующему шагу." />
    </>
  );
}
