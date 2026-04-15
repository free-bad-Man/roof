import type { FaqItem } from '@/shared/types/content';
import { Accordion } from '@/shared/ui/Accordion';
import { Section } from '@/shared/ui/Section';

export function FaqSection({
  title = 'Частые вопросы',
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <Section title={title}>
      <div className="max-w-3xl">
        <p className="text-base leading-7 text-[var(--brand-muted)]">
          Ниже — вопросы, которые чаще всего задают перед выездом, расчётом и
          выбором решения по объекту.
        </p>
      </div>

      <div className="mt-8">
        <Accordion items={items} />
      </div>
    </Section>
  );
}