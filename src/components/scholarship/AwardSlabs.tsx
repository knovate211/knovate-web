import { slabs, testFormat } from '@/data/scholarship';

// The slabs are the offer, so they get the most visual weight on the page.
// Marks are shown alongside the percentage because "80%" is abstract until you
// know the paper is out of 100.
export default function AwardSlabs() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {slabs.map((s, i) => (
        <div
          key={s.minPercent}
          className={`flex flex-col rounded-2xl border p-7 ${
            i === 0 ? 'border-gold bg-white shadow-xl ring-1 ring-gold' : 'border-ink/10 bg-white'
          }`}
        >
          {i === 0 && (
            <span className="mb-3 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold-dark">
              Top band
            </span>
          )}
          <div className="font-serif text-5xl font-semibold text-ink">
            {s.awardPercent}
            <span className="text-2xl">%</span>
          </div>
          <div className="mt-1 font-semibold text-ink">{s.label}</div>
          <p className="mt-3 text-sm text-muted">
            Score <strong className="text-ink">{s.minPercent}%</strong> or above
            <span className="text-muted"> — that is {Math.ceil((s.minPercent / 100) * testFormat.totalMarks)} marks out of {testFormat.totalMarks}.</span>
          </p>
        </div>
      ))}
    </div>
  );
}
