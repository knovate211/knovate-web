import type { Metadata } from 'next';
import Section, { Eyebrow, Heading } from '@/components/Section';
import StatRow from '@/components/Stat';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import { testimonials, partners } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Placements',
  description: 'Knovate placement support — mock interviews, portfolio projects and hiring-partner opportunities that get learners hired.',
};

const placementStats = [
  { n: '85%', l: 'Placement rate' },
  { n: '₹6.5L', l: 'Avg. package' },
  { n: '150+', l: 'Hiring partners' },
  { n: '2 mo', l: 'Avg. time to offer' },
];

export default function PlacementsPage() {
  return (
    <>
      <Section className="bg-sand/50 text-center !pb-10">
        <Eyebrow>Placements</Eyebrow>
        <Heading>We don&apos;t stop at teaching</Heading>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          From your first project to your first offer — our placement support pairs real interview prep with a network of hiring partners.
        </p>
      </Section>
      <Section className="!pt-4"><StatRow stats={placementStats} /></Section>
      <Section className="bg-sand/50">
        <div className="mb-10 text-center"><Eyebrow>How it works</Eyebrow><Heading>Your path to a job</Heading></div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { s: '01', t: 'Build a portfolio', d: 'Ship real capstone projects that prove your skills.' },
            { s: '02', t: 'Interview prep', d: 'Mock interviews and DSA practice with feedback.' },
            { s: '03', t: 'Get matched', d: 'We connect you with relevant hiring partners.' },
            { s: '04', t: 'Land the offer', d: 'Negotiate and start your new career.' },
          ].map((x) => (
            <div key={x.s} className="rounded-2xl border border-ink/10 bg-white p-6">
              <div className="font-serif text-3xl font-bold text-gold-dark/40">{x.s}</div>
              <h3 className="mt-2 font-semibold text-ink">{x.t}</h3>
              <p className="mt-1 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted">Hiring partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {partners.map((p) => <span key={p} className="font-serif text-xl font-semibold text-ink/40">{p}</span>)}
        </div>
      </Section>
      <Section className="bg-sand/50">
        <div className="mb-10 text-center"><Eyebrow>Success stories</Eyebrow><Heading>They did it — so can you</Heading></div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
