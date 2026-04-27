import { LeadForm } from '@/components/forms/LeadForm';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';
import { company } from '@/shared/data/site';

const contactItems = [
  {
    title: 'Телефон',
    value: company.phone,
    href: company.phoneHref,
    text: 'Для звонка, консультации и быстрой связи по объекту.',
  },
  {
    title: 'Telegram',
    value: company.telegram,
    href: company.telegramHref,
    text: 'Удобно отправить фото кровли, протечки или проблемной зоны.',
  },
  {
    title: 'Email',
    value: company.email,
    href: company.emailHref,
    text: 'Для смет, документов и деловой переписки по объекту.',
  },
  {
    title: 'Офис',
    value: company.address,
    text: 'Базируемся в Симферополе и работаем по Крыму.',
  },
  {
    title: 'Режим работы',
    value: company.worktime,
    text: 'Заявку через сайт или мессенджер можно оставить в любое время.',
  },
  {
    title: 'География',
    value: 'Симферополь и Крым',
    text: company.geoLine,
  },
];

export function ContactsPageTemplate() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Контакты и география работ"
        subtitle="Свяжитесь с Крымской Кровельной по телефону, в Telegram или через форму. Быстрее всего начать с короткого описания задачи и 2–4 фото объекта."
        bullets={[
          'Телефон и Telegram для быстрой связи',
          'Офис в Симферополе',
          'Работаем по Симферополю и Крыму',
        ]}
      />

      <SectionShell
        eyebrow="Связь"
        title="Как с нами связаться"
        intro="Выберите удобный способ связи. Если речь о протечке, мягкой кровле, гидроизоляции или ремонте, приложите фото — так проще предварительно понять следующий шаг."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contactItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-red-700">{item.title}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-3 inline-flex text-[20px] font-semibold tracking-[-0.02em] text-[var(--brand-graphite)] transition hover:text-red-700"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-[var(--brand-graphite)]">
                  {item.value}
                </p>
              )}
              <p className="mt-3 text-[16px] leading-7 text-[var(--brand-graphite)]/68">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Заявка"
        title="Запросить замер или отправить фото объекта"
        intro="Сохранён основной сценарий заявки: имя, телефон, город и описание задачи. После обращения уточним, можно ли сориентировать по фото или нужен выезд."
      >
        <LeadForm
          title="Запросить замер или отправить фото объекта"
          subtitle="Подойдёт, если нужна более точная оценка по объекту."
          variant="inspection"
        />
      </SectionShell>

      <PhotoCta
        title="Хотите быстрее получить предварительное решение?"
        text="Отправьте 2–4 фото кровли, балкона, террасы или проблемного узла. По фото подскажем, что вероятнее всего нужно: ремонт, герметизация, гидроизоляция, восстановление или осмотр."
      />
    </>
  );
}
