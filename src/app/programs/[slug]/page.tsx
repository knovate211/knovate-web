import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section, { Eyebrow } from '@/components/Section';
import ScholarshipCTA from '@/components/scholarship/ScholarshipCTA';
import { courses, courseBySlug } from '@/data/courses';
import { pageMeta, breadcrumbLd, SITE_URL } from '@/lib/seo';
import ReferButton from '@/components/referral/ReferButton';
import { syllabus } from '@/data/syllabus';
import { priceFor, maxScholarship } from '@/data/pricing';
import { catalog } from '@/data/catalog';
import { programProjects } from '@/data/projects';
import ProgramProjects from '@/components/program/ProgramProjects';
import SampleCertificates from '@/components/program/SampleCertificates';
import ProgramPlans from '@/components/program/ProgramPlans';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import AlumniStoriesSection from '@/components/home/AlumniStoriesSection';
import AlumniVoices from '@/components/home/AlumniVoices';
import PartnersSection from '@/components/home/PartnersSection';
import HomeFAQ from '@/components/home/HomeFAQ';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = courseBySlug(params.slug);
  if (!c) return { title: 'Program not found' };
  // "<Course> Course — Syllabus, Fees & Duration" is what people actually
  // search for; the bare course name competes with every other school's page.
  return pageMeta({
    title: `${c.title} Program — Syllabus, Fees & Duration`,
    description: `${c.summary.slice(0, 150)}`,
    path: `/programs/${c.slug}`,
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
  const domain = catalog.find((x) => x.slug === c.slug)?.category;
  const projects = programProjects(c.slug);
  const enrollHref = fee ? `/enroll?course=${c.slug}` : '/contact';

  // Program-specific answers, built from the same data the page shows.
  const faqs = [
    {
      q: `How do I enroll in ${c.title}?`,
      a: fee
        ? `Choose "Enroll now", pay securely by UPI, card or net banking, and your login details are emailed to you straight away.`
        : 'Talk to an advisor through the contact page and we will share the syllabus, next batch dates and payment options.',
    },
    {
      q: `Is ${c.title} beginner-friendly?`,
      a: c.level === 'Beginner'
        ? 'Yes. It starts from the fundamentals and assumes no background.'
        : `It is an ${c.level.toLowerCase()} program. Some basic familiarity helps; if you are unsure, talk to an advisor and we will help you choose the right starting point.`,
    },
    {
      q: 'Can I get a scholarship?',
      a: `Yes. Take the free 60-minute Knovate scholarship test and you can get up to ${maxScholarship}% off the program fee, depending on your score.`,
    },
    {
      q: 'Will I receive a certificate?',
      a: 'Yes. You get a certificate of completion, and you can also take the proctored Knovate certification exam. Every certificate has a credential ID and a public page employers can check.',
    },
    {
      q: 'Is there placement support?',
      a: 'Yes. Alongside the program you get resume reviews, mock interviews, technical practice and introductions to our hiring partners.',
    },
  ];

  // Google's Course rich result needs a provider with a URL and a course
  // instance; without them the markup validates but is never shown.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.title,
    description: c.summary,
    url: `${SITE_URL}/programs/${c.slug}`,
    educationalLevel: c.level,
    teaches: c.outcomes,
    provider: { '@type': 'EducationalOrganization', name: 'Knovate', url: SITE_URL },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `P${parseInt(c.duration, 10) || 0}M`,
    },
  };

  const crumbs = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: c.title, path: `/programs/${c.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <section className="bg-gradient-to-b from-sand to-cream">
        <div className="mx-auto max-w-content px-5 py-14">
          <Link href="/programs" className="text-sm font-semibold text-gold-dark">← All programs</Link>
          <div className="mt-4 grid items-start gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>{c.level} · {c.duration}</Eyebrow>
              <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">{c.title}</h1>
              <p className="mt-4 text-lg text-muted">{c.summary}</p>
              {domain && (
                <p className="mt-5 text-ink"><span className="font-semibold">Domain:</span> {domain}</p>
              )}
              <div className="mt-4">
                <div className="text-sm font-semibold text-ink">Tags</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.tags.map((t) => <span key={t} className="rounded-full border border-gold/40 bg-white px-3 py-1 text-sm font-medium text-gold-dark">{t}</span>)}
                </div>
              </div>
            </div>

            {/* Fee card: the way in. Payment (or, when it is switched off, an
                enquiry) happens on /enroll. */}
            <div className="md:pt-10">
              <div className="rounded-2xl border border-gold bg-white p-6 shadow-[0_12px_40px_rgba(60,40,10,0.1)] ring-1 ring-gold md:p-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{c.level} · {c.duration}</div>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">Ready to start?</h2>
                <p className="mt-2 text-sm text-muted">
                  {fee
                    ? `Enrol online in minutes. Save up to ${maxScholarship}% with a Knovate scholarship.`
                    : 'Talk to an advisor for batch dates and payment options.'}
                </p>
                <a href={enrollHref} className="mt-6 flex w-full items-center justify-center rounded-lg bg-gold px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-gold-dark">
                  {fee ? 'Enroll now' : 'Talk to an advisor'}
                </a>
                <p className="mt-3 text-center text-xs text-muted">Live classes, projects, mentor support and placement help</p>
              </div>

              {/* Under the card, not inside it. Renders nothing while the
                  referral programme is closed. */}
              <div className="mt-2 text-right">
                <ReferButton
                  className="text-sm font-semibold text-gold-dark hover:text-gold"
                  label={`Know someone who'd like this? Refer them and earn →`}
                  defaultTo={`/programs/${c.slug}`}
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
              <h2 className="font-serif text-2xl font-semibold text-ink">Curriculum</h2>
              <p className="text-sm text-muted">
                {isBundle
                  ? `${modules.length} programs · ${lessonCount} modules`
                  : `${modules.length} modules · ${lessonCount} lessons`}
              </p>
            </div>
            {isBundle && (
              <p className="mt-2 text-sm text-muted">
                Full Stack Development includes these four complete programs.
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
      </Section>

      <ProgramProjects projects={projects} />
      <SampleCertificates title={c.title} />
      <ProgramPlans slug={c.slug} fee={fee} />
      <WhyChooseUs />
      <AlumniStoriesSection />
      <PartnersSection />
      <AlumniVoices />
      <HomeFAQ items={faqs} />
    </>
  );
}
