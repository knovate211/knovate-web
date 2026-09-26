import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Section, { Eyebrow, Heading } from '@/components/Section';
import StatRow from '@/components/Stat';
import CTASection from '@/components/CTASection';
import { stats } from '@/data/site';

export const metadata: Metadata = pageMeta({
  title: 'About Us — Mentor-Led Tech Education',
  description:
    'Knovate teaches practical, job-focused tech skills with mentors, real projects and placement support. Here is who we are and how we teach.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Section className="bg-sand/50 !pb-10">
        <Eyebrow>About Knovate</Eyebrow>
        <Heading as="h1" className="max-w-3xl">Practical tech education, built around people</Heading>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          We started Knovate with a simple belief: people learn to build by building — with the right mentors beside them.
          Today we help thousands of learners turn curiosity into careers.
        </p>
      </Section>
      <Section className="!pt-4"><StatRow stats={stats} /></Section>
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Our mission</h2>
            <p className="mt-4 text-muted">
              To make world-class, hands-on tech education accessible and outcome-driven — so that anyone, anywhere, can build the skills to shape the future.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">How we&apos;re different</h2>
            <ul className="mt-4 space-y-3 text-ink/90">
              <li className="flex gap-3"><span className="text-gold-dark">✓</span> Learning by doing, not passive watching</li>
              <li className="flex gap-3"><span className="text-gold-dark">✓</span> Real mentors who are working engineers</li>
              <li className="flex gap-3"><span className="text-gold-dark">✓</span> A platform with 500+ practice problems built in</li>
              <li className="flex gap-3"><span className="text-gold-dark">✓</span> Placement support that goes beyond a certificate</li>
            </ul>
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
