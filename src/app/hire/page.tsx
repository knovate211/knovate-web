import type { Metadata } from 'next';
import { pageMeta, faqLd } from '@/lib/seo';
import CompanyEnquiryForm from '@/components/CompanyEnquiryForm';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = pageMeta({
  title: 'Hire Developers: Coding Assessments & Shortlisting',
  description:
    'Screen developers with proctored coding tests, see code playback and integrity reports, and shortlist candidates on evidence rather than CVs.',
  path: '/hire',
});

// Every claim on this page describes something the platform does today. Keep it
// that way: a company that signs up on a claim we can't back loses trust in the scores.

const Check = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6b8f68" strokeWidth="2.2" className="flex-none"><path d="M5 12l5 5L20 7" /></svg>
);

const problems = [
  { p: 'A CV doesn’t show whether someone can code.', a: 'Real code, run against hidden test cases. Partial solutions earn partial marks.' },
  { p: 'Engineers lose hours on first-round interviews.', a: 'Grading is automatic. Your team only meets the candidates on the shortlist.' },
  { p: 'Online tests get shared and gamed.', a: 'A different paper per candidate, proctoring, and an integrity score for every attempt.' },
];

const sample = [
  { r: 1, n: 'Candidate A', apt: '36/40', code: '54/60', all: '90%', integ: 98, clean: true, d: 'Shortlisted' },
  { r: 2, n: 'Candidate B', apt: '34/40', code: '48/60', all: '82%', integ: 96, clean: true, d: 'Shortlisted' },
  { r: 3, n: 'Candidate C', apt: '38/40', code: '40/60', all: '78%', integ: 61, clean: false, d: 'Needs review' },
  { r: 4, n: 'Candidate D', apt: '22/40', code: '18/60', all: '40%', integ: 94, clean: true, d: 'Below cutoff' },
];

const pillars = [
  {
    t: 'Assess', tint: 'bg-[#f3e4cc]', stroke: '#8a5212', path: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12',
    items: ['Coding in Python, Java, JavaScript, C++, Go and SQL', 'Aptitude and MCQ sections, plus written answers', 'A library of 1,000+ coding problems and MCQs, or your own private bank'],
  },
  {
    t: 'Protect', tint: 'bg-[#e4ecf2]', stroke: '#2f5878', path: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z',
    items: ['Random paper per candidate, shuffled options', 'Fullscreen, tab-switch limits, copy-paste block, webcam', 'Server-side timer and autosave — fair if a connection drops'],
  },
  {
    t: 'Decide', tint: 'bg-[#e6efe3]', stroke: '#35552f', path: 'M4 19V9M10 19V5M16 19v-7M22 19H2',
    items: ['Score by section and time per question', 'Integrity score with an event timeline', 'Shortlists and CSV export for your ATS'],
  },
];

// Each line maps to a real check in skillofied-app (useProctor / useMediaProctor)
// or the assessment service. Face checks only run where the browser ships a
// face detector, so the copy says so.
const security = [
  {
    t: 'Before the test', d: 'Only the right person gets in.',
    items: [
      'Private, single-candidate test links that expire',
      'Camera and fullscreen checked before the clock starts',
      'A different paper per candidate — questions and options shuffled',
    ],
  },
  {
    t: 'During the test', d: 'Every suspicious action is caught and timestamped.',
    items: [
      'Fullscreen required; leaving it or switching tabs is logged, with a limit you set',
      'Copy, paste and right-click blocked; screenshot keys and developer tools detected',
      'Second monitors detected',
      'Webcam: camera covered or switched off, no face or several faces (where the browser supports it), and sustained talking flagged',
    ],
  },
  {
    t: 'After the test', d: 'You see the evidence, not just a score.',
    items: [
      'An integrity score for every attempt',
      'A full event timeline your team can review',
      'Server-side timer and autosave, so a dropped connection is never an excuse — or a penalty',
    ],
  },
];

const steps = [
  { t: 'Tell us the role', d: 'A short call or the form below. We create your company account and recruiter logins.' },
  { t: 'We build the test with you', d: 'Problems and MCQs from our 1,000+ question library, matched to the role, with your cutoffs and proctoring rules.' },
  { t: 'Send the links', d: 'Each candidate gets a private link and takes the test in their browser.' },
  { t: 'Interview the best', d: 'Scores are ready as each test ends. Check flags, shortlist, export.' },
];

const compare = [
  { k: 'Shows real coding skill', cv: 'No', kn: 'Yes — code is run and graded' },
  { k: 'Same standard for everyone', cv: 'Depends on the reviewer', kn: 'Yes — same cutoffs, auto-marked' },
  { k: 'Engineer time per candidate', cv: 'A first-round interview', kn: 'None until the shortlist' },
  { k: 'Cheating visibility', cv: '—', kn: 'Integrity score and timeline' },
];

const uses = [
  { t: 'Lateral hiring', d: 'Filter applicants before the first interview, so your engineers only meet people who can code.' },
  { t: 'Campus drives', d: 'Test a whole batch in one sitting — a different paper for each student, proctored in every browser.' },
  { t: 'Hire Knovate learners', d: 'Test our trained learners directly. Certified candidates come with a verifiable credential.' },
];

const faqs = [
  { q: 'How do you stop cheating?', a: 'Tests can require full screen, limit tab switches, block copy and paste and check the webcam. Every event is logged with a timestamp, and each attempt gets an integrity score for your team to review.' },
  { q: 'Can we use our own questions?', a: 'Yes — or start from our library of 1,000+ coding problems and MCQs. Your recruiters can add MCQs to your company’s own question bank, and our team can add private coding problems that only your tests use.' },
  { q: 'How are coding answers scored?', a: 'Each submission runs against the problem’s hidden test cases in an isolated sandbox. Marks are proportional to the number of cases passed, and the candidate’s best submission counts.' },
  { q: 'Which languages can candidates code in?', a: 'Python, JavaScript, Java, C++ and Go for programming problems, and PostgreSQL for SQL problems.' },
  { q: 'Do candidates need to install anything?', a: 'No. Tests run in a normal web browser. Candidates open the private link you send them and sign in to start.' },
];

const H2 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-serif text-3xl font-semibold text-ink md:text-[34px] ${className}`}>{children}</h2>
);

export default function HirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }} />

      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-14 px-6 pb-20 pt-16 md:pt-20">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-terracotta">Knovate for hiring teams</p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-ink md:text-[54px]">
              Interview only the developers who can actually code.
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-muted">
              Send one link. Candidates take a proctored coding and aptitude test in their browser. You get a
              ranked shortlist with scores and integrity flags — before anyone books an interview.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3">
              <a href="#demo" className="rounded-lg bg-gold px-6 py-3.5 font-semibold text-ink hover:bg-gold-dark hover:text-white">Book a 20-minute demo</a>
              <a href="#report" className="rounded-lg border border-ink/30 px-6 py-3.5 font-semibold text-ink hover:border-ink/60">See a sample report</a>
              <a href="#security" className="self-center px-2 py-3.5 font-semibold text-[#8a5212] underline-offset-4 hover:underline">How we stop cheating</a>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/80">
              <span className="flex items-center gap-2"><Check />1,000+ ready-made questions</span>
              <span className="flex items-center gap-2"><Check />Nothing for candidates to install</span>
              <span className="flex items-center gap-2"><Check />Results the moment a test ends</span>
              <span className="flex items-center gap-2"><Check />We set up your first test with you</span>
            </div>
          </div>

          {/* Sample candidate report */}
          <div className="min-w-0 flex-[1_1_400px]">
            <div aria-hidden="true" className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-[#fffdf9] p-6 shadow-[0_24px_48px_-24px_rgba(43,38,32,.35)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Candidate report</p>
                  <p className="mt-1 font-serif text-xl font-semibold text-ink">Backend Developer · Round 1</p>
                </div>
                <span className="rounded-full bg-sage/20 px-3 py-1.5 text-xs font-semibold text-[#35552f]">Recommend interview</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[['Overall', '82%', ''], ['Integrity', '96', 'text-[#35552f]'], ['Time', '52m', '']].map(([l, v, c]) => (
                  <div key={l} className="rounded-xl bg-cream p-3.5">
                    <p className="text-xs text-muted">{l}</p>
                    <p className={`mt-0.5 text-[26px] font-semibold text-ink ${c}`}>{v}</p>
                  </div>
                ))}
              </div>
              {[['Aptitude (MCQ)', '34 / 40', 85], ['Coding · 2 problems', '48 / 60', 80]].map(([l, v, w]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-sm text-ink"><span>{l}</span><b>{v}</b></div>
                  <div className="mt-1.5 h-2 rounded-full bg-[#ece2d0]"><div className="h-2 rounded-full bg-gold" style={{ width: `${w}%` }} /></div>
                </div>
              ))}
              <div className="border-t border-ink/10 pt-3.5">
                <p className="mb-2 text-xs font-semibold text-muted">Integrity timeline</p>
                <div className="flex flex-col gap-1.5 text-[13px] text-ink/80">
                  {[['00:00', 'Started in fullscreen, camera on'], ['18:42', 'Left fullscreen for 4s — returned'], ['52:10', 'Submitted']].map(([t, e]) => (
                    <span key={t} className="flex gap-2.5"><b className="w-11 font-mono font-medium">{t}</b>{e}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2.5 text-center text-xs text-muted">Sample report — illustrative data</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-content px-6">
        {/* Problem → answer */}
        <section className="pt-[72px]">
          <H2>First-round screening, without the guesswork</H2>
          <p className="mb-7 mt-2 text-muted">Three problems every tech hiring team knows — and what changes with Knovate.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((x) => (
              <div key={x.p} className="overflow-hidden rounded-2xl border border-ink/10 bg-[#fffdf9]">
                <div className="border-b border-ink/10 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">The problem</p>
                  <p className="mt-1.5 text-[17px] font-semibold text-ink">{x.p}</p>
                </div>
                <div className="bg-[#f6faf4] px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#35552f]">With Knovate</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink/85">{x.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shortlist */}
        <section id="report" className="scroll-mt-24 pt-16">
          <H2>What your hiring team sees</H2>
          <p className="mb-6 mt-2 text-muted">Every candidate ranked in one place. Open anyone to see their answers, code and timeline.</p>
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-[#fffdf9]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-6 py-4">
              <div>
                <p className="font-semibold text-ink">Backend Developer · Round 1</p>
                <p className="mt-0.5 text-[13px] text-muted">Cutoff 60% · sample data</p>
              </div>
              <div aria-hidden="true" className="flex gap-2 text-sm font-semibold">
                <span className="rounded-lg border border-ink/20 px-4 py-2.5 text-ink">Export CSV</span>
                <span className="rounded-lg bg-ink px-4 py-2.5 text-cream">Shortlist selected</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <caption className="sr-only">Sample ranked shortlist</caption>
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted">
                    {['Rank', 'Candidate', 'Aptitude', 'Coding', 'Overall', 'Integrity', 'Decision'].map((h, i) => (
                      <th key={h} className={`py-3 font-semibold ${i === 0 ? 'pl-6' : 'px-3'} ${i === 6 ? 'pr-6' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sample.map((c) => (
                    <tr key={c.r} className="border-t border-ink/10 text-ink">
                      <td className="py-3.5 pl-6 font-semibold">{c.r}</td>
                      <td className="px-3">{c.n}</td>
                      <td className="px-3">{c.apt}</td>
                      <td className="px-3">{c.code}</td>
                      <td className="px-3 font-semibold">{c.all}</td>
                      <td className="px-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.clean ? 'bg-sage/20 text-[#35552f]' : 'bg-[#fbeadf] text-[#8a3a1c]'}`}>
                          {c.clean ? 'Clean' : 'Review'} · {c.integ}
                        </span>
                      </td>
                      <td className={`pr-6 ${c.d === 'Shortlisted' ? 'font-semibold text-[#35552f]' : 'text-muted'}`}>{c.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Assess / Protect / Decide */}
        <section className="pt-16">
          <H2 className="mb-7">Everything a technical screen needs</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.t} className="flex flex-col gap-3.5 rounded-2xl border border-ink/10 bg-[#fffdf9] p-6">
                <div className="flex items-center gap-3">
                  <span className={`flex h-[42px] w-[42px] items-center justify-center rounded-xl ${p.tint}`}>
                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.stroke} strokeWidth="2"><path d={p.path} /></svg>
                  </span>
                  <h3 className="text-[19px] font-semibold text-ink">{p.t}</h3>
                </div>
                <ul className="flex list-disc flex-col gap-2 pl-[18px] text-[15px] leading-normal text-ink/85">
                  {p.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Security & proctoring */}
        <section id="security" className="scroll-mt-24 pt-16">
          <H2>Secure, proctored tests</H2>
          <p className="mb-7 mt-2 max-w-2xl text-muted">
            A score only matters if you can trust it. Every test is locked down from the moment the link opens
            to the moment your team reviews it. Nothing fails a candidate automatically — a person on your team
            makes the call, with the evidence in front of them.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {security.map((s, i) => (
              <div key={s.t} className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-[#fffdf9] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4ecf2] text-sm font-semibold text-[#2f5878]">{i + 1}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-ink">{s.t}</h3>
                    <p className="text-[13px] text-muted">{s.d}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5 text-[15px] leading-normal text-ink/85">
                  {s.items.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f5878" strokeWidth="2" className="mt-0.5 flex-none"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /></svg>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-24 pt-16">
          <div className="rounded-[18px] bg-ink p-8 text-cream md:p-10">
            <h2 className="font-serif text-3xl font-semibold">From first call to shortlist</h2>
            <p className="mb-8 mt-1.5 text-[#d9cfbd]">We do the setup with you. Your team never has to learn the tool alone.</p>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.t} className="flex flex-col gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold text-ink ${i === 3 ? 'bg-[#8fb08b]' : 'bg-gold'}`}>{i + 1}</span>
                  <b className="text-[17px]">{s.t}</b>
                  <span className="text-sm leading-relaxed text-[#d9cfbd]">{s.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Comparison */}
        <section className="mx-auto max-w-[930px] pt-16">
          <H2 className="mb-6 text-center">CV screening vs a Knovate test</H2>
          <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-[#fffdf9]">
            <table className="w-full min-w-[560px] text-[15px]">
              <thead>
                <tr className="text-left text-[13px] font-semibold">
                  <th className="px-6 py-4"><span className="sr-only">Criterion</span></th>
                  <th className="px-4 py-4 text-muted">CV screening</th>
                  <th className="bg-[#fbf3e6] px-6 py-4 text-[#8a5212]">Knovate test</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.k} className="border-t border-ink/10 text-ink">
                    <th scope="row" className="px-6 py-4 text-left font-semibold">{r.k}</th>
                    <td className="px-4 py-4 text-muted">{r.cv}</td>
                    <td className="bg-[#fbf3e6] px-6 py-4">{r.kn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Use cases */}
        <section className="pt-16">
          <H2 className="mb-6">Built for how you hire</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {uses.map((u) => (
              <div key={u.t} className="rounded-2xl border border-ink/10 bg-[#fffdf9] p-6">
                <h3 className="mb-2 text-lg font-semibold text-ink">{u.t}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enquiry form */}
        <section id="demo" className="scroll-mt-24 pt-16">
          <div className="grid gap-12 rounded-[18px] border border-ink/10 bg-[#fffdf9] p-7 shadow-[0_24px_48px_-32px_rgba(43,38,32,.3)] md:p-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-3.5">
              <h2 className="font-serif text-3xl font-semibold text-ink">Run your first test with us</h2>
              <p className="text-[15px] leading-relaxed text-muted">Tell us the role. We usually reply within a day and set up your first test together.</p>
              <ul className="mt-2 flex flex-col gap-2.5 text-[15px] text-ink">
                {['Company account with recruiter logins', 'Your own private question bank', 'Hands-on help with your first test'].map((x) => (
                  <li key={x} className="flex gap-2.5"><Check size={20} />{x}</li>
                ))}
              </ul>
            </div>
            <CompanyEnquiryForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-24 pt-16">
          <H2 className="mx-auto mb-6 max-w-3xl">Questions from hiring teams</H2>
          <FAQ items={faqs} />
        </section>
      </div>
    </>
  );
}
