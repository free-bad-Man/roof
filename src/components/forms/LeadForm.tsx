import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { InputField, SelectField, TextareaField } from '@/shared/ui/Field';

type LeadFormProps = {
  title: string;
  subtitle: string;
  serviceHiddenValue?: string;
  variant?: 'main' | 'service' | 'inspection';
};

const serviceOptions = [
  'Ремонт кровли',
  'Восстановление кровли',
  'Гидроизоляция кровли',
  'Восстановление мягкой кровли / Sinzatim',
  'Устранение протечек',
  'Натяжные потолки',
];

export function LeadForm({ title, subtitle, serviceHiddenValue, variant = 'main' }: LeadFormProps) {
  return (
    <Card className="p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[var(--brand-graphite)]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">{subtitle}</p>
      </div>
      <form className="grid gap-4 md:grid-cols-2" id="lead-form">
        <InputField label="Имя" name="name" placeholder="Как к вам обращаться" />
        <InputField label="Телефон" name="phone" placeholder="+7 (___) ___-__-__" />

        {variant === 'main' ? <SelectField label="Услуга" name="service" options={serviceOptions} /> : null}
        {variant === 'service' ? <InputField label="Город" name="city" placeholder="Симферополь" /> : null}
        {variant === 'inspection' ? <InputField label="Город" name="city" placeholder="Симферополь" /> : null}

        {serviceHiddenValue ? <input name="service" type="hidden" value={serviceHiddenValue} /> : null}

        {variant === 'main' ? (
          <TextareaField className="md:col-span-2" label="Кратко опишите задачу" name="comment" placeholder="Например: течёт мягкая кровля, нужен осмотр" />
        ) : null}

        {variant === 'service' ? (
          <TextareaField className="md:col-span-2" label="Комментарий" name="comment" placeholder="Опишите задачу в свободной форме" />
        ) : null}

        {variant === 'inspection' ? (
          <TextareaField className="md:col-span-2" label="Что нужно сделать" name="comment" placeholder="Опишите проблему и что беспокоит" />
        ) : null}

        <div className="md:col-span-2">
          <Button fullWidth type="submit">Отправить заявку</Button>
        </div>
      </form>
    </Card>
  );
}
