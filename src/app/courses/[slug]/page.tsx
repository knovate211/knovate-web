import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section, { Eyebrow } from '@/components/Section';
import EnquiryForm from '@/components/EnquiryForm';
import ScholarshipCTA from '@/components/scholarship/ScholarshipCTA';
import Button from '@/components/Button';
import { courses, courseBySlug } from '@/data/courses';
import { pageMeta, breadcrumbLd, SITE_URL } from '@/lib/seo';
import ReferButton from '@/components/referral/ReferButton';
import { syllabus } from '@/data/syllabus';
import { priceFor, inr } from '@/data/pricing';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = courseBySlug(params.slug);
  if (!c) return { title: 'Course not found' };
  // "<Course> Course — Syllabus, Fees & Duration" is what people actually
  // search for; the bare course name competes with every other school's page.
  return pageMeta({
    title: `${c.title} Course — Syllabus, Fees & Duration`,
    description: `${c.summary.slice(0, 150)}`,
    path: `/courses/${c.slug}`,
  });
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const c = courseBySlug(params.slug);
  if (!c) notFound();

  // The real syllabus from the student app; courses.ts keeps a short outline as a fallback.
  const modules = syllabus[c.slug] ?? c.syllabus.map((m) => ({ module: m.module, lessons: m.topics }));
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);
  const isBundle = c.slug === 'full-stack';
  const fee = priceFor(c.id);

  // Google's Course rich result needs a provider with a URL and a course
  // instance; without them the markup validates but is never shown.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.title,
    description: c.summary,
    url: `${SITE_URL}/courses/${c.slug}`,
    educationalLevel: c.level,
    teaches: c.outcomes,
    provider: { '@type': 'EducationalOrganization', name: 'Knovate', url: SITE_URL },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `P${parseInt(c.duration, 10) || 0}M`,
    },
    ...(fee && {
      offers: {
        '@type': 'Offer',
        price: fee.selfPaced,
        priceCurrency: 'INR',
        category: 'Self-Paced',
        url: `${SITE_URL}/enroll?course=${c.slug}`,
        availability: 'https://schema.org/InStock',
      },
    }),
  };

  const crumbs = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: c.title, path: `/courses/${c.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
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
              {fee && (
                <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                  <Link href={`/enroll?course=${c.slug}&plan=self`} className="group rounded-xl border border-ink/10 bg-white px-4 py-3 hover:border-gold">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">Self-Paced</div>
                    <div className="mt-1 font-serif text-2xl font-bold text-ink">{inr(fee.selfPaced)}</div>
                    <div className="mt-1 text-xs font-semibold text-gold-dark group-hover:underline">Enroll →</div>
                  </Link>
                  <Link href={`/enroll?course=${c.slug}&plan=mentor`} className="group rounded-xl border border-gold bg-white px-4 py-3 ring-1 ring-gold hover:bg-gold/5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gold-dark">Mentor-Led</div>
                    <div className="mt-1 font-serif text-2xl font-bold text-ink">{inr(fee.mentorLed)}</div>
                    <div className="mt-1 text-xs font-semibold text-gold-dark group-hover:underline">Enroll →</div>
                  </Link>
                  <p className="col-span-2 text-sm text-muted">
                    One-time fee.{' '}
                    <Link href="/pricing" className="font-semibold text-gold-dark hover:underline">Compare plans</Link>
                    {' '}· Scholarships can cover part of it.
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
                <h2 className="font-serif text-xl font-semibold text-ink">Enquire about this course</h2>
                <p className="mt-1 mb-5 text-sm text-muted">We&apos;ll share the syllabus, next batch dates and EMI options.</p>
                <EnquiryForm source={`course_${c.slug}`} defaultInterest={c.title} compact />
              </div>

              {/* Under the card, not inside it. Renders nothing while the
                  referral programme is closed. */}
              <div className="mt-2 text-right">
                <ReferButton
                  className="text-sm font-semibold text-gold-dark hover:text-gold"
                  label={`Know someone who'd like this? Refer them and earn →`}
                  defaultTo={`/courses/${c.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-12">
        <ScholarshipCTA courseId={c.id} courseName={c.title} />
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
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
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-serif text-2xl font-semibold text-ink">Syllabus</h2>
              <p className="text-sm text-muted">
                {isBundle
                  ? `${modules.length} courses · ${lessonCount} modules`
                  : `${modules.length} modules · ${lessonCount} lessons`}
              </p>
            </div>
            {isBundle && (
              <p className="mt-2 text-sm text-muted">
                Full Stack Development includes these four complete courses.
              </p>
            )}
            <div className="mt-5 space-y-3">
              {modules.map((m, i) => (
                <details
                  key={m.module}
                  open={i === 0}
                  className="group rounded-xl border border-ink/10 bg-white [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                    <span className="font-semibold text-ink">{m.module}</span>
                    <span className="flex shrink-0 items-center gap-3 text-sm text-muted">
                      {m.lessons.length} {isBundle ? 'modules' : m.lessons.length === 1 ? 'lesson' : 'lessons'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-open:rotate-180" aria-hidden>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <ol className="grid gap-x-6 gap-y-2 border-t border-ink/5 px-5 py-4 text-sm text-muted sm:grid-cols-2">
                    {m.lessons.map((l, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-gold-dark">•</span>{l}
                      </li>
                    ))}
                  </ol>
                </details>
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
