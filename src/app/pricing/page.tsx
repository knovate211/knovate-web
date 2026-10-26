import type { Metadata } from 'next';
import { pageMeta, faqLd } from '@/lib/seo';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import Button from '@/components/Button';
import FAQ from '@/components/FAQ';
import { plans, faqs, pricedCourses, inr, courseFee, maxScholarship, scholarshipPrices } from '@/data/pricing';

export const metadata: Metadata = pageMeta({
  title: 'Course Fees, Scholarships & EMI Options',
  description:
    `Every Knovate course is ${inr(courseFee)}, one-time, with live classes, projects and placement help included. A scholarship test can take up to ${maxScholarship}% off.`,
  path: '/pricing',
});

export default function PricingPage() {
  const groups = pricedCourses();

  return (
    <>
      {/* The same questions the page renders below — kept in one place so the
          markup cannot promise an answer the page does not show. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }} />
      <Section className="bg-sand/50 text-center !pb-10">
        <Eyebrow>Pricing</Eyebrow>
        <Heading as="h1">One simple fee for every course</Heading>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          {inr(courseFee)} per course, paid once, with everything included. No hidden charges, and a scholarship test can
          take up to {maxScholarship}% off.
        </p>
      </Section>

      {/* The fee, and what a scholarship brings it down to */}
      <Section className="!pt-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm text-muted">Every course · Knovate</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Course fee</p>
              <p className="font-serif text-4xl font-bold text-ink">{inr(courseFee)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted">Scholarship</p>
              <p className="font-serif text-3xl font-bold text-green-700">Up to {maxScholarship}%</p>
            </div>
          </div>
          <div className="mt-6 border-t border-ink/10 pt-5">
            <p className="text-sm text-muted">What you pay after a scholarship</p>
            <ul className="mt-3 divide-y divide-ink/5">
              {scholarshipPrices.map((p) => (
                <li key={p.awardPercent} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-ink">
                    {p.awardPercent}% scholarship
                    <span className="ml-2 text-sm text-muted">score {p.minPercent}%+ on the test</span>
                  </span>
                  <span className="font-serif text-xl font-bold text-ink">{inr(p.pays)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/enroll" className="flex-1">Enroll for {inr(courseFee)}</Button>
            <Button href="/scholarship" variant="outline" className="flex-1">Take the scholarship test</Button>
          </div>
        </div>
      </Section>

      {/* Plans */}
      <Section className="!pt-2">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.key}
              className={`flex flex-col rounded-2xl border p-8 ${p.highlighted ? 'border-gold bg-white shadow-xl ring-1 ring-gold' : 'border-ink/10 bg-white'}`}
            >
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
              <Button href={p.href} variant={p.highlighted ? 'primary' : 'outline'} className="mt-8 w-full">
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
          <Heading>Every course, same fee</Heading>
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
                  <col className="w-[46%]" />
                  <col className="w-[18%]" />
                  <col className="w-[18%]" />
                  <col className="w-[18%]" />
                </colgroup>
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-muted">
                    <th className="px-6 py-3 font-semibold">Course</th>
                    <th className="px-6 py-3 font-semibold">Duration</th>
                    <th className="px-6 py-3 font-semibold">Fee</th>
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
                      <td className="px-6 py-4 font-semibold text-ink">{inr(courseFee)}</td>
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
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-semibold text-ink">{inr(courseFee)}</span>
                      <Link href={`/enroll?course=${c.slug}`} className="inline-flex rounded-lg bg-gold px-3.5 py-1.5 text-sm font-semibold text-white">Enroll</Link>
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
            <p className="mt-1 text-sm text-muted">A free 60-minute test for your course. Score well and up to {maxScholarship}% of the fee is covered.</p>
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
