import { company } from '@/shared/data/site';
import { LeadForm } from '@/components/forms/LeadForm';

export default function ContactsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
              Контакты
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl">
              Связаться с Крымской Кровельной
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Если есть протечка, износ покрытия или нужно понять, какой формат
              работ целесообразен по объекту, начните с короткого контакта.
              Быстрее всего — звонок или 2–4 фото объекта.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-red-700">
                  Телефон
                </div>
                <a
                  href={company.phoneHref}
                  className="mt-2 block text-lg font-bold text-neutral-950 hover:text-red-700"
                >
                  {company.phone}
                </a>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-red-700">
                  Telegram
                </div>
                <a
                  href={company.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-lg font-bold text-neutral-950 hover:text-red-700"
                >
                  {company.telegram}
                </a>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-red-700">Email</div>
                <a
                  href={company.emailHref}
                  className="mt-2 block text-base font-semibold text-neutral-950 hover:text-red-700"
                >
                  {company.email}
                </a>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-red-700">
                  Офис и режим
                </div>
                <div className="mt-2 text-base font-semibold text-neutral-950">
                  {company.address}
                </div>
                <div className="mt-2 text-sm leading-6 text-neutral-600">
                  {company.worktime}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="text-sm font-semibold text-neutral-950">
                Как быстрее получить ответ
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-600">
                <li>— позвоните или оставьте заявку</li>
                <li>— укажите город и тип объекта</li>
                <li>— кратко опишите проблему</li>
                <li>— по возможности сразу пришлите 2–4 фото объекта</li>
              </ul>
            </div>

            <p className="mt-6 text-sm leading-7 text-neutral-500">
              {company.geoLine}
            </p>
          </div>

          <div>
            <LeadForm
              variant="inspection"
              title="Запросить замер или отправить фото объекта"
              subtitle="Подойдёт, если нужна более точная предварительная оценка по объекту. После отправки заявки сориентируем по следующему шагу."
            />
          </div>
        </div>
      </section>
    </>
  );
}