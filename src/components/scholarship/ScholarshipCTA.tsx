import Link from 'next/link';
import { slabs, testFormat } from '@/data/scholarship';

/**
 * A strip pointing at the scholarship from elsewhere on the site.
 *
 * `courseId` prefills the picker on the apply page. It is only a hint — if that
 * course has no open programme the form falls back to an ordinary choice, so a
 * stale link never dead-ends.
 */
export default function ScholarshipCTA({
  courseId,
  courseName,
}: {
  courseId?: string;
  courseName?: string;
}) {
  const href = courseId ? `/scholarship/apply?course=${encodeURIComponent(courseId)}` : '/scholarship';

  return (
    <div className="mx-auto max-w-content px-5">
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-gold/40 bg-gold/[0.07] p-7 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">Scholarship</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">
            Pay less for {courseName ?? 'your course'} — up to {slabs[0].awardPercent}% less
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            One {testFormat.durationMinutes}-minute test of aptitude and coding decides it. Free to
            apply, no documents, and you get your result the same day.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-2.5 font-semibold text-white transition-colors hover:bg-gold-dark"
          >
            Take the test
          </Link>
          <Link
            href="/scholarship"
            className="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-white px-5 py-2.5 font-semibold text-ink transition-colors hover:bg-sand"
          >
            How it works
          </Link>
        </div>
      </div>
    </div>
  );
}
