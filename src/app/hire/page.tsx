import type { Metadata } from 'next';
import CompanyEnquiryForm from '@/components/CompanyEnquiryForm';
import FAQ from '@/components/FAQ';
import {
  ArrowRight, BlocksIcon, BriefcaseIcon, CertIcon, CodeIcon, DatabaseIcon, GrowthIcon, LaptopIcon, UsersIcon,
} from '@/components/home/Icons';

export const metadata: Metadata = {
  title: 'Hiring tests for companies',
  description:
    'Screen candidates with proctored coding and aptitude tests. Auto-graded code in Python, Java, JavaScript, C++, Go and SQL, with candidate reports and shortlists.',
};

// Every item here describes something the platform does today. Keep it that
// way: a company that signs up on a claim we can't back loses trust in the scores.
const features = [
  { t: 'Coding questions, auto-graded', d: 'Candidates write code in Python, Java, JavaScript, C++, Go or SQL. It runs against hidden test cases in a sandbox, and partial solutions earn partial marks.', Icon: CodeIcon },
  { t: 'Aptitude and MCQ sections', d: 'Single-answer, multiple-answer and numeric questions, plus written answers your team grades by hand.', Icon: BlocksIcon },
  { t: 'A different paper per candidate', d: 'Draw questions at random from a bank by topic and difficulty, and shuffle questions and options, so answers are harder to share.', Icon: DatabaseIcon },
  { t: 'Proctoring built in', d: 'Full-screen mode, tab-switch limits, copy-paste blocking and webcam checks. Each candidate gets an integrity score and an event timeline.', Icon: LaptopIcon },
  { t: 'Fair, reliable test sessions', d: 'The timer runs on our server. Answers autosave, and a candidate who loses their connection can resume where they left off.', Icon: CertIcon },
  { t: 'Reports and shortlists', d: 'See each candidate’s answers, score by section and time per question. Export results to CSV and build shortlists for interviews.', Icon: GrowthIcon },
];

const steps = [
  { t: 'Tell us what you’re hiring for', d: 'Fill in the form. We set up your company account and recruiter logins.' },
  { t: 'Build your test', d: 'Pick coding problems and MCQs from our library or add your own. Set the duration, cutoffs and proctoring rules.' },
  { t: 'Invite candidates', d: 'Share private test links. Candidates take the test in their browser, with nothing to install.' },
  { t: 'Review and shortlist', d: 'MCQ and coding scores are ready as soon as each test ends. Compare candidates, check integrity flags and export the shortlist.' },
];

const faqs = [
  { q: 'Which languages can candidates code in?', a: 'Python, JavaScript, Java, C++ and Go for programming problems, and PostgreSQL for SQL problems.' },
  { q: 'How are coding answers scored?', a: 'Each submission runs against the problem’s hidden test cases in an isolated sandbox. Marks are proportional to the number of cases passed, and the candidate’s best submission counts.' },
  { q: 'Can we use our own questions?', a: 'Yes. Your recruiters can add MCQs to your company’s own question bank, and our team can add private coding problems that only your tests use.' },
  { q: 'How do you stop cheating?', a: 'Tests can require full screen, limit tab switches, block copy and paste and check the webcam. Every event is logged with a timestamp, and each attempt gets an integrity score for your team to review.' },
  { q: 'Do candidates need to install anything?', a: 'No. Tests run in a normal web browser. Candidates open the private link you send them and sign in to start.' },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">{children}</p>
);

export default function HirePage() {
  return (
    <div className="bg-[#faf6ef]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f7efe2] to-[#faf6ef]">
        <div className="mx-auto grid max-w-[1140px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Knovate for companies</Eyebrow>
            <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-[52px]">
              Hire developers on proof, not résumés.
            </h1>
            <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-muted">
              Send candidates a proctored coding and aptitude test. We grade the code automatically, flag suspicious
              behaviour and give you a ranked list to interview from.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#demo" className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-gold-dark">
                Request a demo <ArrowRight />
              </a>
              <a href="#how" className="inline-flex items-center rounded-lg border border-ink/10 bg-white px-5 py-2.5 text-[14px] font-medium text-ink hover:bg-sand">
                How it works
              </a>
            </div>
          </div>

          {/* A stylised candidate report, to show what recruiters get back. */}
          <div aria-hidden className="rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_12px_40px_rgba(60,40,10,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Candidate report</p>
                <p className="mt-1 font-serif text-lg font-semibold text-ink">Backend Developer · Round 1</p>
              </div>
              <span className="rounded-full bg-sage/20 px-3 py-1 text-[12px] font-semibold text-[#4d6b4a]">Passed</span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { s: 'Aptitude (MCQ)', v: 34, m: 40 },
                { s: 'Coding: 2 problems', v: 48, m: 60 },
              ].map((r) => (
                <div key={r.s}>
                  <div className="flex justify-between text-[13px]"><span className="text-ink">{r.s}</span><span className="font-semibold text-ink">{r.v}/{r.m}</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-sand"><div className="h-2 rounded-full bg-gold" style={{ width: `${(r.v / r.m) * 100}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/10 pt-4 text-center">
              <div><p className="font-serif text-xl font-bold text-gold-dark">82%</p><p className="text-[11px] text-muted">Score</p></div>
              <div><p className="font-serif text-xl font-bold text-gold-dark">96</p><p className="text-[11px] text-muted">Integrity</p></div>
              <div><p className="font-serif text-xl font-bold text-gold-dark">52m</p><p className="text-[11px] text-muted">Time taken</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1140px] space-y-14 px-5 py-10">
        {/* Features */}
        <section>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="font-serif text-[28px] font-bold text-ink">Everything you need to screen technical candidates</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ t, d, Icon }) => (
              <div key={t} className="rounded-xl border border-ink/5 bg-white p-6 shadow-[0_4px_20px_rgba(60,40,10,0.05)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6e6cf] text-gold-dark"><Icon width={22} height={22} /></span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-24 rounded-2xl bg-[#f6efe4] p-7 md:p-10">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-serif text-[28px] font-bold text-ink">From sign-up to shortlist</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-serif text-lg font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Use cases */}
        <section className="grid gap-5 md:grid-cols-3">
          {[
            { t: 'Lateral hiring', d: 'Filter applicants before the first interview, so your engineers only interview people who can code.', Icon: BriefcaseIcon },
            { t: 'Campus drives', d: 'Test a whole batch of students in one sitting. Each gets a different paper, with proctoring in every browser.', Icon: UsersIcon },
            { t: 'Hire from Knovate learners', d: 'Test our trained learners directly and hire the people who are ready for the job.', Icon: CertIcon },
          ].map(({ t, d, Icon }) => (
            <div key={t} className="flex gap-4 rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(60,40,10,0.05)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6e6cf] text-gold-dark"><Icon width={20} height={20} /></span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{d}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Enquiry form */}
        <section id="demo" className="scroll-mt-24 grid gap-10 rounded-2xl border border-ink/10 bg-white p-7 shadow-lg md:p-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="font-serif text-[28px] font-bold leading-tight text-ink">Register your company</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Tell us about your hiring. We&apos;ll get back to you, usually within a day, set up your company account and
              help you run your first test.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-ink">
              {['A company account with recruiter logins', 'Your own private question bank', 'Help setting up your first test'].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage/25 text-[12px] text-[#4d6b4a]">✓</span>{x}
                </li>
              ))}
            </ul>
          </div>
          <CompanyEnquiryForm />
        </section>

        {/* FAQ */}
        <section>
          <div className="mb-8 text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-serif text-[28px] font-bold text-ink">Questions from hiring teams</h2>
          </div>
          <FAQ items={faqs} />
        </section>
      </div>
    </div>
  );
}
