'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { CertificationExam } from '@/lib/api';

// Tracks come from the exam's course, so the catalogue needs no new backend field.
const TRACK_BY_COURSE: Record<string, string> = {
  '1': 'Development', '2': 'Development', '3': 'Development', '4': 'Development', '5': 'Development',
  genai: 'Development', 'digital-marketing': 'Marketing', seo: 'Marketing', testing: 'QA & Testing',
};
export const trackOf = (e: CertificationExam) => TRACK_BY_COURSE[e.courseId] ?? 'Other';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
    </div>
  );
}

export default function ExamGrid({ exams }: { exams: CertificationExam[] }) {
  const tracks = useMemo(() => Array.from(new Set(exams.map(trackOf))), [exams]);
  const [track, setTrack] = useState('All');
  const shown = track === 'All' ? exams : exams.filter((e) => trackOf(e) === track);

  return (
    <>
      {tracks.length > 1 && (
        <div role="group" aria-label="Filter by track" className="mb-6 flex flex-wrap gap-2">
          {['All', ...tracks].map((t) => (
            <button key={t} type="button" onClick={() => setTrack(t)} aria-pressed={track === t}
                    className={`min-h-[44px] rounded-full border px-4 text-sm transition-colors ${
                      track === t ? 'border-ink bg-ink font-semibold text-cream' : 'border-ink/20 text-ink hover:border-ink/50'
                    }`}>
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => (
          <article key={e.slug} className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a5212" strokeWidth="2"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" /></svg>
              </div>
              <span className="rounded-full bg-sage/20 px-2.5 py-1 text-xs font-semibold text-[#35552f]">Open for registration</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{trackOf(e)}</p>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">{e.title}</h3>
              {e.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{e.summary}</p>}
            </div>
            <dl className="grid grid-cols-3 gap-2 rounded-xl bg-cream p-3.5 text-sm">
              <Stat label="Duration" value={`${e.durationMinutes} min`} />
              <Stat label="Marks" value={String(e.totalMarks)} />
              <Stat label="Pass mark" value={`${e.passPercent}%`} />
            </dl>
            <div className="mt-auto flex items-center justify-between gap-3">
              <div>
                <span className="text-2xl font-semibold text-ink">₹{e.priceRupees.toLocaleString('en-IN')}</span>
                <span className="text-sm text-muted"> · one attempt</span>
              </div>
              <Link href={`/certifications/${e.slug}`} className="rounded-lg bg-gold px-5 py-3 font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-white">
                Register<span className="sr-only"> for {e.title}</span>
              </Link>
            </div>
          </article>
        ))}

        {track === 'All' && exams.length < 3 && (
          <article className="flex flex-col justify-center gap-3 rounded-2xl border-[1.5px] border-dashed border-ink/20 p-6">
            <h3 className="font-serif text-xl font-semibold text-ink">More exams are on the way</h3>
            <p className="text-sm leading-relaxed text-muted">Tell us which track you want certified next and we will let you know when it opens.</p>
            <Link href="/contact" className="self-start rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-cream hover:bg-ink/90">Tell us</Link>
          </article>
        )}
      </div>
    </>
  );
}
