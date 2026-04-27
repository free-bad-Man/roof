import { LeadForm } from '@/components/forms/LeadForm';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { company } from '@/shared/data/site';

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

function GlassSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto mt-10 max-w-[1180px] px-4 md:px-6 lg:px-8 ${className}`}>
      <div className="rounded-[32px] border border-white/25 bg-white/38 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
        {children}
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-[860px]">
      {eyebrow ? <p className="text-sm font-semibold text-red-700">{eyebrow}</p> : null}
      <h2 className="mt-3 bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[32px] font-semibold leading-[1.04] tracking-[-0.03em] text-transparent md:text-[40px] lg:text-[48px]">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 max-w-[820px] text-[18px] leading-8 text-[var(--brand-graphite)]/68">
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function HomePageTemplate({
  services,
  prices,
  cases,
  faq,
  articles,
}: HomePageTemplateProps) {
  return (
    <>
      <section className="mx-auto max-w-[1480px] px-4 pb-8 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-[1180px] rounded-[32px] border border-white/25 bg-white/42 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
          <p className="inline-flex rounded-full border border-red-200/80 bg-white/55 px-3 py-1 text-sm font-semibold text-red-700 backdrop-blur-sm">
            Крымская Кровельная
          </p>

          <h1 className="mx-auto mt-5 max-w-[980px] bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-center text-[32px] font-semibold leading-[1.04] tracking-[-0.035em] text-transparent md:text-[40px] lg:text-[48px] xl:text-[52px]">
            Ремонт, восстановление и
            <br />
            гидроизоляция кровли в Крыму
          </h1>

          <p className="mt-8 max-w-[820px] text-[19px] leading-9 text-[var(--brand-graphite)]/68">
            Подбираем решение по состоянию объекта: ремонт, восстановление,
            гидроизоляция или замена, когда она действительно нужна.
          </p>

          <ul className="mt-6 max-w-[820px] space-y-3 text-[17px] leading-8 text-[var(--brand-graphite)]/78">
            <li>— Не навязываем замену там, где кровлю можно восстановить</li>
            <li>— Устраняем причину протечки, а не просто закрываем симптом</li>
            <li>— Работаем по Симферополю и Крыму</li>
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-[max-content_max-content] sm:items-center sm:justify-between">
            <a
              href={company.telegramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 min-w-[228px] items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Отправить фото объекта
            </a>
            <a
              href="#lead-form"
              className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-xl border border-neutral-300/80 bg-white/55 px-6 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition hover:bg-white/75"
            >
              Получить расчёт
            </a>
          </div>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-[var(--brand-muted)]">
            Пришлите 2–4 фото объекта, и мы предварительно сориентируем по решению и дальнейшим шагам.
          </p>
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

      <GlassSection>
        <SectionTitle
          title="Почему выбирают Крымскую Кровельную"
          text="Мы выстраиваем работу не как «бригада на все случаи», а как профильная компания, где кровля — основной профиль, а решение подбирается по состоянию объекта."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            'Основной профиль компании — кровля, а не всё подряд',
            'Сильная специализация на восстановлении и гидроизоляции кровли',
            'Честная диагностика: ремонт, восстановление или замена по факту объекта',
            'Работаем с проблемными узлами, примыканиями и протечками',
            'Понятная смета, этапы работ и нормальный сервис',
            'Реальные объекты по Крыму, а не шаблонные обещания',
          ].map((item) => (
            <div key={item} className="rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <p className="text-sm font-semibold text-red-700">Преимущество</p>
              <p className="mt-4 text-[18px] leading-8 text-[var(--brand-graphite)]/86">{item}</p>
            </div>
          ))}
        </div>
      </GlassSection>

      <GlassSection>
        <SectionTitle
          title="Ориентиры по стоимости"
          text="Ниже — входящие цены для первичного понимания бюджета. Это не окончательная смета, а стартовые ориентиры до осмотра объекта и уточнения состояния покрытия, узлов и объёма работ."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {prices.map((item) => (
            <div key={item[0]} className="flex items-center justify-between gap-4 rounded-[24px] border border-white/20 bg-white/32 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <p className="text-[16px] leading-7 text-[var(--brand-graphite)]/86">{item[0]}</p>
              <p className="shrink-0 text-sm font-semibold text-red-700">{item[1]}</p>
            </div>
          ))}
        </div>
      </GlassSection>

      <GlassSection>
        <SectionTitle
          title="Реальные объекты по Крыму"
          text="Сильнее любых общих обещаний работают реальные кейсы: какая была проблема, какое решение выбрали и какой результат получили по объекту."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.slice(0, 3).map((item) => (
            <article key={item.slug} className="flex h-full flex-col rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <div className="flex-1">
                {item.location ? <p className="text-sm font-semibold text-red-700">{item.location}</p> : null}
                <h3 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--brand-graphite)]">{item.title}</h3>
                <div className="mt-4 space-y-3 text-[16px] leading-7 text-[var(--brand-graphite)]/72">
                  {item.problem ? <p><span className="font-semibold text-[var(--brand-graphite)]">Проблема:</span> {item.problem}</p> : null}
                  <p><span className="font-semibold text-[var(--brand-graphite)]">Решение:</span> {item.solution || 'Подобрали по состоянию объекта без лишнего объёма работ.'}</p>
                  {item.result ? <p><span className="font-semibold text-[var(--brand-graphite)]">Результат:</span> {item.result}</p> : null}
                </div>
              </div>
              <a href={item.href} className="mt-6 inline-flex min-h-11 items-center justify-center self-start whitespace-nowrap rounded-xl border border-white/25 bg-white/55 px-4 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75">
                Смотреть кейс
              </a>
            </article>
          ))}
        </div>
      </GlassSection>

      <GlassSection>
        <SectionTitle
          title="Частые вопросы"
          text="Ниже — вопросы, которые чаще всего задают перед выездом, расчётом и выбором решения по объекту."
        />
        <div className="mt-8 space-y-4">
          {faq.slice(0, 6).map((item) => (
            <details key={item.question} className="rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <summary className="cursor-pointer list-none text-[18px] font-semibold leading-7 text-[var(--brand-graphite)]">{item.question}</summary>
              <p className="mt-4 max-w-[900px] text-[16px] leading-7 text-[var(--brand-graphite)]/72">{item.answer}</p>
            </details>
          ))}
        </div>
      </GlassSection>

      <GlassSection>
        <SectionTitle
          title="Есть протечка или нужно понять состояние кровли?"
          text="Пришлите 2–4 фото объекта, город и краткое описание проблемы. Мы подскажем, что целесообразно в вашем случае: ремонт, восстановление, гидроизоляция или замена."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-[max-content_max-content] sm:items-center sm:justify-between">
          <a href={company.telegramHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 min-w-[228px] items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700">
            Отправить фото объекта
          </a>
          <a href={company.phoneHref} className="inline-flex min-h-12 min-w-[140px] items-center justify-center rounded-xl border border-white/25 bg-white/55 px-6 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75">
            Позвонить
          </a>
        </div>
      </GlassSection>

      <GlassSection>
        <SectionTitle
          eyebrow="География"
          title="Работаем по Симферополю и Крыму"
          text="Офис находится в Симферополе. Работаем по Симферополю и Крыму: Севастополь, Ялта, Алушта, Феодосия, Евпатория, Саки, Бахчисарай, Судак, Керчь, Джанкой."
        />
      </GlassSection>

      <GlassSection className="pb-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SectionTitle eyebrow="Контент-поддержка" title="Статьи и разборы" />
          <a href="/stati/" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 bg-white/55 px-4 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75">
            Все статьи
          </a>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.slice(0, 3).map((item) => (
            <article key={item.slug} className="flex h-full flex-col rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <h4 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--brand-graphite)]">{item.title}</h4>
              {item.excerpt ? <p className="mt-3 flex-1 text-[16px] leading-7 text-[var(--brand-graphite)]/72">{item.excerpt}</p> : <div className="flex-1" />}
              <a href={item.href} className="mt-4 inline-flex min-h-11 items-center justify-center self-start whitespace-nowrap rounded-xl border border-white/24 bg-white/68 px-4 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/82">
                Читать статью
              </a>
            </article>
          ))}
        </div>
      </GlassSection>
    </>
  );
}
