import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { company } from '@/shared/data/site';
import { getServiceRegistry } from '@/shared/content';

const waterproofingServices = getServiceRegistry('gidroizolyatsiya').map(
  (item) => ({
    href: `/${item.section}/${item.slug}/`,
    title: item.title.replace(' в Крыму', ''),
    excerpt: item.excerpt,
    price: item.priceLabel,
  }),
);

export default function WaterproofingIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            Гидроизоляция
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            Гидроизоляция в Крыму
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Входной блок для задач с протечками, уязвимыми зонами, балконами,
            террасами, узлами и примыканиями. Подбираем решение по состоянию
            объекта, а не по шаблону.
          </p>

          <ul className="mt-6 space-y-3 text-base leading-7 text-neutral-700">
            <li>— Работаем с причиной протечки, а не только со следствием</li>
            <li>— Подходим для частных и коммерческих объектов</li>
            <li>— Выезжаем по Симферополю и Крыму</li>
          </ul>
        </div>
      </section>

      <ServicesGrid
        title="Услуги по гидроизоляции"
        subtitle="Ниже — основные направления первой волны по устранению протечек, гидроизоляции балконов, террас, узлов и проблемных зон."
        items={waterproofingServices}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Быстрый вход в проблему',
              text: 'По гидроизоляции клиент чаще всего приходит через конкретную боль: течь, примыкание, балкон, узел или локальная проблема.',
            },
            {
              title: 'Мост в кровельные работы',
              text: 'Многие задачи по гидроизоляции выводят на более глубокую оценку состояния кровли и помогают правильно определить следующий шаг.',
            },
            {
              title: 'Без лишнего объёма работ',
              text: 'Сначала определяем причину и сценарий решения, а не предлагаем максимальный объём «на всякий случай».',
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

      <CtaBanner
        title="Есть протечка, балкон или проблемная зона?"
        text="Пришлите 2–4 фото объекта, город и краткое описание задачи. Подскажем, нужен ли локальный ремонт, герметизация, гидроизоляция или более глубокий объём работ."
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-6 lg:px-8">
        <p className="max-w-3xl text-sm leading-7 text-neutral-500">
          {company.geoLine}
        </p>
      </section>
    </>
  );
}