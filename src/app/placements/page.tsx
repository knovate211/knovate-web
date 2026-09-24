import type { Metadata } from 'next';
import Link from 'next/link';
import HeroImage from '@/components/home/HeroImage';
import {
  ArrowRight, BookIcon, BriefcaseIcon, GrowthIcon, HandshakeIcon, ResumeIcon, UserIcon, UsersIcon,
} from '@/components/home/Icons';

export const metadata: Metadata = {
  title: 'Placements',
  description: 'Knovate placement support — resume building, interview prep and a network of hiring partners that get learners hired.',
};

const stats = [
  { n: '85%', l: 'Placement rate' },
  { n: '12K+', l: 'Learners placed' },
  { n: '500+', l: 'Hiring partners' },
  { n: '4.8/5', l: 'Student satisfaction' },
];

const support = [
  { t: 'Resume building', d: 'Build a standout resume with expert feedback.', Icon: ResumeIcon, pos: 'right-0 top-[4%]' },
  { t: 'Interview prep', d: 'Mock interviews, GD & technical practice.', Icon: UsersIcon, pos: 'right-0 top-[33%]' },
  { t: 'Dedicated support', d: 'Career mentors & placement assistance until you get hired.', Icon: UserIcon, pos: 'right-0 top-[62%]' },
];

const steps = [
  { t: 'Learn', d: 'Gain in-demand skills with expert-led courses.', Icon: BookIcon },
  { t: 'Build', d: 'Create a strong resume and portfolio with real projects.', Icon: ResumeIcon },
  { t: 'Practice', d: 'Ace interviews with mock tests & career coaching.', Icon: UsersIcon },
  { t: 'Get Hired', d: 'Access top hiring partners and job opportunities.', Icon: HandshakeIcon },
  { t: 'Grow', d: 'Start your career and keep learning with us.', Icon: GrowthIcon },
];

// Text wordmarks styled after each partner's brand colours.
const partners = [
  { n: 'tcs', cls: 'font-sans text-3xl font-light tracking-tight text-[#e4202e]' },
  { n: 'Infosys', cls: 'font-sans text-2xl font-light text-[#007cc3]' },
  { n: 'accenture', cls: 'font-sans text-xl font-bold text-black' },
  { n: 'wipro', cls: 'font-sans text-lg font-semibold text-[#341c53]' },
  { n: 'amazon', cls: 'font-sans text-xl font-bold text-[#111]' },
  { n: 'Microsoft', cls: 'font-sans text-lg text-[#737373]' },
  { n: 'Google', cls: 'font-sans text-2xl font-medium text-[#4285f4]' },
  { n: 'IBM', cls: 'font-serif text-3xl font-black tracking-widest text-[#1f70c1]' },
];

const stories = [
  { name: 'Rohit Sharma', role: 'Software Engineer | TCS', quote: 'Knovate’s placement support was fantastic! From resume building to mock interviews, everything was well-organized. I got placed at TCS within 3 months of completing my course.' },
  { name: 'Priya Nair', role: 'Data Analyst | Accenture', quote: 'The hands-on projects and mock interviews really boosted my confidence. I’m now working as a Data Analyst at Accenture. Thank you, Knovate!' },
  { name: 'Arjun Mehta', role: 'SDE | Amazon', quote: 'Knovate not only taught me the skills but also helped me connect with amazing recruiters. I landed my dream job at Amazon!' },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">{children}</p>
);

export default function PlacementsPage() {
  return (
    <div className="bg-[#faf6ef]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f7efe2] to-[#faf6ef]">
        <div className="mx-auto grid max-w-[1140px] items-end gap-8 px-5 lg:grid-cols-[1.05fr_1fr]">
          <div className="py-12">
            <Eyebrow>Placements</Eyebrow>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-[52px]">
              Your skills.<br />Real opportunities.
            </h1>
            <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-muted">
              At Knovate, we don&apos;t just teach — we help you get hired. With industry-aligned courses,
              expert guidance, and a strong network of hiring partners, we&apos;re with you at every step of
              your career journey.
            </p>
            <div className="mt-6 flex flex-wrap gap-y-4">
              {stats.map((s, i) => (
                <div key={s.l} className={`pr-7 ${i ? 'border-l border-ink/15 pl-7' : ''}`}>
                  <p className="font-serif text-[24px] font-bold leading-none text-gold-dark">{s.n}</p>
                  <p className="mt-2 text-[12px] text-muted">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/courses" className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-gold-dark">
                Explore courses <ArrowRight />
              </Link>
              <Link href="/contact" className="inline-flex items-center rounded-lg border border-ink/10 bg-white px-5 py-2.5 text-[14px] font-medium text-ink hover:bg-sand">
                Talk to an advisor
              </Link>
            </div>
          </div>

          <div className="relative hidden h-[400px] lg:block">
            <div className="absolute bottom-0 left-[4%] h-[340px] w-[340px] rounded-full bg-[#f3e2c6]/70" />
            <p className="absolute left-0 top-[14%] z-20 -rotate-12 font-serif text-[13px] italic leading-relaxed text-ink/80">
              From<br />learning to<br />landing —<br />we support<br />you.
            </p>
            <svg className="absolute right-[36%] top-[26%] z-20 h-10 w-10 text-gold" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 4l6 10M30 12l-12 6M34 26H20" /></svg>
            <div className="absolute inset-y-0 left-[12%] right-[28%]"><HeroImage src="/images/placements-hero.png" /></div>
            {support.map(({ t, d, Icon, pos }) => (
              <div key={t} className={`absolute z-20 flex w-[160px] gap-3 rounded-xl bg-white/90 p-3 shadow-[0_8px_30px_rgba(60,40,10,0.08)] ${pos}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f6e6cf] text-gold-dark"><Icon width={18} height={18} /></span>
                <div>
                  <p className="text-[11px] font-semibold text-ink">{t}</p>
                  <p className="mt-1 text-[10px] leading-snug text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1140px] space-y-10 px-5 py-6">
        {/* How it works */}
        <section className="grid gap-8 rounded-2xl bg-[#f6efe4] p-7 lg:grid-cols-[250px_1fr]">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-serif text-[26px] font-bold leading-tight text-ink">Your path to a successful career</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">We prepare you with the right skills, connections and confidence to land your dream job.</p>
            <Link href="/courses" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gold/60 px-5 py-2 text-[12px] font-medium text-gold-dark hover:bg-gold hover:text-white">
              Learn more <ArrowRight width={14} height={14} />
            </Link>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map(({ t, d, Icon }, i) => (
              <li key={t} className="relative">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f6dfc0] text-gold-dark"><Icon width={30} height={30} strokeWidth={1.5} /></span>
                {i < steps.length - 1 && <ArrowRight className="absolute left-[112px] top-6 hidden text-gold lg:block" width={16} height={16} strokeWidth={1.5} />}
                <h3 className="mt-5 text-[14px] font-semibold text-ink">{i + 1}. {t}</h3>
                <p className="mt-3 max-w-[120px] text-[11px] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Hiring partners */}
        <section className="px-2">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Our hiring partners</Eyebrow>
              <h2 className="font-serif text-[26px] font-bold text-ink">Top companies hire Knovate learners</h2>
              <p className="mt-1 max-w-[440px] text-[12px] leading-relaxed text-muted">We&apos;re proud to partner with leading companies across industries to bring you real job opportunities and career growth.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gold-dark hover:text-gold">View all partners <ArrowRight width={14} height={14} /></Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {partners.map((p) => (
              <div key={p.n} className="flex h-[60px] items-center justify-center rounded-md border border-ink/5 bg-white">
                <span className={p.cls}>{p.n}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Success stories */}
        <section className="grid gap-5 rounded-2xl bg-[#f6efe4] p-7 lg:grid-cols-[330px_1fr]">
          <div className="pt-3">
            <Eyebrow>Student success stories</Eyebrow>
            <h2 className="font-serif text-[26px] font-bold text-ink">Real people. Real careers.</h2>
            <p className="mt-2 max-w-[270px] text-[12px] leading-relaxed text-muted">Hear from our learners who turned their skills into opportunities with Knovate.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.name} className="rounded-lg bg-white p-4 shadow-[0_4px_20px_rgba(60,40,10,0.05)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6dfc0] font-semibold text-gold-dark">
                  {s.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <blockquote className="mt-2 text-[10.5px] leading-relaxed text-muted">&ldquo;{s.quote}&rdquo;</blockquote>
                <figcaption className="mt-2">
                  <p className="text-[10.5px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[10px] text-muted">{s.role}</p>
                  <p className="mt-1.5 text-[13px] tracking-[0.15em] text-amber-500" aria-label="5 out of 5 stars">★★★★★</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative flex flex-wrap items-center gap-6 overflow-hidden rounded-xl bg-gradient-to-r from-[#b8782f] via-[#c98a3a] to-[#b5701f] px-10 py-5 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><BriefcaseIcon width={20} height={20} /></span>
          <div className="flex-1">
            <h2 className="font-serif text-[18px] font-bold">Ready to take the next step in your career?</h2>
            <p className="mt-1 text-[11px] text-white/90">Join thousands of learners who have already built their dream careers with Knovate.</p>
          </div>
          <Link href="/enroll" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-[12px] font-medium text-gold-dark hover:bg-cream">
            Enroll now <ArrowRight width={14} height={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
