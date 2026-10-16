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

/**
 * A section heading.
 *
 * `as` exists for search engines rather than for looks: a page needs exactly one
 * h1 naming what it is about, and every other heading on it should sit below
 * that. The rendered size is identical either way, so pass as="h1" for the
 * first heading on a page and leave the rest alone.
 */
export function Heading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return <Tag className={`font-serif text-3xl md:text-4xl font-semibold text-ink ${className}`}>{children}</Tag>;
}
