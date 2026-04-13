import { cn } from '@/shared/lib/cn';

type BaseProps = {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
};

export function InputField({ label, name, placeholder, className }: BaseProps) {
  return (
    <label className={cn('flex flex-col gap-2 text-sm font-medium text-[var(--brand-graphite)]', className)}>
      <span>{label}</span>
      <input className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[var(--brand-red)]" name={name} placeholder={placeholder} />
    </label>
  );
}

export function TextareaField({ label, name, placeholder, className }: BaseProps) {
  return (
    <label className={cn('flex flex-col gap-2 text-sm font-medium text-[var(--brand-graphite)]', className)}>
      <span>{label}</span>
      <textarea className="min-h-[120px] rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-[var(--brand-red)]" name={name} placeholder={placeholder} />
    </label>
  );
}

export function SelectField({ label, name, options, className }: BaseProps & { options: string[] }) {
  return (
    <label className={cn('flex flex-col gap-2 text-sm font-medium text-[var(--brand-graphite)]', className)}>
      <span>{label}</span>
      <select className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[var(--brand-red)]" name={name} defaultValue="">
        <option value="" disabled>
          Выберите вариант
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
