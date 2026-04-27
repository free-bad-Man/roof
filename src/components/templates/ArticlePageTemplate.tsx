import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';

type Props = {
  title: string;
  excerpt: string;
};

function getRelatedService(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('протеч')) {
    return {
      href: '/gidroizolyatsiya/ustranenie-protechek/',
      label: 'Устранение протечек',
    };
  }

  if (normalizedTitle.includes('гидроизоляц')) {
    return {
      href: '/gidroizolyatsiya/',
      label: 'Гидроизоляция',
    };
  }

  if (normalizedTitle.includes('мягк') || normalizedTitle.includes('демонтаж')) {
    return {
      href: '/krovelnye-raboty/vosstanovlenie-myagkoy-krovli-sinzatim/',
      label: 'Восстановление мягкой кровли / Sinzatim',
    };
  }

  return {
    href: '/krovelnye-raboty/remont-krovli/',
    label: 'Ремонт кровли',
  };
}

const articleSections = [
  {
    title: 'В чём обычно суть проблемы',
    text: 'В большинстве случаев клиент видит только внешнее проявление: протечку, мокрое пятно, износ покрытия или разрушение проблемной зоны. Но реальная задача почти всегда шире, чем видимый симптом. Чтобы выбрать правильное решение, важно смотреть не только на следствие, а на состояние покрытия, узлов, примыканий и всего проблемного участка.',
  },
  {
    title: 'Что чаще всего становится причиной',
    text: 'Причина может быть в износе покрытия, нарушении герметичности, проблемах в примыканиях, локальных повреждениях, старом ремонте, который устранил только следствие, или в общем состоянии кровли. Поэтому шаблонный подход “просто подмазать сверху” часто даёт только временный эффект и не решает задачу по существу.',
  },
  {
    title: 'Когда хватает локального решения, а когда нужен больший объём',
    text: 'Не в каждом случае нужна полная замена. Во многих ситуациях достаточно локального ремонта, герметизации узлов, гидроизоляции или восстановления проблемного участка. Более глубокий объём работ нужен тогда, когда состояние покрытия и основания уже не позволяет получить разумный результат через точечное решение. Это определяется по факту объекта, а не по шаблону.',
  },
  {
    title: 'Что делать дальше',
    text: 'Самый быстрый способ начать — отправить 2–4 фото объекта, указать город, тип объекта и кратко описать проблему. После этого можно предварительно понять, о чём идёт речь: локальный ремонт, восстановление, гидроизоляция или уже более серьёзный объём работ. Если по фото информации недостаточно, следующим шагом становится осмотр или замер.',
  },
];

const checklistItems = [
  'где находится реальный источник проблемы, а не только её след',
  'в каком состоянии покрытие и проблемные зоны',
  'есть ли нарушения в узлах, примыканиях и стыках',
  'можно ли решить задачу без лишнего демонтажа',
  'какой сценарий работ действительно целесообразен',
];

export function ArticlePageTemplate({ title, excerpt }: Props) {
  const relatedService = getRelatedService(title);

  return (
    <>
      <PageHero
        eyebrow="Статья"
        title={title}
        subtitle={excerpt}
        bullets={[
          'Разбираем проблему, причину и возможные решения',
          'Не подменяем диагностику шаблонным советом',
          'Ведём к практическому следующему шагу по объекту',
        ]}
        leadHref="/kontakty/#lead-form"
      />

      <SectionShell
        eyebrow="Разбор"
        title="Практический longread по ситуации"
        intro="Материал построен так, чтобы клиент понял не только общие признаки проблемы, но и почему важно выбирать решение по состоянию объекта: ремонт, восстановление, гидроизоляцию или замену."
      >
        <div className="space-y-5">
          {articleSections.map((item) => (
            <section
              key={item.title}
              className="rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6"
            >
              <h2 className="text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--brand-graphite)]">
                {item.title}
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-[var(--brand-graphite)]/76">
                {item.text}
              </p>
            </section>
          ))}

          <section className="rounded-[28px] border border-white/20 bg-white/38 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6">
            <h2 className="text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--brand-graphite)]">
              Что важно проверить на объекте
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {checklistItems.map((item) => (
                <p
                  key={item}
                  className="rounded-[18px] border border-white/20 bg-white/45 px-4 py-3 text-[16px] leading-7 text-[var(--brand-graphite)]/76 backdrop-blur-sm"
                >
                  — {item}
                </p>
              ))}
            </div>
          </section>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Связанная услуга"
        title="Куда перейти по этой теме"
        intro="Если ситуация похожа на вашу, можно сразу открыть профильную услугу или отправить фото объекта для предварительной оценки."
      >
        <Link
          href={relatedService.href}
          className="inline-flex min-h-12 items-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          {relatedService.label}
        </Link>
      </SectionShell>

      <PhotoCta
        title="Есть похожая ситуация на объекте?"
        text="Пришлите 2–4 фото объекта, город и кратко опишите задачу — сориентируем по решению и следующему шагу."
      />
    </>
  );
}
