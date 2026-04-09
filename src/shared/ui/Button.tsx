import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
};

const styles = {
  primary: 'bg-[var(--brand-red)] text-white hover:bg-[var(--brand-red-dark)]',
  secondary:
    'border border-[var(--brand-graphite)] bg-white text-[var(--brand-graphite)] hover:bg-[var(--brand-bg)]',
  ghost: 'text-[var(--brand-graphite)] hover:bg-white',
};

export function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  fullWidth,
  className,
  disabled = false,
}: Props) {
  const base = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors',
    styles[variant],
    fullWidth && 'w-full',
    disabled && 'cursor-not-allowed opacity-60',
    className,
  );

  if (href) {
    return (
      <Link className={base} href={href} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
