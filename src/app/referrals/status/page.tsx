import type { Metadata } from 'next';
import Section, { Eyebrow, Heading } from '@/components/Section';
import ReferralStatusLookup from '@/components/referral/ReferralStatusLookup';

export const metadata: Metadata = {
  title: 'Check your referrals',
  description: 'See how your Knovate referrals are doing and what has been paid.',
  // Personal, and reachable only by someone who holds both the code and the
  // matching email — nothing here belongs in a search index.
  robots: { index: false, follow: false },
};

export default function ReferralStatusPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Refer &amp; earn</Eyebrow>
        <Heading as="h1">Check your referrals</Heading>
        <p className="mt-3 text-muted">
          Enter your referral code and the email address you signed up with.
        </p>
        <ReferralStatusLookup />
      </div>
    </Section>
  );
}
