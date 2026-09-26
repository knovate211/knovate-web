import type { Metadata } from 'next';
import RegisteredNotice from '@/components/certification/RegisteredNotice';

export const metadata: Metadata = {
  title: 'You are registered',
  // Nothing here should be indexed: it is the private end of a payment flow.
  robots: { index: false, follow: false },
};

export default function CertificationRegisteredPage() {
  return <RegisteredNotice />;
}
