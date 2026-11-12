import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import Section, { Heading } from '@/components/Section';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import ExamGrid from '@/components/certification/ExamGrid';
import VerifyLookup from '@/components/certification/VerifyLookup';
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

const Check = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8f68" strokeWidth="2.2"><path d="M5 12l5 5L20 7" /></svg>
);

const faqs = [
  { q: 'Do I need to take the course first?', a: 'No. Anyone can register. The course syllabus on each exam page shows what the exam covers.' },
  { q: 'What if my exam link does not arrive?', a: 'Check your spam folder, then contact us and we will resend it. Your paid attempt is never lost.' },
  { q: 'How does an employer check my certificate?', a: 'Every certificate has a credential ID and a public page on knovate.com that confirms it is genuine.' },
];

export default async function CertificationsPage() {
  const { exams, reachable } = await loadExams();
  // The link validity is set per exam; quote it when every open exam agrees.
  const days = new Set(exams.map((e) => e.linkValidDays));
  const validFor = days.size === 1 ? `within ${[...days][0]} days` : 'within the validity of your link';

  const steps = [
    { t: 'Register and pay', d: 'Pick an exam and pay securely through Cashfree. One fee, one attempt.' },
    { t: 'Get your exam link', d: 'It arrives by email within a minute. No account or password needed.' },
    { t: 'Sit it when you are ready', d: `Any time ${validFor}, in one sitting, fullscreen and proctored.` },
    { t: 'Pass, get certified', d: 'Your certificate is issued instantly, with a link to share on LinkedIn or your CV.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-14 px-6 pb-20 pt-16 md:pt-20">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-terracotta">Knovate certification</p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-ink md:text-[56px]">
              Prove what you can do — with a certificate employers can check.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Sit one proctored online exam from home. It is marked the moment you finish, and if you
              pass, your certificate is issued instantly with its own verification link.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href="#exams" className="rounded-lg bg-ink px-6 py-3.5 font-semibold text-cream hover:bg-ink/90">Browse exams</a>
              <a href="#verify" className="rounded-lg border border-ink/30 px-6 py-3.5 font-semibold text-ink hover:border-ink/60">Verify a certificate</a>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink/80">
              <span className="flex items-center gap-2"><Check />Sit it any time {validFor}</span>
              <span className="flex items-center gap-2"><Check />Result in seconds</span>
              <span className="flex items-center gap-2"><Check />Public verification link</span>
            </div>
          </div>

          {/* Sample certificate */}
          <div className="flex min-w-0 flex-[1_1_360px] justify-center" aria-hidden="true">
            <div className="w-full max-w-[440px] -rotate-[1.5deg] rounded-2xl border border-ink/10 bg-[#fffdf9] p-3 shadow-[0_24px_48px_-24px_rgba(43,38,32,.35)]">
              <div className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-gold/40 px-7 py-8 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Certificate of achievement</p>
                <p className="font-serif text-3xl font-semibold text-ink">Your name here</p>
                <p className="text-sm text-muted">has passed the Knovate certification exam in</p>
                <p className="font-serif text-[22px] text-[#8a5212]">{exams[0]?.title ?? 'Your chosen track'}</p>
                <div className="mt-1.5 flex justify-between border-t border-ink/10 pt-3.5 text-left text-xs text-muted">
                  <span>Credential ID<br /><b className="font-mono text-ink">KNV-XXXX-XXXX</b></span>
                  <span className="text-right">Issued<br /><b className="text-ink">Instantly</b></span>
                </div>
                <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-sage/20 px-3 py-1.5 text-xs font-semibold text-[#35552f]">
                  ✓ Verified on knovate.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section className="!pb-4">
        <Heading>How it works</Heading>
        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="flex flex-col gap-2.5 rounded-xl border border-ink/10 bg-white p-6">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold ${i === 3 ? 'bg-sage text-white' : 'bg-ink text-cream'}`}>{i + 1}</span>
              <h3 className="text-[17px] font-semibold text-ink">{s.t}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Exams */}
      <Section id="exams" className="!pb-4">
        <Heading>Choose your exam</Heading>
        <p className="mb-6 mt-1.5 text-muted">Each exam maps to a Knovate course syllabus.</p>
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
          <ExamGrid exams={exams} />
        )}
      </Section>

      {/* Before you register */}
      <Section className="!pb-4">
        <div className="flex flex-wrap gap-10 rounded-[18px] bg-ink p-8 text-cream md:p-10">
          <div className="min-w-0 flex-[1_1_300px]">
            <h2 className="font-serif text-3xl font-semibold">Before you register</h2>
            <p className="mt-3 text-[#d9cfbd]">So nothing on exam day is a surprise.</p>
          </div>
          <ul className="grid min-w-0 flex-[2_1_480px] gap-5 sm:grid-cols-2">
            {[
              'One sitting — the timer does not pause once you start.',
              'Laptop or desktop, with a recent Chrome, Edge or Firefox.',
              'Fullscreen and monitored — leaving the tab is recorded.',
              'Did not pass? You can resit after a short waiting period.',
            ].map((t) => (
              <li key={t} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2 h-2 w-2 flex-none rounded-full bg-gold" />{t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!pb-4">
        <Heading className="mx-auto max-w-3xl">Questions</Heading>
        <div className="mt-6"><FAQ items={faqs} /></div>
      </Section>

      {/* Employer verification */}
      <Section id="verify">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-ink/10 bg-white p-7 md:px-8">
          <div className="min-w-0 flex-[1_1_320px]">
            <h2 className="text-xl font-semibold text-ink">Hiring someone with a Knovate certificate?</h2>
            <p className="mt-1.5 text-muted">Enter the credential ID printed on it to confirm it is genuine.</p>
          </div>
          <div className="min-w-0 flex-[1_1_360px]"><VerifyLookup className="" /></div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
