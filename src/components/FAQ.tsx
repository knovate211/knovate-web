'use client';
import { useState } from 'react';

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {items.map((f, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-ink">{f.q}</span>
            <span className="text-gold-dark text-xl">{open === i ? '–' : '+'}</span>
          </button>
          {open === i && <p className="px-6 pb-5 text-sm text-muted">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
