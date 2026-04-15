import { company } from '@/shared/data/site';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            О компании
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            Профильная кровельная компания в Крыму
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Крымская кровельная компания — это профильная команда по ремонту,
            восстановлению и гидроизоляции кровли в Симферополе и по Крыму. Мы
            подбираем решение по реальному состоянию объекта: локальный ремонт,
            устранение протечек, восстановление, гидроизоляция или замена, когда
            она действительно нужна.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Кровля — основной профиль',
              text: 'Мы не позиционируем себя как универсальную стройку. Первый и главный акцент компании — кровельные работы, восстановление и гидроизоляция.',
            },
            {
              title: 'Решение по факту объекта',
              text: 'Не продаём шаблонный набор работ. Сначала оцениваем покрытие, узлы, примыкания и состояние объекта, а потом предлагаем целесообразный сценарий.',
            },
            {
              title: 'Понятный сервис',
              text: 'Осмотр, расчёт, состав работ и следующий шаг должны быть ясны клиенту без давления, суеты и лишних обещаний.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold tracking-tight text-neutral-950">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_.95fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
              Как мы принимаем решение по объекту
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-600">
              <p>
                Сначала смотрим, в чём именно проблема: протечка, износ покрытия,
                нарушение узлов, уязвимые примыкания или общее состояние кровли.
              </p>
              <p>
                Дальше определяем, когда достаточно локального ремонта, когда
                имеет смысл восстановление, когда нужна гидроизоляция, а когда
                уже действительно оправдана замена.
              </p>
              <p>
                Такой подход помогает не навязывать лишние работы и сохранять
                фокус на правильном решении по состоянию объекта.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
              Где работаем
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              {company.geoLine}
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5">
              <div className="text-sm font-semibold text-neutral-950">
                Контакты
              </div>
              <div className="mt-3 space-y-2 text-sm text-neutral-600">
                <div>{company.phone}</div>
                <div>{company.telegram}</div>
                <div>{company.email}</div>
                <div>{company.address}</div>
                <div>{company.worktime}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Нужно понять, что целесообразно по вашему объекту?"
        text="Пришлите 2–4 фото объекта, город и краткое описание проблемы. Подскажем, нужен ли ремонт, восстановление, гидроизоляция или уже полная замена."
      />
    </>
  );
}