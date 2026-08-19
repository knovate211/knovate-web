import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import Button from '@/components/Button';
import CourseCard from '@/components/CourseCard';
import TestimonialCard from '@/components/TestimonialCard';
import StatRow from '@/components/Stat';
import CTASection from '@/components/CTASection';
import EnquiryForm from '@/components/EnquiryForm';
import { courses } from '@/data/courses';
import { testimonials, partners } from '@/data/testimonials';
import { stats, site } from '@/data/site';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand to-cream">
        <div className="mx-auto grid max-w-content items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <Eyebrow>Mentor-led tech education</Eyebrow>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-ink md:text-6xl">
              {site.tagline}.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">
              Master in-demand skills — Full-Stack, Java, SQL, GenAI and more — with hands-on
              practice, real projects and mentors who help you get hired.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/courses">Explore courses</Button>
              <Button href="/contact" variant="outline">Talk to an advisor</Button>
            </div>
            <div className="mt-10">
              <StatRow stats={stats} />
            </div>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ink">Get a free consultation</h2>
            <p className="mt-1 mb-5 text-sm text-muted">Tell us your goal — we&apos;ll suggest the right track.</p>
            <EnquiryForm source="home_hero" compact />
          </div>
        </div>
      </section>

      {/* Value props */}
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { t: 'Learn by building', d: 'Every module ends with a real project and auto-graded coding practice — not just videos.' },
            { t: 'Mentors who care', d: 'Get live guidance, doubt-clearing and code reviews from working engineers.' },
            { t: 'Built for placement', d: 'Mock interviews, portfolio projects and hiring-partner opportunities.' },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-ink/10 bg-white p-7">
              <h3 className="font-serif text-xl font-semibold text-ink">{f.t}</h3>
              <p className="mt-2 text-sm text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Courses */}
      <Section className="bg-sand/50">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Career tracks</Eyebrow>
            <Heading>Pick your path</Heading>
          </div>
          <Button href="/courses" variant="ghost">View all courses →</Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c) => <CourseCard key={c.slug} course={c} />)}
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted">
          Our learners work at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {partners.map((p) => (
            <span key={p} className="font-serif text-xl font-semibold text-ink/40">{p}</span>
          ))}
        </div>
      </Section>

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

      <CTASection />
    </>
  );
}
