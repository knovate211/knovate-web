import type { ReactNode } from 'react';

export const SUPPORT_EMAIL = 'support@knovate.com';

// Company details shown on the Terms and Privacy Policy pages. Indian consumer and IT rules expect the
// Grievance Officer's name and the registered office on this page, so fill these
// in before launch. Until then the officer's name and the office line are hidden
// rather than shown as placeholders.
export const LEGAL = {
  grievanceOfficer: '', // e.g. 'Asha Rao'
  entityName: '', // e.g. 'Knovate Learning Private Limited'
  address: '',
  gstin: '',
};


export function Mail({ address = SUPPORT_EMAIL }: { address?: string }) {
  return (
    <a href={`mailto:${address}`} className="font-medium text-terracotta underline underline-offset-2 hover:text-ink">
      {address}
    </a>
  );
}

export function Block({ n, title, children }: { n: number | string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink/10 pt-8">
      <h2 className="font-serif text-2xl font-semibold text-ink">
        {n}. {title}
      </h2>
      <div className="mt-4 space-y-4 text-ink/90">{children}</div>
    </section>
  );
}

export function SubBlock({ n, title, children }: { n?: string; title: string; children: ReactNode }) {
  return (
    <div className="pt-2">
      <h3 className="font-serif text-lg font-semibold text-ink">
        {n ? `${n} ${title}` : title}
      </h3>
      <div className="mt-2 space-y-4">{children}</div>
    </div>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-gold-dark">{children}</ul>;
}

export function Term({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li>
      <span className="font-semibold text-ink">{label}:</span> {children}
    </li>
  );
}

export function Para({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p>
      <span className="font-semibold text-ink">{label}.</span> {children}
    </p>
  );
}
