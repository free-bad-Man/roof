import Link from 'next/link';

type ServiceGridItem = {
  href: string;
  title: string;
  excerpt: string;
  price?: string;
};

type ServicesGridProps = {
  title: string;
  subtitle?: string;
  items: ServiceGridItem[];
};

export function ServicesGrid({
  title,
  subtitle,
  items,
}: ServicesGridProps) {
  return (
    <section className="mx-auto mt-10 max-w-[1480px] px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[28px] border border-white/18 bg-white/32 p-6 backdrop-blur-md shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:p-8">
          <div className="max-w-[860px]">
            <h2 className="bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent md:text-[38px] lg:text-[46px]">
              {title}
            </h2>

            {subtitle ? (
              <p className="mt-4 max-w-[780px] text-[17px] leading-8 text-[var(--brand-graphite)]/68">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.href}
              className="flex h-full min-w-0 flex-col rounded-[26px] border border-white/18 bg-white/36 p-5 backdrop-blur-md shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition hover:bg-white/42"
            >
              {item.price ? (
                <div className="mb-4">
                  <span className="inline-flex rounded-full border border-red-200/80 bg-white/72 px-3 py-1 text-sm font-semibold text-red-700">
                    {item.price}
                  </span>
                </div>
              ) : null}

              <h3 className="max-w-[22ch] text-[21px] font-semibold leading-[1.18] tracking-[-0.02em] text-[var(--brand-graphite)] md:text-[24px]">
                {item.title}
              </h3>

              <p className="mt-4 flex-1 text-[16px] leading-8 text-[var(--brand-graphite)]/72">
                {item.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--brand-red)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-red-dark)]"
                >
                  Подробнее
                </Link>

                <Link
                  href="/kontakty/"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/24 bg-white/68 px-5 text-sm font-semibold text-[var(--brand-graphite)] transition hover:bg-white/82"
                >
                  Отправить фото
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}