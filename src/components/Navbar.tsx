'use client';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/data/site';
import Button from './Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4">
        <Link href="/" className="font-serif text-2xl font-bold text-ink">
          Knovate
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-semibold text-muted hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/contact">Enroll now</Button>
        </div>
        <button className="md:hidden text-ink" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 bg-cream md:hidden">
          <div className="mx-auto max-w-content px-5 py-3">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 font-semibold text-muted hover:text-ink">
                {n.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-2 w-full">Enroll now</Button>
          </div>
        </div>
      )}
    </header>
  );
}
