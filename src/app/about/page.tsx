import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import Section, { Eyebrow, Heading } from '@/components/Section';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = pageMeta({
  title: 'About Us — Mentor-Led Tech Education',
  description:
    'Knovate is a mentor-led learning platform from Bengaluru helping students and professionals build job-ready skills in software, data, AI and digital marketing.',
  path: '/about',
});

const tracks = [
  'Full Stack Development',
  'Java Development',
  'Front-End Technologies',
  'Golang',
  'GenAI & Forward Deployed Engineering',
  'Mastering SQL',
  'Digital Marketing',
  'AI SEO Specialist',
  'Software Testing',
];

const howWeTeach = [
  ['Learn by doing', 'coding problems, quizzes, and assignments graded instantly.'],
  ['Live mentors', 'working engineers teach, clear doubts, and review your projects.'],
  ['Real projects', 'capstones you can show employers.'],
  ['AI mentor, any time', 'ask questions on the lesson you’re on.'],
  ['Placement support', 'mock interviews, resume reviews, and hiring-partner introductions.'],
  ['Verifiable certificates', 'anyone can check them online.'],
];

const link = 'font-medium text-terracotta underline underline-offset-2 hover:text-ink';

export default function AboutPage() {
  return (
    <>
      <Section className="bg-sand/50 !pb-10">
        <Eyebrow>About Knovate</Eyebrow>
        <Heading as="h1" className="max-w-3xl">Practical tech education, built around people</Heading>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Knovate is a mentor-led learning platform from Bengaluru. We help students and working professionals build
          job-ready skills in software development, data, AI, and digital marketing, by building real things with the right
          mentors beside them.
        </p>
        <p className="mt-4 max-w-2xl text-ink/90">
          <span className="font-semibold text-ink">Our mission:</span> to make hands-on tech education affordable and
          accessible, so anyone with the will to learn can build a career in technology, whatever their college, branch, or
          background.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">What we teach</h2>
            <p className="mt-4 text-muted">Nine career tracks:</p>
            <ul className="mt-3 space-y-2 text-ink/90">
              {tracks.map((t) => (
                <li key={t} className="flex gap-3"><span className="text-gold-dark">✓</span> {t}</li>
              ))}
            </ul>
            <p className="mt-5 text-ink/90">
              Courses cost ₹8,000 to ₹10,000, paid once. A free{' '}
              <Link href="/scholarship" className={link}>scholarship test</Link> can take up to 30% off.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">How we teach</h2>
            <ul className="mt-4 space-y-3 text-ink/90">
              {howWeTeach.map(([label, text]) => (
                <li key={label} className="flex gap-3">
                  <span className="text-gold-dark">✓</span>
                  <span><span className="font-semibold text-ink">{label}:</span> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Who we work with</h2>
            <p className="mt-4 text-ink/90">
              Learners, colleges that run Knovate programs as batches, and{' '}
              <Link href="/hire" className={link}>companies</Link> that hire from our learners and use our tests.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Get in touch</h2>
            <p className="mt-4 text-ink/90">
              <a href="mailto:hello@knovate.com" className={link}>hello@knovate.com</a>, or use the{' '}
              <Link href="/contact" className={link}>contact form</Link>. We reply within one working day.
            </p>
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
