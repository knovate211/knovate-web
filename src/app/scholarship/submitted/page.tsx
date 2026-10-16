import type { Metadata } from 'next';
import Section from '@/components/Section';
import ApplicationReceived from '@/components/scholarship/ApplicationReceived';

export const metadata: Metadata = {
  title: 'Check your email',
  description: 'Your Knovate scholarship application has been received — your test link is on its way.',
  robots: { index: false, follow: false },
};

export default function ScholarshipSubmittedPage() {
  return (
    <Section className="bg-sand/40">
      <ApplicationReceived />
    </Section>
  );
}
