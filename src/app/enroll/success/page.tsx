import type { Metadata } from 'next';
import Section from '@/components/Section';
import EnrollSuccess from '@/components/enroll/EnrollSuccess';

export const metadata: Metadata = {
  title: 'You are enrolled',
  robots: { index: false, follow: false },
};

export default function EnrollSuccessPage() {
  return (
    <Section className="bg-sand/40">
      <EnrollSuccess />
    </Section>
  );
}
