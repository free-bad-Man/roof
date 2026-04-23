import { FaqItem } from '@/shared/types/page';
import { SectionShell } from './SectionShell';

type PageFaqProps = {
  items: FaqItem[];
  title?: string;
};

export function PageFaq({
  items,
  title = 'Частые вопросы',
}: PageFaqProps) {
  if (!items.length) return null;

  return (
    <SectionShell
      title={title}
      intro="Ниже — вопросы, которые чаще всего задают перед выездом, расчётом и выбором решения по объекту."
    >
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
          >
            <summary className="cursor-pointer list-none text-[18px] font-semibold leading-7 text-[var(--brand-graphite)]">
              {item.question}
            </summary>
            <p className="mt-4 max-w-[900px] text-[16px] leading-7 text-[var(--brand-graphite)]/72">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
