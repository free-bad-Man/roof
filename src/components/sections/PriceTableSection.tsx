import { priceRows } from '@/shared/data/site';
import { Section } from '@/shared/ui/Section';

export function PriceTableSection() {
  return (
    <Section
      title="Ориентиры по стоимости"
      description="Ниже — входящие цены для первичного понимания бюджета. Это не окончательная смета, а стартовые ориентиры."
    >
      <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white">
        {priceRows.map(([label, value]) => (
          <div key={label} className="grid gap-2 border-b border-black/5 px-5 py-4 last:border-b-0 md:grid-cols-[1fr_auto] md:px-6">
            <div className="text-sm text-[var(--brand-graphite)]">{label}</div>
            <div className="text-sm font-semibold text-[var(--brand-graphite)]">{value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
