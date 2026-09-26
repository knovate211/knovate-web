import type { Metadata } from 'next';
import Section, { Eyebrow, Heading } from '@/components/Section';
import Button from '@/components/Button';
import FAQ from '@/components/FAQ';
import AwardSlabs from '@/components/scholarship/AwardSlabs';
import HowItWorks from '@/components/scholarship/HowItWorks';
import TestFormatCard from '@/components/scholarship/TestFormatCard';
import { eligibility, faqs, slabs, testFormat } from '@/data/scholarship';
import { site } from '@/data/site';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Scholarship',
  description: `Earn up to ${slabs[0].awardPercent}% off any Knovate career track. Sit a ${testFormat.durationMinutes}-minute test of aptitude and live coding — free to apply, result the same day.`,
  alternates: { canonical: '/scholarship' },
  openGraph: {
    title: `Knovate Scholarship — up to ${slabs[0].awardPercent}% off your course`,
    description: `A ${testFormat.durationMinutes}-minute test decides it. Free to apply, no documents, result the same day.`,
    url: `${siteUrl}/scholarship`,
  },
};

// Structured data so the programme is eligible for rich results. Kept in step
// with data/scholarship.ts rather than hand-written.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function ScholarshipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero — the offer, then the one thing standing between them and it. */}
      <Section className="bg-sand/50 !pb-12 text-center">
        <Eyebrow>Knovate Scholarship</Eyebrow>
        <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight text-ink md:text-6xl">
          Let your ability decide what you pay
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
          Sit one {testFormat.durationMinutes}-minute test — aptitude, programming fundamentals and
          two coding problems. Score well and up to{' '}
          <strong className="text-ink">{slabs[0].awardPercent}% of your course fee</strong> is
          covered. No documents, no application fee, no income proof.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/scholarship/apply" className="px-7 py-3 text-base">
            Apply for a scholarship
          </Button>
          <Button href="#how" variant="outline" className="px-7 py-3 text-base">
            See how it works
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted">Free to apply · Link emailed instantly · Result the same day</p>
      </Section>

      <Section id="awards" className="!pt-14">
        <div className="mb-10 text-center">
          <Eyebrow>What you can earn</Eyebrow>
          <Heading as="h1">Three bands, decided by your score</Heading>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            The paper is out of {testFormat.totalMarks}. Where you land decides the band — there is
            no interview, no panel and no quota.
          </p>
        </div>
        <AwardSlabs />
      </Section>

      <Section id="how" className="bg-sand/40">
        <div className="mb-10 text-center">
          <Eyebrow>How it works</Eyebrow>
          <Heading>Applied to enrolled, in one afternoon</Heading>
        </div>
        <HowItWorks />
      </Section>

      <Section id="format">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>The test</Eyebrow>
            <Heading>Exactly what you will be asked</Heading>
            <p className="mt-4 leading-relaxed text-muted">
              It is the same testing platform our placement drives run on — a real code editor, real
              test cases, and a clock that runs on our servers rather than in your browser.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              You are applying to <em>learn</em> the subject, so we do not examine you on it. The
              questions cover reasoning, arithmetic and programming basics that any beginner can
              prepare for in an evening.
            </p>
            <div className="mt-7">
              <Button href="/scholarship/apply">Apply now</Button>
            </div>
          </div>
          <TestFormatCard />
        </div>
      </Section>

      <Section className="bg-sand/40">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Who can apply</Eyebrow>
            <Heading>Open to anyone willing to sit the test</Heading>
            <ul className="mt-6 space-y-4">
              {eligibility.map((e) => (
                <li key={e} className="flex gap-3 text-muted">
                  <svg className="mt-1 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8ba888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="leading-relaxed">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Questions</Eyebrow>
            <Heading>Before you start</Heading>
            <div className="mt-6">
              <FAQ items={faqs} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="text-center">
        <Heading>Ready when you are</Heading>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          The form takes a minute. The test takes an hour. Between them sits up to{' '}
          {slabs[0].awardPercent}% of your fee.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/scholarship/apply" className="px-7 py-3 text-base">
            Apply for a scholarship
          </Button>
          <Button href="/courses" variant="outline" className="px-7 py-3 text-base">
            Browse the courses
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Prefer to talk it through first? Call {site.phone} or{' '}
          <a href={`mailto:${site.email}`} className="font-semibold text-gold-dark underline">
            email us
          </a>
          .
        </p>
      </Section>
    </>
  );
}
