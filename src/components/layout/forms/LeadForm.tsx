"use client";

import { useMemo } from "react";

type LeadFormVariant = "main" | "service" | "inspection";

type LeadFormProps = {
  variant?: LeadFormVariant;
  title?: string;
  subtitle?: string;
};

export function LeadForm({
  variant = "main",
  title = "Получить консультацию и расчёт",
  subtitle = "Опишите задачу — сориентируем по решению и следующим шагам.",
}: LeadFormProps) {
  const submitLabel = useMemo(() => {
    if (variant === "inspection") return "Отправить фото / запросить замер";
    if (variant === "service") return "Отправить заявку";
    return "Получить предварительное решение";
  }, [variant]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
      <div className="grid gap-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_.9fr] md:p-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">{subtitle}</p>

          <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
            <p className="text-sm font-semibold text-neutral-950">Что лучше указать сразу</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-600">
              <li>— город</li>
              <li>— тип объекта</li>
              <li>— кратко в чём проблема</li>
              <li>— можно ли оценить по фото или нужен выезд</li>
            </ul>
          </div>

          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Для предварительной оценки можно прислать 2–4 фото объекта. Это помогает быстрее понять, целесообразен ли
            ремонт, восстановление, гидроизоляция или уже нужна замена.
          </p>
        </div>

        <form className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">Имя</label>
            <input
              type="text"
              name="name"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">Телефон</label>
            <input
              type="tel"
              name="phone"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          {(variant === "main" || variant === "service") && (
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-800">Услуга</label>
              <select className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-950">
                <option>Ремонт кровли</option>
                <option>Восстановление кровли</option>
                <option>Гидроизоляция кровли</option>
                <option>Восстановление мягкой кровли / Sinzatim</option>
                <option>Устранение протечек</option>
                <option>Кровля под ключ</option>
                <option>Натяжные потолки</option>
              </select>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">Кратко опишите задачу</label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              placeholder="Например: течёт мягкая кровля, частный дом, нужен осмотр"
            />
          </div>

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            {submitLabel}
          </button>

          <p className="text-xs leading-5 text-neutral-500">
            После отправки заявки можно продолжить общение и прислать фото объекта в Telegram.
          </p>

          <a
            href="https://t.me/krymskaya_krovelnaya"
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-sm font-semibold text-neutral-950 transition hover:text-red-700"
          >
            Перейти в Telegram →
          </a>
        </form>
      </div>
    </section>
  );
}