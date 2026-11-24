'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { Testimonial } from '@/data/testimonials';

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  );
}

// Alumni quotes as a swipeable row: one card on phones, two on tablets, three
// on desktop. It advances by itself every few seconds; the arrows scroll by
// one card and touch users can swipe.
const AUTO_MS = 4000;

export default function AlumniCarousel({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const scroll = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    // Wrap around at either end so the arrows never go dead.
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    else el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  // Auto-advance, paused while the visitor is hovering, touching or focused
  // inside the carousel, while the tab is hidden, and never for visitors who
  // ask for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) scroll(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [scroll]);

  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };

  const arrow =
    'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-white shadow-md transition-colors hover:bg-gold-dark md:flex';

  return (
    <div
      className="relative md:px-14"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <button type="button" aria-label="Previous story" onClick={() => scroll(-1)} className={`${arrow} left-0`}>
        <Chevron dir="left" />
      </button>

      <div
        ref={track}
        className="flex snap-x snap-mandatory -my-6 gap-6 overflow-x-auto scroll-smooth py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t) => (
          <figure
            key={t.name}
            className="flex w-[85%] shrink-0 snap-start flex-col items-center rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(60,40,10,0.06)] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
          >
            {t.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.photo} alt={t.name} className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f6e6cf] font-serif text-3xl font-bold text-gold-dark">
                {t.name.charAt(0)}
              </span>
            )}
            <blockquote className="flex flex-1 items-center py-7 text-[17px] italic leading-relaxed text-ink/80">
              <p>
                <span className="font-serif text-2xl font-bold not-italic text-gold">&ldquo;</span>
                {t.quote}
                <span className="font-serif text-2xl font-bold not-italic text-gold">&rdquo;</span>
              </p>
            </blockquote>
            <figcaption className="w-full rounded-lg bg-gold px-4 py-3 text-white">
              <div className="text-lg font-semibold">{t.name}</div>
              <div className="text-sm text-white/90">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <button type="button" aria-label="Next story" onClick={() => scroll(1)} className={`${arrow} right-0`}>
        <Chevron dir="right" />
      </button>
    </div>
  );
}
