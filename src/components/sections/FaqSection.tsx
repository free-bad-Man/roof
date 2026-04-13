import type { FaqItem } from '@/shared/types/content';
import { Accordion } from '@/shared/ui/Accordion';
import { Section } from '@/shared/ui/Section';

export function FaqSection({ title = 'FAQ', items }: { title?: string; items: FaqItem[] }) {
  return (
    <Section title={title}>
      <Accordion items={items} />
    </Section>
  );
}
