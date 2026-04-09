'use client';

import { useState } from 'react';
import type { FaqItem } from '@/shared/types/content';

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="rounded-3xl border border-black/10 bg-white p-5">
            <button
              className="flex w-full items-center justify-between gap-4 text-left text-lg font-semibold text-[var(--brand-graphite)]"
              onClick={() => setOpenIndex(open ? null : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span className="text-[var(--brand-red)]">{open ? '−' : '+'}</span>
            </button>
            {open ? <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--brand-muted)]">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
