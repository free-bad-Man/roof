import { articles } from '@/shared/data/site';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function ArticlesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            Статьи
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            Разборы по кровле, протечкам и восстановлению
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Здесь собираем не SEO-полотна, а прикладные материалы по проблемам и
            решениям: когда нужен ремонт, как искать причину протечки и где
            восстановление целесообразнее полной замены.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((item) => (
            <article
              key={item.slug}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                {item.title}
              </h2>

              {item.excerpt ? (
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.excerpt}
                </p>
              ) : null}

              <a
                href={item.href}
                className="mt-5 inline-flex text-sm font-semibold text-neutral-950 hover:text-red-700"
              >
                Читать статью →
              </a>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Нужно не просто читать, а понять решение по вашему объекту?"
        text="Пришлите 2–4 фото объекта, город и краткое описание задачи. Сориентируем по возможному решению и следующему шагу."
      />
    </>
  );
}