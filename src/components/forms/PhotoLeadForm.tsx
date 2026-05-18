'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type PhotoLeadState = {
  name: string;
  phone: string;
  city: string;
  service: string;
  comment: string;
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
  'Кровля под ключ',
  'Устранение протечек',
  'Гидроизоляция балконов и террас',
  'Локальный ремонт / герметизация',
  'Натяжные потолки',
  'Другое',
] as const;

const MAX_FILES = 6;

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)} МБ`;
  }

  return `${Math.max(1, Math.round(size / 1024))} КБ`;
}

export function PhotoLeadForm() {
  const pathname = usePathname();
  const [form, setForm] = useState<PhotoLeadState>({
    name: '',
    phone: '',
    city: '',
    service: '',
    comment: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const selectedFilesLabel = useMemo(() => {
    if (files.length === 0) {
      return 'Фото не выбраны';
    }

    return `${files.length} файл(ов): ${files
      .map((file) => `${file.name} (${formatFileSize(file.size)})`)
      .join(', ')}`;
  }, [files]);

  const handleChange =
    (field: keyof PhotoLeadState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setStatus('idle');
      setMessage('');
    };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files || []).slice(0, MAX_FILES);
    setFiles(nextFiles);
    setStatus('idle');
    setMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (files.length === 0) {
      setStatus('error');
      setMessage('Прикрепите хотя бы одно фото объекта.');
      return;
    }

    setStatus('pending');
    setMessage('');

    const payload = new FormData();
    payload.set('source', 'Сайт');
    payload.set('formName', 'Сайт — Фото объекта');
    payload.set('pagePath', pathname);
    payload.set('name', form.name.trim());
    payload.set('phone', form.phone.trim());
    payload.set('city', form.city.trim());
    payload.set('service', form.service.trim());
    payload.set('comment', form.comment.trim());

    for (const file of files) {
      payload.append('photos', file);
    }

    try {
      const response = await fetch('/api/leads/photo/', {
        method: 'POST',
        body: payload,
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'Не удалось отправить фото.');
      }

      setStatus('success');
      setMessage(result.message || 'Фото и заявка отправлены менеджеру.');
      setForm({
        name: '',
        phone: '',
        city: '',
        service: '',
        comment: '',
      });
      setFiles([]);
      const fileInput = document.getElementById('photo-lead-files') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Не удалось отправить фото. Попробуйте ещё раз.',
      );
    }
  };

  return (
    <section id="photo-lead-form" className="mx-auto mt-10 max-w-[1180px] scroll-mt-28 px-4 md:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/25 bg-white/38 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8 lg:p-10">
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-red-700">Фото объекта</p>
            <h2 className="mt-3 max-w-[760px] bg-gradient-to-r from-[var(--brand-graphite)] via-[#283244] to-[#9c6444] bg-clip-text text-[32px] font-semibold leading-[1.04] tracking-[-0.03em] text-transparent md:text-[40px] lg:text-[48px]">
              Отправить фото менеджеру
            </h2>
            <p className="mt-5 max-w-[760px] text-[18px] leading-8 text-[var(--brand-graphite)]/68">
              Прикрепите фото кровли, потолка, балкона, террасы или проблемного узла. Мы создадим заявку в amoCRM, посмотрим объект и подскажем следующий шаг.
            </p>

            <div className="mt-6 rounded-[24px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <p className="text-[20px] font-semibold leading-7 text-[var(--brand-graphite)]">
                Что лучше приложить
              </p>
              <div className="mt-5 space-y-3 text-[17px] leading-8 text-[var(--brand-graphite)]/72">
                <p>— общий вид объекта</p>
                <p>— проблемную зону крупно</p>
                <p>— примыкания, швы, протечки или повреждения</p>
                <p>— 2–6 фото, до 8 МБ каждое</p>
              </div>
            </div>
          </div>

          <form className="rounded-[28px] border border-white/20 bg-white/32 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="photo-lead-name" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Имя
                </label>
                <input
                  id="photo-lead-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder="Как к вам обращаться"
                  required
                />
              </div>

              <div>
                <label htmlFor="photo-lead-phone" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Телефон
                </label>
                <input
                  id="photo-lead-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>

              <div>
                <label htmlFor="photo-lead-city" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Город
                </label>
                <select
                  id="photo-lead-city"
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
                <label htmlFor="photo-lead-service" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                  Услуга
                </label>
                <select
                  id="photo-lead-service"
                  value={form.service}
                  onChange={handleChange('service')}
                  className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition focus:border-red-300 focus:bg-white"
                  required
                >
                  <option value="">Выберите услугу</option>
                  {SERVICE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="photo-lead-comment" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                Комментарий
              </label>
              <textarea
                id="photo-lead-comment"
                value={form.comment}
                onChange={handleChange('comment')}
                className="min-h-[112px] w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[16px] text-[var(--brand-graphite)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-red-300 focus:bg-white"
                placeholder="Например: протечка после дождя, нужно понять ремонт или гидроизоляция"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="photo-lead-files" className="mb-2 block text-sm font-semibold text-[var(--brand-graphite)]/78">
                Фото объекта
              </label>
              <input
                id="photo-lead-files"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="w-full rounded-[16px] border border-white/25 bg-white/70 px-4 py-3 text-[15px] text-[var(--brand-graphite)] outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700 focus:border-red-300 focus:bg-white"
                required
              />
              <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                {selectedFilesLabel}
              </p>
            </div>

            <button
              type="submit"
              disabled={status === 'pending'}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'pending' ? 'Отправляем фото...' : 'Отправить фото менеджеру'}
            </button>

            {message ? (
              <p className={`mt-4 text-sm leading-6 ${status === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
