import { CtaBanner } from '@/components/sections/CtaBanner';
import { GeoSection } from '@/components/sections/GeoSection';
import { company } from '@/shared/data/site';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

export function AboutPageTemplate() {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">О компании</div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">Профильная кровельная компания в Крыму</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
            {company.legalName} — это профильная команда по ремонту, восстановлению и гидроизоляции кровли в Симферополе и по Крыму. Мы не позиционируем себя как универсальную стройку.
          </p>
        </div>
      </section>
      <Section title="Что важно в подаче компании">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {['Взрослая и собранная подача', 'Кровля — основной профиль', 'Sinzatim как усиление экспертности', 'Реальные объекты вместо шаблонных обещаний', 'Понятная смета и сопровождение', 'География: Симферополь и Крым'].map((item) => (
            <Card key={item}><p className="text-sm leading-7 text-[var(--brand-graphite)]">{item}</p></Card>
          ))}
        </div>
      </Section>
      <GeoSection />
      <CtaBanner title="Нужно обсудить объект или получить расчёт?" text="Оставьте заявку или отправьте фото объекта — подскажем следующий шаг." />
    </>
  );
}
