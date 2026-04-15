import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { company } from '@/shared/data/site';
import { getServiceRegistry } from '@/shared/content';

const roofServices = getServiceRegistry('krovelnye-raboty').map((item) => ({
  href: `/${item.section}/${item.slug}/`,
  title: item.title.replace(' в Крыму', ''),
  excerpt: item.excerpt,
  price: item.priceLabel,
}));

export default function RoofingIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            Кровельные работы
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            Кровельные работы в Крыму
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Основной профиль компании — ремонт, восстановление, гидроизоляция,
            монтаж и кровля под ключ. Подбираем решение по фактическому
            состоянию объекта, а не по шаблону.
          </p>

          <ul className="mt-6 space-y-3 text-base leading-7 text-neutral-700">
            <li>— Не навязываем замену там, где кровлю можно восстановить</li>
            <li>— Работаем с частными и коммерческими объектами</li>
            <li>— Выезжаем по Симферополю и Крыму</li>
          </ul>
        </div>
      </section>

      <ServicesGrid
        title="Услуги по кровле"
        subtitle="Ниже — основные направления кровельных работ первой волны. Держим акцент на ремонте, восстановлении и гидроизоляции как на главном ядре бренда."
        items={roofServices}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Решение по состоянию объекта',
              text: 'Сначала оцениваем покрытие, узлы, примыкания и проблемные зоны, а потом предлагаем целесообразный сценарий работ.',
            },
            {
              title: 'Взрослая подача и нормальный сервис',
              text: 'Понятная смета, этапы работ, сопровождение объекта и спокойная коммуникация без строительной суеты.',
            },
            {
              title: 'Кровля — основной профиль',
              text: 'Не универсальная стройка и не каталог всего подряд, а профильная компания с сильной специализацией по кровле.',
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
        title="Нужно понять, что целесообразно по кровле?"
        text="Пришлите 2–4 фото объекта, город и краткое описание задачи. Подскажем, нужен ли ремонт, восстановление, гидроизоляция или уже полная замена."
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-6 lg:px-8">
        <p className="max-w-3xl text-sm leading-7 text-neutral-500">
          {company.geoLine}
        </p>
      </section>
    </>
  );
}