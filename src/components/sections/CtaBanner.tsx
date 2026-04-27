import { company } from '@/shared/data/site';
import { Button } from '@/shared/ui/Button';

export function CtaBanner({ title, text }: { title: string; text: string }) {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-[32px] bg-[var(--brand-graphite)] px-6 py-8 text-white md:px-10 md:py-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
            {text}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={company.telegramHref}>Отправить фото объекта</Button>
            <Button href="/kontakty/#lead-form" variant="secondary">
              Получить расчёт
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
