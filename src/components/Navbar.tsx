'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import Button from './Button';
import { LogoMark } from './home/Icons';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-[#faf6ef]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-5 py-3.5 md:px-10">
        <Link href="/" className="flex items-center gap-2 font-serif text-[32px] font-semibold text-ink">
          <LogoMark className="h-8 w-8" />
          Knovate
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={`relative py-1 text-[14px] font-medium hover:text-ink ${pathname.startsWith(n.href) ? 'text-gold-dark after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded after:bg-gold' : 'text-ink/75'}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/contact" className="px-6 py-3 text-[16px]">Enroll now</Button>
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
