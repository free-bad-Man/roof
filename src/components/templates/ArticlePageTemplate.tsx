import { CtaBanner } from '@/components/sections/CtaBanner';

type Props = {
  title: string;
  excerpt: string;
};

export function ArticlePageTemplate({ title, excerpt }: Props) {
  return (
    <>
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">
            Статья
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
            {excerpt}
          </p>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
            <div className="max-w-3xl space-y-8 text-base leading-8 text-[var(--brand-muted)]">
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-graphite)]">
                  В чём обычно суть проблемы
                </h2>
                <p className="mt-3">
                  В большинстве случаев клиент видит только внешнее проявление:
                  протечку, мокрое пятно, износ покрытия или разрушение проблемной
                  зоны. Но реальная задача почти всегда шире, чем видимый
                  симптом. Чтобы выбрать правильное решение, важно смотреть не
                  только на следствие, а на состояние покрытия, узлов,
                  примыканий и всего проблемного участка.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-graphite)]">
                  Что чаще всего становится причиной
                </h2>
                <p className="mt-3">
                  Причина может быть в износе покрытия, нарушении герметичности,
                  проблемах в примыканиях, локальных повреждениях, старом
                  ремонте, который устранил только следствие, или в общем
                  состоянии кровли. Поэтому шаблонный подход “просто подмазать
                  сверху” часто даёт только временный эффект и не решает задачу
                  по существу.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-graphite)]">
                  Когда хватает локального решения, а когда нужен больший объём
                </h2>
                <p className="mt-3">
                  Не в каждом случае нужна полная замена. Во многих ситуациях
                  достаточно локального ремонта, герметизации узлов,
                  гидроизоляции или восстановления проблемного участка. Более
                  глубокий объём работ нужен тогда, когда состояние покрытия и
                  основания уже не позволяет получить разумный результат через
                  точечное решение. Это определяется по факту объекта, а не по
                  шаблону.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-graphite)]">
                  Что важно проверить на объекте
                </h2>
                <ul className="mt-3 space-y-2">
                  <li>— где находится реальный источник проблемы, а не только её след</li>
                  <li>— в каком состоянии покрытие и проблемные зоны</li>
                  <li>— есть ли нарушения в узлах, примыканиях и стыках</li>
                  <li>— можно ли решить задачу без лишнего демонтажа</li>
                  <li>— какой сценарий работ действительно целесообразен</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-graphite)]">
                  Что делать дальше
                </h2>
                <p className="mt-3">
                  Самый быстрый способ начать — отправить 2–4 фото объекта,
                  указать город, тип объекта и кратко описать проблему. После
                  этого можно предварительно понять, о чём идёт речь: локальный
                  ремонт, восстановление, гидроизоляция или уже более серьёзный
                  объём работ. Если по фото информации недостаточно, следующим
                  шагом становится осмотр или замер.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Есть похожая ситуация на объекте?"
        text="Пришлите 2–4 фото объекта, город и кратко опишите задачу — сориентируем по решению и следующему шагу."
      />
    </>
  );
}