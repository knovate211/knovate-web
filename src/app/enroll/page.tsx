import type { Metadata } from 'next';
import Section, { Eyebrow } from '@/components/Section';
import EnrollForm from '@/components/enroll/EnrollForm';

export const metadata: Metadata = {
  title: 'Enroll',
  description: 'Enroll in a Knovate course online. Choose your course and plan, pay securely with UPI, card or netbanking, and start learning straight away.',
};

export default function EnrollPage({ searchParams }: { searchParams: { course?: string; plan?: string } }) {
  return (
    <>
      <Section className="bg-sand/40 !pb-8 text-center">
        <Eyebrow>Enroll</Eyebrow>
        <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">Start learning today</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Pick your course and plan, pay securely, and your course unlocks straight away. Your login details are emailed to you.
        </p>
      </Section>
      <Section className="!pt-8">
        <div className="mx-auto max-w-3xl">
          <EnrollForm defaultCourse={searchParams?.course ?? ''} defaultPlan={searchParams?.plan === 'self' ? 'self' : 'mentor'} />
        </div>
      </Section>
    </>
  );
}
