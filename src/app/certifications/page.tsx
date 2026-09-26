import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import CTASection from '@/components/CTASection';
import { getCertificationConfig, type CertificationExam } from '@/lib/api';

export const metadata: Metadata = pageMeta({
  title: 'Online Certification Exams for Developers',
  description:
    'Prove your skills with a proctored online certification exam. Sit it from home, get your result immediately, and earn a certificate employers can verify.',
  path: '/certifications',
});

// The catalogue is read at request time: an exam disappears from sale the
// moment staff pause it or its paper goes back to draft.
export const dynamic = 'force-dynamic';

async function loadExams(): Promise<{ exams: CertificationExam[]; reachable: boolean }> {
  try {
    const cfg = await getCertificationConfig();
    return { exams: cfg.exams, reachable: true };
  } catch {
    // A backend that is down must not render an empty catalogue that reads as
    // "we sell nothing" — the page says so instead.
    return { exams: [], reachable: false };
  }
}

export default async function CertificationsPage() {
  const { exams, reachable } = await loadExams();

  return (
    <>
      <Section className="bg-gradient-to-b from-sand to-cream !pb-10">
        <Eyebrow>Certification</Eyebrow>
        <Heading as="h1">Prove what you can do</Heading>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          A proctored online exam, marked the moment you finish. Pass, and your certificate is
          issued straight away — with a link an employer can check for themselves.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <span>✓ Sit it from home, any time within 30 days</span>
          <span>✓ Instant result</span>
          <span>✓ Verifiable credential</span>
        </div>
      </Section>

      <Section className="!pt-4">
        {!reachable ? (
          <p className="rounded-xl border border-ink/10 bg-white p-8 text-center text-muted">
            We could not load the exam list just now. Please refresh, or{' '}
            <Link href="/contact" className="font-semibold text-gold-dark">contact us</Link> and we
            will register you directly.
          </p>
        ) : exams.length === 0 ? (
          <p className="rounded-xl border border-ink/10 bg-white p-8 text-center text-muted">
            No exams are open for registration right now.{' '}
            <Link href="/contact" className="font-semibold text-gold-dark">Ask us</Link> when the
            next one opens.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((e) => (
              <Link key={e.slug} href={`/certifications/${e.slug}`}
                    className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-lg">
                <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-gold-dark">{e.title}</h2>
                {e.summary && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{e.summary}</p>}
                <dl className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-muted">Duration</dt>
                  <dd className="text-right text-ink">{e.durationMinutes} min</dd>
                  <dt className="text-muted">Pass mark</dt>
                  <dd className="text-right text-ink">{e.passPercent}%</dd>
                  <dt className="text-muted">Fee</dt>
                  <dd className="text-right font-semibold text-ink">₹{e.priceRupees.toLocaleString('en-IN')}</dd>
                </dl>
                <span className="mt-5 text-sm font-semibold text-gold-dark">View exam →</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-ink/10 bg-sand/50 p-6 text-center">
          <p className="text-sm text-muted">
            Hiring someone who holds a Knovate certificate?{' '}
            <Link href="/verify" className="font-semibold text-gold-dark">Verify a credential</Link>.
          </p>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
