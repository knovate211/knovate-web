import { partnerRows } from '@/data/partners';

// Two rows of partner logos scrolling endlessly in opposite directions: logos
// leave one edge and re-enter from the other. Each row is rendered twice back
// to back and slid by -50% (see .marquee-track in globals.css); its duration
// scales with its length so both rows move at the same speed. Hovering pauses
// a row; users who prefer reduced motion get static rows.
const SECONDS_PER_LOGO = 3;
export default function PartnerMarquee() {
  return (
    <div
      className="space-y-5 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      {partnerRows.map((row, r) => (
        <div
          key={r}
          className={`marquee-track flex w-max gap-6 pr-6 ${r % 2 ? 'marquee-reverse' : ''}`}
          style={{ '--marquee-duration': `${row.length * SECONDS_PER_LOGO}s` } as React.CSSProperties}
        >
          {[...row, ...row].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              aria-hidden={i >= row.length}
              className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl bg-white px-4 shadow-[0_4px_20px_rgba(60,40,10,0.05)] md:h-24 md:w-52"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={i < row.length ? p.name : ''}
                className={`${p.h ?? 'h-10'} w-auto max-w-[80%] object-contain`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
