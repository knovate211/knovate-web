import { steps } from '@/data/scholarship';

// Numbered because this genuinely is a sequence — the order is what the reader
// needs, and each step gates the next.
export default function HowItWorks() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl border border-ink/10 bg-white p-6">
          <span className="font-serif text-sm font-bold text-gold-dark">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
