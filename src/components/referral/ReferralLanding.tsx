'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { REFERRAL_COOKIE, recordReferralClick, resolveReferralCode } from '@/lib/api';

/**
 * Stores the referral code and sends the visitor on.
 *
 * The cookie is first-party and set from the client, which keeps this working
 * on a static export and behind a CDN. `SameSite=Lax` is deliberate: the code
 * must survive the visitor following a link out to Razorpay and back.
 */
export default function ReferralLanding({ code }: { code: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Where the referrer pointed them, if anywhere: /r/CODE?to=/courses/java
    const to = params.get('to');
    const destination = to && to.startsWith('/') ? to : '/courses';

    (async () => {
      try {
        const res = await resolveReferralCode(clean);
        if (!res.valid) {
          // An expired or blocked code should not strand the visitor — they came
          // here to look at courses, so let them.
          router.replace(destination);
          return;
        }
        const days = res.attributionDays ?? 90;
        document.cookie =
          `${REFERRAL_COOKIE}=${encodeURIComponent(clean)}; path=/; max-age=${days * 24 * 60 * 60}; SameSite=Lax`;
        void recordReferralClick(clean, destination);
      } catch {
        setFailed(true);
      } finally {
        router.replace(destination);
      }
    })();
  }, [code, params, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-5 text-center">
      <div>
        <p className="font-serif text-2xl font-semibold text-ink">Taking you in…</p>
        <p className="mt-2 text-sm text-muted">
          {failed ? 'One moment — opening our courses.' : 'Your friend’s discount is being applied.'}
        </p>
      </div>
    </div>
  );
}
