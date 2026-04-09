import { LeadForm } from '@/components/forms/LeadForm';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FaqSection } from '@/components/sections/FaqSection';
import { GeoSection } from '@/components/sections/GeoSection';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';
import type { FaqItem } from '@/shared/types/content';

type ServicePageTemplateProps = {
  title: string;
  subtitle: string;
  priceLabel?: string;
  whenUseful: string[];
  includes: string[];
  advantages: string[];
  faq: FaqItem[];
};

export function ServicePageTemplate({ title, subtitle, priceLabel, whenUseful, includes, advantages, faq }: ServicePageTemplateProps) {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">Услуга</div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {priceLabel ? <div className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-graphite)]">{priceLabel}</div> : null}
              <div className="rounded-full border border-[var(--brand-graphite)] px-5 py-3 text-sm font-semibold text-[var(--brand-graphite)]">Работаем по Крыму</div>
            </div>
          </div>
          <LeadForm title="Оставить заявку по услуге" subtitle="Свяжемся, уточним детали и подскажем следующий шаг." serviceHiddenValue={title} variant="service" />
        </div>
      </section>

      <Section title="Когда подходит услуга">
        <div className="grid gap-4 md:grid-cols-2">
          {whenUseful.map((item) => (
            <Card key={item}><p className="text-sm leading-7 text-[var(--brand-graphite)]">{item}</p></Card>
          ))}
        </div>
      </Section>

      <Section title="Что входит в работу">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {includes.map((item) => (
            <Card key={item}><p className="text-sm leading-7 text-[var(--brand-graphite)]">{item}</p></Card>
          ))}
        </div>
      </Section>

      <Section title="Почему к нам обращаются по этой услуге">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {advantages.map((item) => (
            <Card key={item}><p className="text-sm leading-7 text-[var(--brand-graphite)]">{item}</p></Card>
          ))}
        </div>
      </Section>

      <FaqSection items={faq} />
      <CtaBanner title="Отправьте фото объекта и получите предварительное решение" text="Напишите город, тип объекта и кратко опишите задачу. Мы подскажем, нужен ли ремонт, восстановление, гидроизоляция или более глубокий объём работ." />
      <GeoSection />
    </>
  );
}
