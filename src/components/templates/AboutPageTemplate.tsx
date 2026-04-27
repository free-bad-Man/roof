import { GeoBlock } from '@/components/ui/GeoBlock';
import { PageHero } from '@/components/ui/PageHero';
import { PhotoCta } from '@/components/ui/PhotoCta';
import { SectionShell } from '@/components/ui/SectionShell';
import { company } from '@/shared/data/site';

const differenceItems = [
  'Основной профиль — кровля, восстановление и гидроизоляция, а не универсальная стройка.',
  'Сначала смотрим состояние объекта, а уже потом предлагаем ремонт, восстановление, гидроизоляцию или замену.',
  'Работаем с протечками, узлами, примыканиями и мягкой кровлей как с системной задачей.',
  'Показываем реальные объекты по Крыму и объясняем логику решения, а не даём шаблонные обещания.',
];

const solutionSteps = [
  'Вы присылаете фото, город и кратко описываете проблему.',
  'Мы уточняем тип объекта, состояние кровли и характер протечки или износа.',
  'Если информации достаточно, предварительно сориентируем по сценарию работ.',
  'Если нужен осмотр, согласуем выезд, после чего готовим понятную смету и этапы.',
];

export function AboutPageTemplate() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Профильная кровельная компания в Крыму"
        subtitle={`${company.legalName} — команда по ремонту, восстановлению и гидроизоляции кровли в Симферополе и по Крыму. Мы не позиционируем себя как универсальную стройку: подбираем решение по состоянию объекта и доводим задачу до результата.`}
        bullets={[
          'Кровля — основной профиль компании',
          'Гидроизоляция — сильный вход в проблемные объекты',
          'Sinzatim — технологическое усиление по мягкой кровле',
        ]}
      />

      <SectionShell
        eyebrow="Кто мы"
        title="Команда, которая работает с кровлей по факту объекта"
        intro="Крымская Кровельная нужна клиенту не как ещё одна бригада “на всё”, а как понятный подрядчик по кровле, протечкам и восстановлению. Мы работаем с частными и коммерческими объектами, где важно не просто закрыть симптом, а выбрать правильный сценарий работ."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Основной профиль', 'Ремонт, восстановление, гидроизоляция, монтаж и замена кровли.'],
            ['Подход', 'Честная диагностика и решение по состоянию объекта, без навязывания лишнего объёма.'],
            ['География', 'Офис в Симферополе, работа по Симферополю и Крыму.'],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-red-700">{title}</p>
              <p className="mt-3 text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                {text}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Отстройка"
        title="Чем отличаемся"
        intro="На рынке часто предлагают одинаковый набор обещаний: цена, договор, гарантия, под ключ. Мы делаем акцент на специализации, диагностике и понятном выборе решения."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {differenceItems.map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-white/20 bg-white/38 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                — {item}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Диагностика"
        title="Как подбираем решение"
        intro="Мы не начинаем с готового шаблона. В одних случаях достаточно локального ремонта, в других нужна гидроизоляция узлов, восстановление мягкой кровли или замена. Решение зависит от состояния покрытия, основания, примыканий и задачи клиента."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {solutionSteps.map((item, index) => (
            <div
              key={item}
              className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-red-700">Шаг {index + 1}</p>
              <p className="mt-3 text-[17px] leading-8 text-[var(--brand-graphite)]/78">
                {item}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Позиция бренда"
        title="Почему не универсальная стройка"
        intro="Универсальная стройка размывает ответственность: сегодня кровля, завтра отделка, потом любой другой объект. Для нас важно сохранять фокус на кровле и проблемных зонах, потому что именно здесь клиенту нужны точная диагностика, понятная смета и решение без лишних работ."
      >
        <div className="rounded-[24px] border border-white/20 bg-white/38 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6">
          <p className="text-[18px] leading-9 text-[var(--brand-graphite)]/78">
            Главная формула компании: кровля — основа, гидроизоляция — вход,
            Sinzatim — усиление экспертности, потолки — отдельное потоковое
            направление, которое не размывает кровельное ядро бренда.
          </p>
        </div>
      </SectionShell>

      <PhotoCta
        title="Нужно понять, что делать с кровлей?"
        text="Пришлите 2–4 фото объекта, город и краткое описание проблемы. Подскажем, с чего начать: ремонт, восстановление, гидроизоляция или осмотр."
      />
      <GeoBlock />
    </>
  );
}
