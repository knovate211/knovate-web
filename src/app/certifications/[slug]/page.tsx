import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import CertificationForm from '@/components/certification/CertificationForm';
import EnquiryForm from '@/components/EnquiryForm';
import ReferButton from '@/components/referral/ReferButton';
import { getCertificationConfig, type CertificationExam } from '@/lib/api';
import { courses } from '@/data/courses';
import { syllabus } from '@/data/syllabus';
import { pageMeta, breadcrumbLd, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';

async function findExam(slug: string): Promise<{ exam: CertificationExam | null; payable: boolean }> {
  try {
    const cfg = await getCertificationConfig();
    return { exam: cfg.exams.find((e) => e.slug === slug) ?? null, payable: cfg.enabled };
  } catch {
    return { exam: null, payable: false };
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { exam } = await findExam(params.slug);
  if (!exam) return { title: 'Exam not found' };
  return pageMeta({
    title: `${exam.title} Certification Exam — Syllabus & Fee`,
    description:
      exam.summary ||
      `Sit the ${exam.title} certification exam online, proctored, and earn a certificate employers can verify.`,
    path: `/certifications/${exam.slug}`,
  });
}

export default async function CertificationExamPage({ params }: { params: { slug: string } }) {
  const { exam, payable } = await findExam(params.slug);
  if (!exam) notFound();

  // An exam usually certifies one of our courses. Where it does, the course's
  // real syllabus is what the candidate is examined on, so it is what we show —
  // rather than a second list that can drift from the teaching.
  const course = exam.courseId ? courses.find((c) => c.id === exam.courseId) : undefined;
  const modules = course ? syllabus[course.slug] ?? [] : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${exam.title} certification exam`,
    description: exam.summary,
    url: `${SITE_URL}/certifications/${exam.slug}`,
    provider: { '@type': 'EducationalOrganization', name: 'Knovate', url: SITE_URL },
    offers: {
      '@type': 'Offer',
      price: exam.priceRupees,
      priceCurrency: 'INR',
      category: 'Certification exam',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Certification', path: '/certifications' },
          { name: exam.title, path: `/certifications/${exam.slug}` },
        ])),
      }} />

      <section className="bg-gradient-to-b from-sand to-cream">
        <div className="mx-auto max-w-content px-5 py-14">
          <Link href="/certifications" className="text-sm font-semibold text-gold-dark">← All exams</Link>
          <div className="mt-4 grid items-start gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-terracotta">Certification exam</p>
              <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">{exam.title}</h1>
              {exam.summary && <p className="mt-4 text-lg text-muted">{exam.summary}</p>}

              <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-4">
                {[
                  ['Format', exam.paperTitle || 'Proctored online exam'],
                  ['Duration', `${exam.durationMinutes} minutes`],
                  ['Total marks', String(exam.totalMarks)],
                  ['Pass mark', `${exam.passPercent}%`],
                  ['Attempts', 'One per registration'],
                  ['Sit it within', `${exam.linkValidDays} days of paying`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="mt-1 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              {payable ? (
                <CertificationForm exam={exam} />
              ) : (
                // Online payment is off (no Razorpay keys, or the gateway is
                // down). Showing a Pay button that can only fail wastes the
                // candidate's time; an enquiry reaches a human instead.
                <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
                  <h2 className="font-serif text-2xl font-semibold text-ink">Register for this exam</h2>
                  <p className="mt-1 mb-5 text-sm text-muted">
                    Online payment isn&apos;t available right now. Leave your details and we will
                    register you for <strong className="text-ink">{exam.title}</strong> and send your
                    exam link.
                  </p>
                  <EnquiryForm source={`certification_${exam.slug}`} defaultInterest={`${exam.title} certification exam`} compact />
                </div>
              )}

              {/* Under whichever card is showing, inside the same grid cell —
                  as its own element it would drop into the next row. */}
              <div className="mt-2 text-right">
                <ReferButton
                  className="text-sm font-semibold text-gold-dark hover:text-gold"
                  label="Know someone sitting this exam? Refer them and earn →"
                  defaultTo={`/certifications/${exam.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">How it works</h2>
            <ol className="mt-5 space-y-4">
              {[
                ['Register and pay', 'Your exam link is emailed as soon as the payment clears.'],
                ['Sit it when ready', `Any time within ${exam.linkValidDays} days, in one sitting.`],
                ['Get your result', 'Marked automatically. Coding answers take a minute longer.'],
                ['Download your certificate', 'Issued on a pass, with a link employers can verify.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-bold text-gold-dark">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-ink">{t}</p>
                    <p className="text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">Exam rules</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>• The exam is proctored: fullscreen is required and your camera must be on.</li>
              <li>• Leaving the tab is recorded; repeated switching ends the attempt.</li>
              <li>• The timer is set by our server and does not pause.</li>
              <li>• The fee covers one attempt. A resit is a new registration, and resits open seven days after an attempt.</li>
              <li>• A flagged attempt is reviewed by a person before any certificate is issued.</li>
            </ul>

            <div className="mt-8">
              <ReferButton
                className="text-sm font-semibold text-gold-dark hover:text-gold"
                label={`Refer a friend to this exam →`}
                defaultTo={`/certifications/${exam.slug}`}
              />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">What the exam covers</h2>
            {modules.length > 0 ? (
              <>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Questions are drawn from across these areas. You do not need to have taken the
                  course — anyone who knows the material can sit the exam.
                </p>

                {/* Areas, not a teaching plan. The course page lists every
                    lesson; repeating that here buries the exam's own detail and
                    suggests the fee buys the course. */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {modules
                    .filter((m) => m.module.startsWith('Module'))
                    .map((m) => (
                      <li key={m.module}
                          className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink">
                        {m.module.replace(/^Module \d+:\s*/, '')}
                      </li>
                    ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink">How the paper is built</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Duration</dt>
                      <dd className="text-ink">{exam.durationMinutes} minutes, one sitting</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Total marks</dt>
                      <dd className="text-ink">{exam.totalMarks}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Pass mark</dt>
                      <dd className="text-ink">{exam.passPercent}%</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Questions</dt>
                      <dd className="text-right text-ink">
                        Drawn at random from our bank, so no two candidates sit the same paper
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-6 text-sm text-muted">
                  New to the subject?{' '}
                  <Link href={`/courses/${course!.slug}`} className="font-semibold text-gold-dark">
                    The {course!.title} course
                  </Link>{' '}
                  teaches all of it, module by module.
                </p>
              </>
            ) : (
              <p className="mt-2 text-muted">
                {exam.paperTitle
                  ? `The exam paper is "${exam.paperTitle}" — ${exam.durationMinutes} minutes, ${exam.totalMarks} marks, ${exam.passPercent}% to pass.`
                  : 'The topic breakdown for this exam is published with the paper.'}{' '}
                <Link href="/contact" className="font-semibold text-gold-dark">Ask us</Link> for the
                detail before you register.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
