'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { LeadRequestPayload } from '@/shared/types/lead';

type Direction = 'Кровля' | 'Гидроизоляция' | 'Натяжные потолки';
type PricingMode = 'area' | 'fixed' | 'inspection';

type CalculatorService = {
  title: string;
  direction: Direction;
  mode: PricingMode;
  priceFrom?: number;
  unit?: 'м²' | 'объект';
};

type CalculatorState = {
  direction: Direction;
  service: string;
  area: string;
  city: string;
  objectType: string;
  name: string;
  phone: string;
  comment: string;
};

const DIRECTIONS: Direction[] = ['Кровля', 'Гидроизоляция', 'Натяжные потолки'];

const SERVICES: CalculatorService[] = [
  {
    direction: 'Кровля',
    title: 'Ремонт кровли',
    mode: 'area',
    priceFrom: 450,
    unit: 'м²',
  },
  {
    direction: 'Кровля',
    title: 'Восстановление кровли',
    mode: 'area',
    priceFrom: 490,
    unit: 'м²',
  },
  {
    direction: 'Кровля',
    title: 'Гидроизоляция кровли',
    mode: 'area',
    priceFrom: 390,
    unit: 'м²',
  },
  {
    direction: 'Кровля',
    title: 'Восстановление мягкой кровли / Sinzatim',
    mode: 'area',
    priceFrom: 590,
    unit: 'м²',
  },
  {
    direction: 'Кровля',
    title: 'Монтаж кровли',
    mode: 'area',
    priceFrom: 850,
    unit: 'м²',
  },
  {
    direction: 'Кровля',
    title: 'Кровля под ключ',
    mode: 'inspection',
  },
  {
    direction: 'Гидроизоляция',
    title: 'Устранение протечек',
    mode: 'fixed',
    priceFrom: 5000,
  },
  {
    direction: 'Гидроизоляция',
    title: 'Локальный ремонт / герметизация',
    mode: 'fixed',
    priceFrom: 7000,
  },
  {
    direction: 'Гидроизоляция',
    title: 'Гидроизоляция балконов и террас',
    mode: 'fixed',
    priceFrom: 15000,
    unit: 'объект',
  },
  {
    direction: 'Гидроизоляция',
    title: 'Гидроизоляция кровли',
    mode: 'area',
    priceFrom: 390,
    unit: 'м²',
  },
  {
    direction: 'Натяжные потолки',
    title: 'Натяжные потолки под ключ',
    mode: 'area',
    priceFrom: 350,
    unit: 'м²',
  },
];

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

const OBJECT_TYPE_OPTIONS = [
  'Частный дом',
  'Квартира',
  'Коммерческий объект',
  'Другое',
] as const;

const RUB_FORMATTER = new Intl.NumberFormat('ru-RU');

const INITIAL_DIRECTION: Direction = 'Кровля';
const INITIAL_SERVICE = SERVICES.find((item) => item.direction === INITIAL_DIRECTION)?.title || '';

function getServiceByTitle(title: string) {
  return SERVICES.find((item) => item.title === title);
}

function formatPrice(value: number) {
  return `${RUB_FORMATTER.format(value)} ₽`;
}

function buildCalculationLabel(service: CalculatorService | undefined, area: number) {
  if (!service) {
    return 'Выберите услугу, чтобы увидеть ориентир по стоимости';
  }

  if (service.mode === 'inspection') {
    return 'Расчёт после осмотра или фото объекта';
  }

  if (service.mode === 'fixed' && service.priceFrom) {
    return `Ориентир: от ${formatPrice(service.priceFrom)}`;
  }

  if (service.mode === 'area' && service.priceFrom) {
    if (area > 0) {
      return `Предварительный ориентир: от ${formatPrice(service.priceFrom * area)}`;
    }

    return `Введите площадь, ориентир: от ${formatPrice(service.priceFrom)} за м²`;
  }

  return 'Расчёт после осмотра или фото объекта';
}

export function EstimateCalculator() {
  const pathname = usePathname();
  const [form, setForm] = useState<CalculatorState>({
    direction: INITIAL_DIRECTION,
    service: INITIAL_SERVICE,
    area: '',
    city: '',
    objectType: '',
    name: '',
    phone: '',
    comment: '',
  });
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const servicesByDirection = useMemo(
    () => SERVICES.filter((item) => item.direction === form.direction),
    [form.direction],
  );

  const selectedService = useMemo(() => getServiceByTitle(form.service), [form.service]);
  const areaValue = Number(form.area.replace(',', '.')) || 0;
  const shouldShowArea = selectedService?.mode === 'area';
  const calculationLabel = buildCalculationLabel(selectedService, areaValue);

  const handleChange =
    (field: keyof CalculatorState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;

      if (field === 'direction') {
        const nextDirection = value as Direction;
        const firstService = SERVICES.find((item) => item.direction === nextDirection)?.title || '';

        setForm((prev) => ({
          ...prev,
          direction: nextDirection,
          service: firstService,
          area: '',
        }));
        setStatus('idle');
        return;
      }

      if (field === 'service') {
        setForm((prev) => ({
          ...prev,
          service: value,
          area: '',
        }));
        setStatus('idle');
        return;
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
      setStatus('idle');
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('pending');
    setErrorMessage('');

    const areaText = shouldShowArea
      ? form.area.trim()
        ? `${form.area.trim()} м²`
        : 'не указана'
      : 'не требуется для выбранной услуги';

    const commentParts = [
      'Заявка отправлена из калькулятора',
      `Направление: ${form.direction}`,
      `Услуга: ${form.service}`,
      `Город: ${form.city}`,
      `Тип объекта: ${form.objectType}`,
      `Площадь: ${areaText}`,
      `Предварительный расчёт: ${calculationLabel}`,
      form.comment.trim() ? `Комментарий клиента: ${form.comment.trim()}` : '',
    ].filter(Boolean);

    const payload: LeadRequestPayload = {
      source: 'Сайт',
      formName: 'Сайт — Калькулятор',
      pagePath: pathname,
      client: {
        name: form.name.trim(),
        phone: form.phone.trim(),
      },
      deal: {
        service: form.service,
        city: form.city,
        comment: commentParts.join('\n'),
      },
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить расчёт');
      }

      setStatus('success');
      setForm({
        direction: INITIAL_DIRECTION,
        service: INITIAL_SERVICE,
        area: '',
        city: '',
        objectType: '',
        name: '',
        phone: '',
        comment: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Не удалось отправить расчёт. Попробуйте ещё раз.',
      );
    }
  };

  return (
    <section id="estimate-calculator" className="mx-auto mt-10 max-w-[1180px] scroll-mt-28 px-4 md:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/25 bg-white/38 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-red-700">Онлайн-калькулятор</p>
            <h2 className="mt-3 max-w-[760px] bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[32px] font-semibold leading-[1.04] tracking-[-0.03em] text-transparent md:text-[40px] lg:text-[48px]">
              Предварительный расчёт стоимости
            </h2>
            <p className="mt-5 max-w-[760px] text-[18px] leading-8 text-[var(--brand-graphite)]/68">
              Выберите направление, услугу и параметры объекта. Калькулятор даст ориентир по цене, а менеджер уточнит детали и подскажет следующий шаг.
            </p>

            <div className="mt-6 rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <p className="text-sm font-semibold text-[var(--brand-graphite)]/68">Результат расчёта</p>
              <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.02em] text-[var(--brand-graphite)]">
                {calculationLabel}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[var(--brand-muted)]">
                Это не окончательная смета. Точная стоимость зависит от состояния объекта, узлов, доступа и объёма работ.
              </p>
            </div>
          </div>

          <form className="rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="calculator-direction" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Направление
                </label>
                <select
                  id="calculator-direction"
                  value={form.direction}
                  onChange={handleChange('direction')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                  required
                >
                  {DIRECTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calculator-service" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Услуга
                </label>
                <select
                  id="calculator-service"
                  value={form.service}
                  onChange={handleChange('service')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                  required
                >
                  {servicesByDirection.map((item) => (
                    <option key={`${item.direction}-${item.title}`} value={item.title}>{item.title}</option>
                  ))}
                </select>
              </div>

              {shouldShowArea ? (
                <div>
                  <label htmlFor="calculator-area" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                    Площадь, м²
                  </label>
                  <input
                    id="calculator-area"
                    type="number"
                    min="1"
                    step="1"
                    value={form.area}
                    onChange={handleChange('area')}
                    className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                    placeholder="Например, 80"
                    required
                  />
                </div>
              ) : null}

              <div>
                <label htmlFor="calculator-city" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Город
                </label>
                <select
                  id="calculator-city"
                  value={form.city}
                  onChange={handleChange('city')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                  required
                >
                  <option value="">Выберите город</option>
                  {CITY_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calculator-object-type" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Тип объекта
                </label>
                <select
                  id="calculator-object-type"
                  value={form.objectType}
                  onChange={handleChange('objectType')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                  required
                >
                  <option value="">Выберите тип объекта</option>
                  {OBJECT_TYPE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calculator-name" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Имя
                </label>
                <input
                  id="calculator-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder="Как к вам обращаться"
                  required
                />
              </div>

              <div>
                <label htmlFor="calculator-phone" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Телефон
                </label>
                <input
                  id="calculator-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="calculator-comment" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                Комментарий, необязательно
              </label>
              <textarea
                id="calculator-comment"
                value={form.comment}
                onChange={handleChange('comment')}
                className="min-h-[120px] w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                placeholder="Например: есть протечка после дождя, можно начать с фото"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'pending'}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'pending' ? 'Отправляем...' : 'Отправить расчёт менеджеру'}
            </button>

            {status === 'success' ? (
              <p className="mt-4 text-sm leading-6 text-emerald-700">
                Спасибо. Расчёт отправлен менеджеру, скоро свяжемся с вами и уточним детали.
              </p>
            ) : null}

            {status === 'error' ? (
              <p className="mt-4 text-sm leading-6 text-red-700">
                {errorMessage || 'Не удалось отправить расчёт. Попробуйте ещё раз.'}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
