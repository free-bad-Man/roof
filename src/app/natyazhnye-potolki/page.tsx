import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { company } from '@/shared/data/site';
import { getServiceRegistry } from '@/shared/content';

const ceilingServices = getServiceRegistry('natyazhnye-potolki').map((item) => ({
  href: `/${item.section}/${item.slug}/`,
  title: item.title.replace(' в Крыму', ''),
  excerpt: item.excerpt,
  price: item.priceLabel,
}));

export default function CeilingsIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            Натяжные потолки
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            Натяжные потолки в Крыму
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Поточный раздел, который не спорит с кровельным ядром бренда:
            понятный расчёт, аккуратный монтаж и простая подача без лишней
            декоративности.
          </p>

          <ul className="mt-6 space-y-3 text-base leading-7 text-neutral-700">
            <li>— Понятный расчёт и нормальный сервис</li>
            <li>— Для квартир и частных домов</li>
            <li>— Работаем по Симферополю и Крыму</li>
          </ul>
        </div>
      </section>

      <ServicesGrid
        title="Услуги по натяжным потолкам"
        subtitle="Ниже — основные направления первой волны по потолкам. Это отдельный потоковый блок, но без размывания основного кровельного позиционирования."
        items={ceilingServices}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Понятный продукт',
              text: 'Потолки — это быстрый и понятный формат услуги с коротким циклом сделки и прозрачной логикой для клиента.',
            },
            {
              title: 'Без перегруза подачей',
              text: 'Не превращаем раздел в декоративный каталог. Держим спокойную коммерческую подачу и нормальный сервис.',
            },
            {
              title: 'Отдельное направление',
              text: 'Потолки остаются отдельным поточным блоком и не спорят с основным кровельным ядром бренда.',
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
        title="Нужно быстро понять стоимость потолков?"
        text="Оставьте заявку, укажите город и кратко опишите задачу. Подскажем по следующему шагу и предварительному расчёту."
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-6 lg:px-8">
        <p className="max-w-3xl text-sm leading-7 text-neutral-500">
          {company.geoLine}
        </p>
      </section>
    </>
  );
}