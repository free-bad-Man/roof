import { cn } from '@/shared/lib/cn';
import type { ReactNode } from 'react';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(18,23,34,0.04)]', className)}>{children}</div>;
}
