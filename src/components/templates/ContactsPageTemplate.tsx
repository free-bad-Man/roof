import { LeadForm } from '@/components/forms/LeadForm';
import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { SectionShell } from '@/components/ui/SectionShell';
import { companyContent } from '@/shared/content/company';

const data = companyContent.contacts;

export function ContactsPageTemplate() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title={data.h1}
        subtitle={data.subtitle}
        bullets={[
          'Можно начать с фото объекта',
          'Быстро подскажем следующий шаг',
          'Работаем по Симферополю и Крыму',
        ]}
      />

      <SectionShell title="Как с нами связаться">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className="text-sm font-semibold text-red-700">Телефон</p>
            <a
              href={`tel:${data.phone.replace(/[^\d+]/g, '')}`}
              className="mt-3 inline-flex text-[18px] leading-8 text-[var(--brand-graphite)]/86"
            >
              {data.phone}
            </a>
          </div>

          <div className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className="text-sm font-semibold text-red-700">Telegram</p>
            <a
              href={data.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-[18px] leading-8 text-[var(--brand-graphite)]/86"
            >
              {data.telegram}
            </a>
          </div>

          <div className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className="text-sm font-semibold text-red-700">Email</p>
            <a
              href={`mailto:${data.email}`}
              className="mt-3 inline-flex text-[18px] leading-8 text-[var(--brand-graphite)]/86"
            >
              {data.email}
            </a>
          </div>

          <div className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className="text-sm font-semibold text-red-700">Адрес</p>
            <p className="mt-3 text-[18px] leading-8 text-[var(--brand-graphite)]/86">
              {data.address}
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell title="Режим работы" intro={`${data.scheduleWeekdays}. ${data.scheduleWeekend}.`} />
      <SectionShell title="География" intro={data.geo} />

      <LeadForm
        variant="inspection"
        title="Отправить фото объекта или запросить замер"
        subtitle="Напишите город, тип объекта и кратко опишите задачу. После этого быстро сориентируем по следующему шагу."
      />

      <GeoBlock />
    </>
  );
}
