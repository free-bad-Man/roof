import { LeadForm } from '@/components/forms/LeadForm';
import { ServicesGrid } from '@/components/sections/ServicesGrid';

type PriceRow = readonly [string, string];

type CaseItem = {
  slug: string;
  title: string;
  href: string;
  location?: string;
  problem?: string;
  solution?: string;
  result?: string;
};

type ArticleItem = {
  slug: string;
  title: string;
  href: string;
  excerpt?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceItem = {
  slug: string;
  title: string;
  href: string;
  excerpt: string;
  priceLabel?: string;
  category?: string;
};

type HomePageTemplateProps = {
  services: ServiceItem[];
  prices: readonly PriceRow[];
  cases: CaseItem[];
  faq: FaqItem[];
  articles: ArticleItem[];
};

export function HomePageTemplate({
  services,
  prices,
  cases,
  faq,
  articles,
}: HomePageTemplateProps) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
              Крымская Кровельная
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
              Ремонт, восстановление и гидроизоляция кровли в Крыму
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Подбираем решение по состоянию объекта: ремонт, восстановление,
              гидроизоляция или замена, когда она действительно нужна.
            </p>

            <ul className="mt-6 space-y-3 text-base leading-7 text-neutral-700">
              <li>— Не навязываем замену там, где кровлю можно восстановить</li>
              <li>— Устраняем причину протечки, а не просто закрываем симптом</li>
              <li>— Работаем по Симферополю и Крыму</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/kontakty/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Отправить фото объекта
              </a>
              <a
                href="/kontakty/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-neutral-300 px-6 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                Получить расчёт
              </a>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Пришлите 2–4 фото объекта, и мы предварительно сориентируем по
              решению и дальнейшим шагам.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-7">
            <p className="text-sm font-semibold text-neutral-950">
              Как мы подходим к задаче
            </p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-neutral-950">
                  1. Смотрим состояние объекта
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Оцениваем покрытие, узлы, примыкания и проблемные зоны, а не
                  только видимый симптом.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-neutral-950">
                  2. Подбираем правильный сценарий
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Определяем, когда достаточно ремонта, когда целесообразно
                  восстановление, а когда уже нужна замена.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-neutral-950">
                  3. Даём понятный следующий шаг
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Выезд, расчёт, фотооценка, состав работ и ориентир по
                  стоимости — без лишних обещаний и суеты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadForm
        variant="main"
        title="Получите предварительное решение по вашему объекту"
        subtitle="Если есть протечка, износ покрытия или вы не понимаете, нужен ли ремонт, восстановление или замена — пришлите короткую заявку и 2–4 фото объекта. После этого сориентируем по решению и следующим шагам."
      />

      <ServicesGrid
        title="Ключевые услуги компании"
        subtitle="Сначала считывается кровля как основной профиль. Гидроизоляция — входной продукт. Потолки остаются дополнительным направлением и не размывают ядро бренда."
        items={services.slice(0, 8).map((item) => ({
          href: item.href,
          title: item.title,
          excerpt: item.excerpt,
          price: item.priceLabel,
        }))}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
            Почему выбирают Крымскую Кровельную
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600">
            Мы выстраиваем работу не как «бригада на все случаи», а как
            профильная компания, где кровля — основной профиль, а решение
            подбирается по состоянию объекта.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            'Основной профиль компании — кровля, а не всё подряд',
            'Сильная специализация на восстановлении и гидроизоляции кровли',
            'Честная диагностика: ремонт, восстановление или замена по факту объекта',
            'Работаем с проблемными узлами, примыканиями и протечками',
            'Понятная смета, этапы работ и нормальный сервис',
            'Реальные объекты по Крыму, а не шаблонные обещания',
          ].map((item, index) => (
            <div
              key={item}
              className={`rounded-3xl border p-5 ${
                index < 3
                  ? 'border-neutral-900 bg-neutral-950 text-white'
                  : 'border-neutral-200 bg-white text-neutral-950'
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  index < 3 ? 'text-red-300' : 'text-red-700'
                }`}
              >
                Преимущество
              </p>
              <p className="mt-3 text-base leading-7">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
            Ориентиры по стоимости
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600">
            Ниже — входящие цены для первичного понимания бюджета. Это не
            окончательная смета, а стартовые ориентиры.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <div className="divide-y divide-neutral-200">
            {prices.map((item) => (
              <div
                key={item[0]}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <p className="text-sm font-medium text-neutral-900">{item[0]}</p>
                <p className="text-sm font-semibold text-red-700">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
            Реальные объекты по Крыму
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600">
            Сильнее любых общих обещаний работают реальные кейсы: какая была
            проблема, какое решение выбрали и какой результат получили.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cases.slice(0, 3).map((item) => (
            <article
              key={item.slug}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              {item.location ? (
                <p className="text-sm font-semibold text-red-700">
                  {item.location}
                </p>
              ) : null}

              <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-950">
                {item.title}
              </h3>

              <div className="mt-4 space-y-2 text-sm leading-6 text-neutral-600">
                {item.problem ? (
                  <p>
                    <span className="font-semibold text-neutral-900">
                      Проблема:
                    </span>{' '}
                    {item.problem}
                  </p>
                ) : null}

                {item.solution ? (
                  <p>
                    <span className="font-semibold text-neutral-900">
                      Решение:
                    </span>{' '}
                    {item.solution}
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold text-neutral-900">
                      Решение:
                    </span>{' '}
                    Подобрали по состоянию объекта без лишнего объёма работ.
                  </p>
                )}

                {item.result ? (
                  <p>
                    <span className="font-semibold text-neutral-900">
                      Результат:
                    </span>{' '}
                    {item.result}
                  </p>
                ) : null}
              </div>

              <a
                href={item.href}
                className="mt-5 inline-flex text-sm font-semibold text-neutral-950 hover:text-red-700"
              >
                Смотреть кейс →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
            Частые вопросы
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600">
            Ниже — вопросы, которые чаще всего задают перед выездом, расчётом и
            выбором решения по объекту.
          </p>
        </div>

        <div className="space-y-4">
          {faq.slice(0, 6).map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-950">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-950 px-6 py-10 text-white md:px-8 md:py-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Есть протечка или нужно понять состояние кровли?
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-300">
              Пришлите 2–4 фото объекта, город и краткое описание проблемы. Мы
              подскажем, что целесообразно в вашем случае: ремонт, восстановление,
              гидроизоляция или замена.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/kontakty/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Отправить фото объекта
              </a>
              <a
                href="tel:+79790361222"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_.95fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
              Работаем по Симферополю и Крыму
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Офис находится в Симферополе. Работаем по Симферополю и Крыму:
              Севастополь, Ялта, Алушта, Феодосия, Евпатория, Саки, Бахчисарай,
              Судак, Керчь, Джанкой.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
              Статьи и разборы
            </h2>
            <div className="mt-6 space-y-4">
              {articles.slice(0, 3).map((item) => (
                <article
                  key={item.slug}
                  className="rounded-2xl border border-neutral-200 bg-white p-5"
                >
                  <h3 className="text-lg font-bold tracking-tight text-neutral-950">
                    {item.title}
                  </h3>
                  {item.excerpt ? (
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {item.excerpt}
                    </p>
                  ) : null}
                  <a
                    href={item.href}
                    className="mt-4 inline-flex text-sm font-semibold text-neutral-950 hover:text-red-700"
                  >
                    Читать статью →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}