import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import ReferButton from '@/components/referral/ReferButton';
import CTASection from '@/components/CTASection';
import { pageMeta } from '@/lib/seo';
import { getReferralConfig, type ReferralConfig } from '@/lib/api';

export const metadata: Metadata = pageMeta({
  title: 'Refer a Friend and Earn',
  description:
    'Share Knovate with a friend. They get a discount on their first course or certification exam, and you get paid by UPI when they enrol.',
  path: '/referrals',
});

export const dynamic = 'force-dynamic';

async function loadConfig(): Promise<ReferralConfig | null> {
  try {
    const c = await getReferralConfig();
    return c.active ? c : null;
  } catch {
    return null;
  }
}

export default async function ReferralsPage() {
  const config = await loadConfig();

  return (
    <>
      <Section className="bg-gradient-to-b from-sand to-cream !pb-10">
        <Eyebrow>Refer &amp; earn</Eyebrow>
        <Heading as="h1">Share what worked for you</Heading>
        {config ? (
          <>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              Send a friend your link. They get <strong className="text-ink">{config.friendDiscountPercent}% off</strong> their
              first course or certification exam, and you earn{' '}
              <strong className="text-ink">₹{config.courseRewardRupees.toLocaleString('en-IN')}</strong> when they enrol on a
              course, or ₹{config.examRewardRupees.toLocaleString('en-IN')} for an exam — paid straight to your UPI.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ReferButton className="rounded-lg bg-gold px-6 py-3 font-semibold text-white transition-colors hover:bg-gold-dark"
                           label="Get my referral link" />
              <Link href="/referrals/status" className="text-sm font-semibold text-gold-dark hover:text-gold">
                Already have a link? Check your referrals →
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Our referral programme is not open at the moment.{' '}
            <Link href="/contact" className="font-semibold text-gold-dark">Ask us</Link> to be told
            when it opens.
          </p>
        )}
      </Section>

      {config && (
        <>
          <Section className="!pt-4">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                ['Get your link', 'Name, email and phone — that is the whole form. Your link is yours permanently.'],
                ['Share it', 'WhatsApp, a message, a group, your own students. Anyone who uses it gets the discount automatically.'],
                ['Get paid', 'When they pay for a course or an exam, we check the referral and send your reward by UPI.'],
              ].map(([t, d], i) => (
                <div key={t} className="rounded-2xl border border-ink/10 bg-white p-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand text-sm font-bold text-gold-dark">{i + 1}</span>
                  <h2 className="mt-4 font-serif text-xl font-semibold text-ink">{t}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section className="bg-sand/50" id="terms">
            <Heading>The rules, in plain words</Heading>
            <ul className="mt-6 grid max-w-3xl gap-3 text-muted">
              <li>• A reward is earned when your friend <strong className="text-ink">pays</strong> for a course or a certification exam — not when they sign up or enquire.</li>
              <li>• Their purchase must be at least ₹{config.minOrderRupees.toLocaleString('en-IN')} for a reward to apply.</li>
              <li>• Your link works for {config.attributionDays} days after someone opens it.</li>
              <li>• One reward per friend. Referring yourself does not earn anything.</li>
              <li>• If your friend is refunded, the reward is cancelled.</li>
              <li>• We check every referral before paying, and we can withhold a reward we believe was not genuine.</li>
              <li>• Payouts go by UPI. Tax may apply to what you earn; we may need your PAN for larger amounts.</li>
            </ul>
            <div className="mt-8">
              <ReferButton className="rounded-lg bg-gold px-6 py-3 font-semibold text-white transition-colors hover:bg-gold-dark"
                           label="Get my referral link" />
            </div>
          </Section>
        </>
      )}

      <CTASection />
    </>
  );
}
