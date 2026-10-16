import type { Metadata } from 'next';
import ReferralLanding from '@/components/referral/ReferralLanding';

export const metadata: Metadata = {
  title: 'Welcome to Knovate',
  // A referral link is for the person holding it, not for search engines.
  robots: { index: false, follow: false },
};

/**
 * Where a shared referral link lands.
 *
 * The work — storing the code and recording the click — has to happen in the
 * browser, because the cookie belongs to the visitor and the redirect should
 * feel instant. So this page is a thin shell around a client component.
 */
export default function ReferralLinkPage({ params }: { params: { code: string } }) {
  return <ReferralLanding code={params.code} />;
}
