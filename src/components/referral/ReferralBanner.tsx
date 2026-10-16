'use client';
import { useEffect, useState } from 'react';
import { heldReferralCode, resolveReferralCode } from '@/lib/api';

const DISMISS_KEY = 'knovate.ref.banner.dismissed';

/**
 * "Asha sent you — your discount applies at checkout."
 *
 * Shown while a referral code is held, because a discount the buyer never hears
 * about does not make them buy. It names the referrer's first name and nothing
 * else: the code is public to anyone holding the link, so an email address or
 * an earnings figure here would be a leak.
 */
export default function ReferralBanner() {
  const [state, setState] = useState<{ name: string; percent: number } | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const code = heldReferralCode();
    if (!code) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === code) return;
    } catch { /* private mode: just show it */ }

    resolveReferralCode(code)
      .then((r) => {
        if (r.valid && r.firstName) {
          setState({ name: r.firstName, percent: r.friendDiscountPercent ?? 0 });
          setHidden(false);
        }
      })
      .catch(() => { /* a banner is not worth an error message */ });
  }, []);

  if (hidden || !state) return null;

  const dismiss = () => {
    setHidden(true);
    // Dismissed for this visit only — the discount still applies, and a buyer
    // who returns tomorrow should be reminded it does.
    try { sessionStorage.setItem(DISMISS_KEY, heldReferralCode()); } catch { /* ignore */ }
  };

  return (
    <div className="bg-gold/15 px-5 py-2.5 text-center text-sm text-ink">
      <strong>{state.name}</strong> sent you
      {state.percent > 0 ? <> — {state.percent}% off your first course or exam, applied at checkout.</> : '.'}
      <button onClick={dismiss} aria-label="Dismiss" className="ml-3 text-muted hover:text-ink">✕</button>
    </div>
  );
}
