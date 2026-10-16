import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import ScholarshipCTA from '@/components/scholarship/ScholarshipCTA';
import HeroImage from '@/components/home/HeroImage';
import { testimonials } from '@/data/testimonials';
import { SITE_URL } from '@/lib/seo';
import {
  ArrowRight, BlocksIcon, BriefcaseIcon, CapIcon, CertIcon, CloudIcon, CodeIcon,
  DatabaseIcon, GrowthIcon, LaptopIcon, StarIcon, UserIcon, UsersIcon,
} from '@/components/home/Icons';

const heroStats = [
  { n: '12k+', l: 'Learners trained', Icon: UsersIcon },
  { n: '9', l: 'Career tracks', Icon: CapIcon },
  { n: '500+', l: 'Practice problems', Icon: BriefcaseIcon },
  { n: '85%', l: 'Placement rate', Icon: StarIcon },
];

const features = [
  { t: 'Expert-led learning', d: 'Learn from industry professionals with years of real-world experience.', Icon: LaptopIcon },
  { t: 'Hands-on projects', d: 'Build real-world projects to create a strong portfolio.', Icon: BlocksIcon },
  { t: 'Personalized support', d: 'Get mentorship and doubt support whenever you need.', Icon: UsersIcon },
  { t: 'Certification', d: 'Showcase your skills with recognized certificates.', Icon: CertIcon },
  { t: 'Career growth', d: 'Get placement assistance and access to top hiring partners.', Icon: GrowthIcon },
];

const popular = [
  { t: 'Full Stack Web Development', meta: 'Beginner', dur: '6 months', href: '/courses/full-stack', Icon: CodeIcon, tone: 'bg-indigo-50 text-indigo-600' },
  { t: 'Data Structures & Algorithms', meta: 'Intermediate', dur: '4 months', href: '/courses', Icon: DatabaseIcon, tone: 'bg-emerald-50 text-emerald-600' },
  { t: 'Cloud & DevOps', meta: 'Advanced', dur: '3 months', href: '/courses', Icon: CloudIcon, tone: 'bg-rose-50 text-rose-500' },
];

function IconBubble({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6e6cf] text-gold-dark">
      {children}
    </span>
  );
}

function FloatCard({ Icon, text, className }: { Icon: typeof UserIcon; text: [string, string]; className: string }) {
  return (
    <div className={`absolute z-20 flex items-center gap-3 rounded-xl bg-white/90 px-3.5 py-3 shadow-[0_8px_30px_rgba(60,40,10,0.08)] backdrop-blur ${className}`}>
      <IconBubble><Icon width={20} height={20} /></IconBubble>
      <p className="text-[13px] leading-tight text-muted">
        {text[0]}<br /><span className="text-ink/80">{text[1]}</span>
      </p>
    </div>
  );
}

// The home page carries the brand term plus what we actually sell, because it
// is the page that ranks for "knovate" and the one shared most often.
export const metadata: Metadata = {
  title: 'Knovate — Mentor-Led Tech Courses with Placement Support',
  description:
    'Learn Full Stack, Java, SQL, GenAI and more with mentors, real projects and placement support. Scholarships available, and certification exams you can verify.',
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#faf6ef]">
        <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-5 pt-14 pb-10 md:px-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
              Skills today. Opportunities tomorrow.
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-[64px]">
              Learn. Build. Grow.<br />With Knovate.
            </h1>
            <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-muted">
              Knovate is a modern edtech platform that helps you gain in-demand tech skills, work on
              real projects, and get career ready with the right guidance and support.
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <Link href="/courses" className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-[16px] font-semibold text-white shadow-sm transition-colors hover:bg-gold-dark">
                Explore courses <ArrowRight />
              </Link>
              <Link href="/contact" className="inline-flex items-center rounded-lg border border-ink/10 bg-white px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-sand">
                Talk to an advisor
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-y-5">
              {heroStats.map(({ n, l, Icon }, i) => (
                <div key={l} className={`flex items-start gap-3 pr-5 ${i > 0 ? 'border-l border-ink/10 pl-5' : ''}`}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6e6cf] text-gold-dark">
                    <Icon width={18} height={18} />
                  </span>
                  <div>
                    <p className="font-serif text-2xl font-bold leading-none text-gold-dark">{n}</p>
                    <p className="mt-2 text-[13px] text-muted">{l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden aspect-[1.35/1] w-full max-w-[680px] lg:block">
            <div className="absolute left-[8%] top-[4%] h-[92%] w-[82%] rounded-t-full rounded-b-[45%] bg-[#f3dfbf]/70" />
            <div className="absolute right-[8%] top-[8%] h-[40%] w-[30%] rounded-full bg-[#f1d9b3]/60" />
            <svg className="absolute left-[-1%] top-[42%] z-20 h-16 w-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
              <path d="M36 8l10 18M16 26l18 10M6 46h20" />
            </svg>
            <HeroImage />
            <FloatCard Icon={UserIcon} text={['Learn', 'from experts']} className="left-[6%] top-[14%]" />
            <FloatCard Icon={CodeIcon} text={['Build real', 'projects']} className="right-[6%] top-[8%]" />
            <FloatCard Icon={BriefcaseIcon} text={['Get job', 'ready']} className="right-[1%] top-[35%]" />
          </div>
        </div>

        {/* Feature strip */}
        <div className="mx-auto max-w-[1360px] px-5 pb-8 md:px-10">
          <div className="grid gap-8 rounded-2xl bg-[#f5eee2] px-8 py-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {features.map(({ t, d, Icon }, i) => (
              <div key={t} className={`lg:px-6 ${i === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-ink/10'}`}>
                <IconBubble><Icon /></IconBubble>
                <h3 className="mt-3 text-[16px] font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular courses + Why Knovate */}
        <div className="mx-auto grid max-w-[1360px] items-center gap-6 px-5 pb-16 md:px-10 lg:grid-cols-[1.1fr_1.6fr_0.95fr]">
          <div className="lg:pr-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">Popular courses</p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-ink">
              Learn in-demand skills across top tech domains.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              From beginner to advanced, our structured courses help you master the skills that top
              companies are looking for.
            </p>
            <Link href="/courses" className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-gold-dark hover:text-gold">
              View all courses <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {popular.map(({ t, meta, dur, href, Icon, tone }) => (
              <div key={t} className="flex flex-col rounded-xl border border-ink/5 bg-white p-4 shadow-[0_4px_20px_rgba(60,40,10,0.05)]">
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}><Icon /></span>
                <h3 className="mt-4 min-h-[42px] text-[14px] font-semibold leading-snug text-ink">{t}</h3>
                <p className="mt-3 text-[12px] text-muted">{meta} <span className="mx-1">•</span> {dur}</p>
                <Link href={href} className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-dark hover:text-gold">
                  Explore course <ArrowRight width={12} height={12} />
                </Link>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl bg-[#f3eadb] p-7">
            <svg className="absolute right-3 top-12 h-14 w-12 text-gold" viewBox="0 0 48 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M30 4c2 10-4 18-14 20M28 28c8-4 16-2 18 4M30 30c-2 8-6 14-10 20" />
            </svg>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">Why Knovate?</p>
            <h2 className="font-serif text-[28px] font-bold leading-tight text-ink">Your goals.<br />Our mission.</h2>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              We&apos;re not just another online learning platform. We&apos;re your partner in building a
              successful tech career.
            </p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-dark hover:text-gold">
              Learn more <ArrowRight width={13} height={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Section className="bg-sand/50">
        <div className="mb-10 text-center">
          <Eyebrow>Loved by learners</Eyebrow>
          <Heading>Stories from our community</Heading>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </Section>

      <div className="pb-4">
        <ScholarshipCTA />
      </div>

      <CTASection />
    </>
  );
}
