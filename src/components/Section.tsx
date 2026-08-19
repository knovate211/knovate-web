import { ReactNode } from 'react';

export default function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-content px-5">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-terracotta">{children}</p>;
}

export function Heading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-serif text-3xl md:text-4xl font-semibold text-ink ${className}`}>{children}</h2>;
}
