import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section, { Eyebrow } from '@/components/Section';
import EnquiryForm from '@/components/EnquiryForm';
import Button from '@/components/Button';
import { courses, courseBySlug } from '@/data/courses';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = courseBySlug(params.slug);
  if (!c) return { title: 'Course not found' };
  return {
    title: c.title,
    description: c.summary,
    openGraph: { title: `${c.title} · Knovate`, description: c.summary },
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const c = courseBySlug(params.slug);
  if (!c) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.title,
    description: c.summary,
    provider: { '@type': 'Organization', name: 'Knovate' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-b from-sand to-cream">
        <div className="mx-auto max-w-content px-5 py-14">
          <Link href="/courses" className="text-sm font-semibold text-gold-dark">← All courses</Link>
          <div className="mt-4 grid items-start gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>{c.level} · {c.duration}</Eyebrow>
              <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">{c.title}</h1>
              <p className="mt-4 text-lg text-muted">{c.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.tags.map((t) => <span key={t} className="rounded-md bg-white px-3 py-1 text-sm font-medium text-muted">{t}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
              <h2 className="font-serif text-xl font-semibold text-ink">Enquire about this course</h2>
              <p className="mt-1 mb-5 text-sm text-muted">We&apos;ll share the syllabus, fees and next batch dates.</p>
              <EnquiryForm source={`course_${c.slug}`} defaultInterest={c.title} compact />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">What you&apos;ll learn</h2>
            <ul className="mt-5 space-y-3">
              {c.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-ink/90">
                  <span className="mt-1 text-gold-dark">✓</span>{o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Syllabus</h2>
            <div className="mt-5 space-y-4">
              {c.syllabus.map((m) => (
                <div key={m.module} className="rounded-xl border border-ink/10 bg-white p-5">
                  <h3 className="font-semibold text-ink">{m.module}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {m.topics.map((t) => <li key={t}>• {t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button href="/contact">Talk to an advisor</Button>
        </div>
      </Section>
    </>
  );
}
