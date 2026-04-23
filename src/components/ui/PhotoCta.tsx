import Link from 'next/link';
import { SectionShell } from './SectionShell';

type PhotoCtaProps = {
  title?: string;
  text?: string;
};

export function PhotoCta({
  title = 'Есть протечка или нужно понять состояние кровли?',
  text = 'Пришлите 2–4 фото объекта, город и краткое описание проблемы. Мы подскажем, что целесообразно в вашем случае: ремонт, восстановление, гидроизоляция или замена.',
}: PhotoCtaProps) {
  return (
    <SectionShell title={title} intro={text}>
      <div className="grid gap-3 sm:grid-cols-[max-content_max-content] sm:items-center sm:justify-between">
        <Link
          href="/kontakty/"
          className="inline-flex min-h-12 min-w-[228px] items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Отправить фото объекта
        </Link>
        <a
          href="tel:+79790361222"
          className="inline-flex min-h-12 min-w-[140px] items-center justify-center rounded-xl border border-white/25 bg-white/55 px-6 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/75"
        >
          Позвонить
        </a>
      </div>
    </SectionShell>
  );
}
