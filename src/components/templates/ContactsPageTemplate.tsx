import { LeadForm } from '@/components/forms/LeadForm';
import { company } from '@/shared/data/site';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

export function ContactsPageTemplate() {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">Контакты</div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">Контакты и география работ</h1>
        </div>
      </section>
      <Section title="Как с нами связаться">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <div className="space-y-4 text-sm leading-7 text-[var(--brand-muted)]">
              <div><span className="font-semibold text-[var(--brand-graphite)]">Телефон:</span> <a href={company.phoneHref}>{company.phone}</a></div>
              <div><span className="font-semibold text-[var(--brand-graphite)]">Telegram:</span> <a href={company.telegramHref}>{company.telegram}</a></div>
              <div><span className="font-semibold text-[var(--brand-graphite)]">Email:</span> <a href={company.emailHref}>{company.email}</a></div>
              <div><span className="font-semibold text-[var(--brand-graphite)]">Адрес:</span> {company.address}</div>
              <div><span className="font-semibold text-[var(--brand-graphite)]">Режим работы:</span> {company.worktime}</div>
              <div>{company.geoLine}</div>
            </div>
          </Card>
          <LeadForm title="Запросить замер или отправить фото объекта" subtitle="Подойдёт, если нужна более точная оценка по объекту." variant="inspection" />
        </div>
      </Section>
    </>
  );
}
