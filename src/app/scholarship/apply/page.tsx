import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import ScholarshipForm from '@/components/scholarship/ScholarshipForm';
import { testFormat, slabs } from '@/data/scholarship';

export const metadata: Metadata = {
  title: 'Apply for a scholarship',
  description:
    'Apply for a Knovate scholarship. One short form, then a 60-minute test of aptitude and coding. Score above the bar and up to 100% of your course fee is covered.',
};

// `courseId` may arrive from a course page's CTA; the form only honours it when
// that course is actually open, so a stale link degrades to an ordinary choice.
export default function ScholarshipApplyPage({
  searchParams,
}: {
  searchParams: { course?: string };
}) {
  return (
    <>
      <Section className="bg-sand/40 !pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <Link href="/scholarship" className="text-sm font-semibold text-gold-dark hover:underline">
            ← Back to the scholarship
          </Link>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Apply for a scholarship
          </h1>
          <p className="mt-3 text-muted">
            Fill this in and we&apos;ll email your test link straight away —{' '}
            {testFormat.durationMinutes} minutes, {testFormat.totalMarks} marks, one attempt. Up to{' '}
            {slabs[0].awardPercent}% of your course fee is on the line.
          </p>
        </div>
      </Section>

      <Section className="!pt-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-9">
          <ScholarshipForm defaultCourseId={searchParams?.course ?? ''} />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
          Your link stays valid for three days and the clock only starts when you open the test —
          so apply now and sit it when you have a clear hour.
        </p>
      </Section>
    </>
  );
}
