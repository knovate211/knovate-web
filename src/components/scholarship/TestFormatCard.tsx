import { testFormat } from '@/data/scholarship';

// What the candidate is actually walking into. People decide whether to start a
// test from this block, so it states the format plainly rather than selling it.
export default function TestFormatCard() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-8">
      <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-ink/10 pb-6">
        <div>
          <div className="font-serif text-3xl font-semibold text-ink">{testFormat.durationMinutes} min</div>
          <div className="text-sm text-muted">one sitting</div>
        </div>
        <div>
          <div className="font-serif text-3xl font-semibold text-ink">{testFormat.totalMarks}</div>
          <div className="text-sm text-muted">marks total</div>
        </div>
        <div>
          <div className="font-serif text-3xl font-semibold text-ink">{testFormat.attempts}</div>
          <div className="text-sm text-muted">attempt per course</div>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {testFormat.sections.map((s) => (
          <li key={s.title} className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-ink">{s.title}</div>
              <div className="text-sm text-muted">{s.detail}</div>
            </div>
            <div className="shrink-0 rounded-lg bg-sand px-3 py-1 text-sm font-bold text-ink">
              {s.marks} marks
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted">
        Write your code in{' '}
        {testFormat.languages.map((l, i) => (
          <span key={l}>
            <strong className="font-semibold text-ink">{l}</strong>
            {i < testFormat.languages.length - 2 ? ', ' : i === testFormat.languages.length - 2 ? ' or ' : ''}
          </span>
        ))}
        . It runs against real test cases the moment you hit submit — no waiting on a reviewer.
      </p>
    </div>
  );
}
