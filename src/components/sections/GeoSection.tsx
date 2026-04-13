import { company } from '@/shared/data/site';
import { Section } from '@/shared/ui/Section';

export function GeoSection() {
  return (
    <Section title="Работаем по Симферополю и Крыму">
      <div className="max-w-4xl rounded-[28px] border border-black/10 bg-white p-6 text-sm leading-7 text-[var(--brand-muted)]">
        {company.geoLine}
      </div>
    </Section>
  );
}
