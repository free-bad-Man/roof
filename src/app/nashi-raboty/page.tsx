import { cases } from '@/shared/data/site';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function CasesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            Наши работы
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            Реальные объекты и практические решения
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Сильнее любых общих обещаний работают реальные кейсы: какая была
            проблема, какое решение выбрали и какой результат получили. Ниже —
            первая волна кейсов по кровле и гидроизоляции.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.slug}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              {item.location ? (
                <p className="text-sm font-semibold text-red-700">
                  {item.location}
                </p>
              ) : null}

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                {item.title}
              </h2>

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
                ) : null}

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

      <CtaBanner
        title="Есть похожая задача по кровле или протечке?"
        text="Пришлите 2–4 фото объекта, город и краткое описание проблемы. Подскажем, какой формат работ целесообразен именно в вашем случае."
      />
    </>
  );
}