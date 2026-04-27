'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type LeadFormVariant = 'main' | 'service' | 'inspection';

type LeadFormProps = {
  id?: string;
  variant?: LeadFormVariant;
  title: string;
  subtitle?: string;
  pageService?: string;
  serviceHiddenValue?: string;
  lockedService?: string;
  submitLabel?: string;
  submitUrl?: string;
  className?: string;
};

type LeadFormState = {
  name: string;
  phone: string;
  service: string;
  city: string;
  message: string;
};

const CITY_OPTIONS = [
  'Симферополь',
  'Севастополь',
  'Ялта',
  'Алушта',
  'Феодосия',
  'Евпатория',
  'Саки',
  'Бахчисарай',
  'Судак',
  'Керчь',
  'Джанкой',
  'Другое',
] as const;

const SERVICE_OPTIONS = [
  'Ремонт кровли',
  'Восстановление кровли',
  'Гидроизоляция кровли',
  'Восстановление мягкой кровли / Sinzatim',
  'Замена кровли',
  'Монтаж кровли',
  'Кровля под ключ',
  'Устранение протечек',
  'Гидроизоляция балконов и террас',
  'Локальный ремонт / герметизация',
  'Натяжные потолки',
] as const;

const VARIANT_FORM_NAME: Record<LeadFormVariant, string> = {
  main: 'Сайт — Главная форма',
  service: 'Сайт — Страница услуги',
  inspection: 'Сайт — Замер / фото',
};

const VARIANT_SUBMIT_LABEL: Record<LeadFormVariant, string> = {
  main: 'Отправить заявку',
  service: 'Отправить заявку',
  inspection: 'Отправить заявку',
};

const TELEGRAM_URL = 'https://t.me/krymskaya.krovelnaya';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function LeadForm({
  id = 'lead-form',
  variant = 'main',
  title,
  subtitle,
  pageService,
  serviceHiddenValue,
  lockedService,
  submitLabel,
  submitUrl = '/api/leads',
  className,
}: LeadFormProps) {
  const pathname = usePathname();

  const isMain = variant === 'main';
  const isService = variant === 'service';
  const isInspection = variant === 'inspection';

  const [form, setForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    service: '',
    city: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState('');

  const formName = VARIANT_FORM_NAME[variant];
  const resolvedSubmitLabel = submitLabel || VARIANT_SUBMIT_LABEL[variant];

  const resolvedService = useMemo(() => {
    const staticService =
      pageService?.trim() ||
      serviceHiddenValue?.trim() ||
      lockedService?.trim() ||
      '';

    if (isService) {
      return staticService;
    }

    return staticService || form.service.trim();
  }, [form.service, isService, lockedService, pageService, serviceHiddenValue]);

  const helperTitle = isMain
    ? 'Что лучше указать сразу'
    : isService
      ? 'Что поможет быстрее сориентироваться'
      : 'Что лучше указать для оценки';

  const helperItems = isMain
    ? [
        '— город',
        '— тип объекта',
        '— кратко в чём проблема',
        '— можно ли оценить по фото или нужен выезд',
      ]
    : isService
      ? [
          '— город и тип объекта',
          '— что именно беспокоит по кровле',
          '— есть ли фото проблемной зоны',
          '— нужен ли выезд или можно начать с фото',
        ]
      : [
          '— город',
          '— какой объект',
          '— что нужно сделать',
          '— можно ли начать с фото или нужен выезд',
        ];

  const successMessage = isInspection
    ? 'Спасибо. Мы свяжемся с вами и уточним, нужен ли выезд или можно сориентировать по фото.'
    : 'Спасибо. Заявка отправлена, скоро свяжемся с вами и подскажем следующий шаг.';

  const handleChange =
    (field: keyof LeadFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus('pending');
    setErrorMessage('');

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: isMain ? '' : form.city.trim(),
      service: resolvedService,
      message: form.message.trim(),
      source: 'Сайт',
      formName,
      page: pathname,
      needsVisit: isInspection ? 'Да / по ситуации' : '',
    };

    try {
      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить форму');
      }

      setStatus('success');
      setForm({
        name: '',
        phone: '',
        service: '',
        city: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Не удалось отправить форму. Попробуйте ещё раз.',
      );
    }
  };

  return (
    <section
      id={id}
      className={cx(
        'mx-auto mt-10 max-w-[1180px] scroll-mt-28 px-4 md:px-6 lg:px-8',
        className,
      )}
    >
      <div className="rounded-[32px] border border-white/25 bg-white/38 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="min-w-0">
            <h2 className="max-w-[760px] bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[32px] font-semibold leading-[1.04] tracking-[-0.03em] text-transparent md:text-[40px] lg:text-[48px]">
              {title}
            </h2>

            {subtitle ? (
              <p className="mt-5 max-w-[720px] text-[18px] leading-8 text-[var(--brand-graphite)]/68">
                {subtitle}
              </p>
            ) : null}

            <div className="mt-6 rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <p className="text-[20px] font-semibold leading-7 text-[var(--brand-graphite)]">
                {helperTitle}
              </p>

              <div className="mt-5 space-y-3 text-[17px] leading-8 text-[var(--brand-graphite)]/72">
                {helperItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-[720px] text-[15px] leading-7 text-[var(--brand-muted)]">
              {isService
                ? 'Услуга будет подставлена автоматически по текущей странице.'
                : 'После отправки мы свяжемся с вами и подскажем, нужен ли выезд или можно начать с оценки по фото.'}
            </p>
          </div>

          <div className="min-w-0 rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="hidden" name="source" value="Сайт" />
              <input type="hidden" name="formName" value={formName} />
              <input type="hidden" name="page" value={pathname} />
              {isService && resolvedService ? (
                <input type="hidden" name="service" value={resolvedService} />
              ) : null}

              <div>
                <label
                  htmlFor={`${variant}-name`}
                  className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78"
                >
                  Имя
                </label>
                <input
                  id={`${variant}-name`}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder="Как к вам обращаться"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`${variant}-phone`}
                  className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78"
                >
                  Телефон
                </label>
                <input
                  id={`${variant}-phone`}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>

              {!isMain ? (
                <div>
                  <label
                    htmlFor={`${variant}-city`}
                    className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78"
                  >
                    Город
                  </label>
                  <select
                    id={`${variant}-city`}
                    name="city"
                    value={form.city}
                    onChange={handleChange('city')}
                    className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                    required
                  >
                    <option value="">Выберите город</option>
                    {CITY_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {!isService ? (
                <div>
                  <label
                    htmlFor={`${variant}-service`}
                    className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78"
                  >
                    Услуга
                  </label>
                  <select
                    id={`${variant}-service`}
                    name="service"
                    value={form.service}
                    onChange={handleChange('service')}
                    className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                    required
                  >
                    <option value="">Выберите услугу</option>
                    {SERVICE_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor={`${variant}-message`}
                  className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78"
                >
                  {isInspection ? 'Что нужно сделать' : 'Кратко опишите задачу'}
                </label>
                <textarea
                  id={`${variant}-message`}
                  name="message"
                  value={form.message}
                  onChange={handleChange('message')}
                  className="min-h-[140px] w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder={
                    isInspection
                      ? 'Например: нужна оценка по фото, частный дом, есть протечка'
                      : 'Например: течёт мягкая кровля, частный дом, нужен осмотр'
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'pending'}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'pending' ? 'Отправляем...' : resolvedSubmitLabel}
              </button>

              <div className="space-y-2">
                {status === 'success' ? (
                  <p className="text-sm leading-6 text-emerald-700">
                    {successMessage}
                  </p>
                ) : null}

                {status === 'error' ? (
                  <p className="text-sm leading-6 text-red-700">
                    {errorMessage || 'Не удалось отправить форму. Попробуйте ещё раз.'}
                  </p>
                ) : null}

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-semibold text-[var(--brand-graphite)] transition hover:text-red-700"
                >
                  Перейти в Telegram →
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
