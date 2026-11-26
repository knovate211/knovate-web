import Link from 'next/link';
import { Heading } from '@/components/Section';
import { plans } from '@/data/pricing';

// "Choose your plan" on a program page: the site-wide plans, with the
// Program plan linking to this program's enrol page. The fee itself is not shown.
export default function ProgramPlans({ slug, fee }: { slug: string; fee?: number }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-content px-5">
        <Heading className="text-center">
          Choose your <span className="text-gold-dark">plan</span>
        </Heading>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => {
            const isProgram = p.key === 'course';
            const href = isProgram ? (fee ? `/enroll?course=${slug}` : '/contact') : p.href;
            const cta = isProgram && !fee ? 'Talk to an advisor' : p.cta;
            return (
              <div
                key={p.key}
                className={`flex flex-col rounded-2xl p-7 ${
                  p.highlighted ? 'bg-white shadow-[0_12px_40px_rgba(60,40,10,0.12)] ring-2 ring-gold' : 'border border-ink/10 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-semibold text-ink">{p.name}</h3>
                  {p.highlighted && <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
                </div>
                <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                {/* Program fees are not shown on program pages; the price is on /enroll. */}
                {!isProgram && (
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-ink">{p.from}</span>
                    <span className="text-sm text-muted">{p.period}</span>
                  </div>
                )}
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink/90">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5"><span className="text-gold-dark">✓</span>{f}</li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`mt-7 inline-flex justify-center rounded-lg px-5 py-3 font-semibold transition-colors ${
                    p.highlighted ? 'bg-gold text-white hover:bg-gold-dark' : 'border border-ink/15 text-ink hover:bg-sand'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
