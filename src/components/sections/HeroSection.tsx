import { company, heroBullets } from '@/shared/data/site';
import { Button } from '@/shared/ui/Button';

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1.15fr_0.85fr] md:px-6">
        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">{company.marketingName}</div>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--brand-graphite)] md:text-6xl">
            Ремонт, восстановление и гидроизоляция кровли в Крыму
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">
            Подбираем решение по состоянию объекта: ремонт, восстановление, гидроизоляция или замена, когда она действительно нужна.
          </p>
          <ul className="mt-8 space-y-3">
            {heroBullets.map((item) => (
              <li key={item} className="text-base leading-7 text-[var(--brand-graphite)]">— {item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#lead-form">Получить расчёт</Button>
            <Button href={company.telegramHref} variant="secondary">Отправить фото объекта</Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--brand-muted)]">Пришлите 2–4 фото объекта, и мы предварительно сориентируем по решению и дальнейшим шагам.</p>
        </div>
        <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-red)]">Premium industrial minimalism</div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[28px] bg-[var(--brand-bg)] p-5">
              <div className="text-sm text-[var(--brand-muted)]">Кровля — основа</div>
              <div className="mt-2 text-xl font-bold text-[var(--brand-graphite)]">Основной профиль и главный чек</div>
            </div>
            <div className="rounded-[28px] bg-[var(--brand-bg)] p-5">
              <div className="text-sm text-[var(--brand-muted)]">Гидроизоляция — вход</div>
              <div className="mt-2 text-xl font-bold text-[var(--brand-graphite)]">Быстрый вход в объект и мост в кровельные работы</div>
            </div>
            <div className="rounded-[28px] bg-[var(--brand-bg)] p-5">
              <div className="text-sm text-[var(--brand-muted)]">Sinzatim — усиление экспертности</div>
              <div className="mt-2 text-xl font-bold text-[var(--brand-graphite)]">Технологичное решение для мягкой кровли</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
