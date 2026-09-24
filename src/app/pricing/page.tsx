import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import Button from '@/components/Button';
import FAQ from '@/components/FAQ';
import { plans, faqs, pricedCourses, inr } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Course fees for Knovate: Development courses from ₹8,999, Marketing and Software Testing from ₹5,999. Self-Paced and Mentor-Led plans, plus Career Track bundles.',
};

export default function PricingPage() {
  const groups = pricedCourses();

  return (
    <>
      <Section className="bg-sand/50 text-center !pb-10">
        <Eyebrow>Pricing</Eyebrow>
        <Heading>Simple fees, priced by course</Heading>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Every course comes as Self-Paced or Mentor-Led. One-time fee, no hidden charges — and a scholarship test can
          bring it down further.
        </p>
      </Section>

      {/* Plans */}
      <Section className="!pt-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.key}
              className={`flex flex-col rounded-2xl border p-8 ${p.highlighted ? 'border-gold bg-white shadow-xl ring-1 ring-gold' : 'border-ink/10 bg-white'}`}
            >
              {p.highlighted && (
                <span className="mb-3 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold-dark">Most popular</span>
              )}
              <h3 className="font-serif text-2xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <div className="mt-5">
                <span className="font-serif text-4xl font-bold text-ink">{p.from}</span>
                <span className="ml-2 text-sm text-muted">{p.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/90">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-gold-dark">✓</span>{f}</li>
                ))}
              </ul>
              <Button
                href={p.key === 'career' ? '/contact' : `/enroll?plan=${p.key}`}
                variant={p.highlighted ? 'primary' : 'outline'}
                className="mt-8 w-full"
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Fees per course */}
      <Section className="!pt-2" id="fees">
        <div className="mb-8 text-center">
          <Eyebrow>Course fees</Eyebrow>
          <Heading>What each course costs</Heading>
        </div>

        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g.key} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/10 bg-sand/40 px-6 py-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{g.name}</h3>
                  <p className="text-sm text-muted">{g.blurb}</p>
                </div>
              </div>

              {/* Desktop table */}
              <table className="hidden w-full table-fixed text-left md:table">
                {/* Fixed widths so the price columns line up across every group. */}
                <colgroup>
                  <col className="w-[38%]" />
                  <col className="w-[14%]" />
                  <col className="w-[16%]" />
                  <col className="w-[16%]" />
                  <col className="w-[16%]" />
                </colgroup>
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-muted">
                    <th className="px-6 py-3 font-semibold">Course</th>
                    <th className="px-6 py-3 font-semibold">Duration</th>
                    <th className="px-6 py-3 font-semibold">Self-Paced</th>
                    <th className="px-6 py-3 font-semibold">Mentor-Led</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {g.courses.map((c) => (
                    <tr key={c.id} id={c.slug} className="border-t border-ink/5">
                      <td className="px-6 py-4">
                        <Link href={`/courses/${c.slug}`} className="font-semibold text-ink hover:text-gold-dark">{c.title}</Link>
                        <div className="text-xs text-muted">{c.level}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{c.duration}</td>
                      <td className="px-6 py-4 font-semibold text-ink">{inr(g.selfPaced)}</td>
                      <td className="px-6 py-4 font-semibold text-gold-dark">{inr(g.mentorLed)}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/enroll?course=${c.slug}`} className="inline-flex rounded-lg bg-gold px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-gold-dark">Enroll</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile cards */}
              <ul className="divide-y divide-ink/5 md:hidden">
                {g.courses.map((c) => (
                  <li key={c.id} className="px-5 py-4">
                    <Link href={`/courses/${c.slug}`} className="font-semibold text-ink">{c.title}</Link>
                    <div className="text-xs text-muted">{c.level} · {c.duration}</div>
                    <Link href={`/enroll?course=${c.slug}`} className="mt-3 inline-flex rounded-lg bg-gold px-3.5 py-1.5 text-sm font-semibold text-white">Enroll</Link>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-sand/50 px-3 py-2">
                        <div className="text-xs text-muted">Self-Paced</div>
                        <div className="font-semibold text-ink">{inr(g.selfPaced)}</div>
                      </div>
                      <div className="rounded-lg bg-gold/10 px-3 py-2">
                        <div className="text-xs text-muted">Mentor-Led</div>
                        <div className="font-semibold text-gold-dark">{inr(g.mentorLed)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold/40 bg-gold/5 p-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-serif text-xl font-semibold text-ink">Bring your fee down with a scholarship</h3>
            <p className="mt-1 text-sm text-muted">A free 60-minute test for your course. Score well and part of the course fee is covered.</p>
          </div>
          <Button href="/scholarship" className="shrink-0">Take the scholarship test</Button>
        </div>
      </Section>

      <Section className="bg-sand/50">
        <div className="mb-10 text-center"><Eyebrow>FAQ</Eyebrow><Heading>Questions, answered</Heading></div>
        <FAQ items={faqs} />
      </Section>
    </>
  );
}
