'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import { CERTIFICATION_HANDOFF_KEY } from './CertificationForm';
import type { CertificationResult } from '@/lib/api';

/**
 * The page after a successful payment.
 *
 * The result is handed over in sessionStorage rather than a query string: it
 * carries the candidate's email, and an address in a URL ends up in browser
 * history, referrer headers and any analytics script on the page.
 */
export default function RegisteredNotice() {
  const [result, setResult] = useState<CertificationResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CERTIFICATION_HANDOFF_KEY);
      if (raw) setResult(JSON.parse(raw) as CertificationResult);
    } catch { /* a direct visit simply gets the generic copy */ }
  }, []);

  const expires = result?.expires_at
    ? new Date(result.expires_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Payment confirmed</Eyebrow>
        <Heading>{result ? `You are registered for ${result.exam_name}` : 'You are registered'}</Heading>

        {result && !result.emailed ? (
          // Honesty beats reassurance: claiming an email was sent when the relay
          // refused it leaves someone refreshing an inbox for a message that is
          // never coming.
          <p className="mt-5 rounded-xl bg-amber-50 px-5 py-4 text-left text-sm text-amber-900">
            Your payment went through, but we could not email your exam link just now. Please{' '}
            <Link href="/contact" className="font-semibold underline">contact us</Link> with the
            name you registered under and we will send it straight away. Your registration is safe.
          </p>
        ) : (
          <p className="mt-5 text-lg text-muted">
            Your exam link is on its way to{' '}
            <strong className="text-ink">{result?.email ?? 'your email address'}</strong>. It usually
            arrives within a minute.
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 text-left">
          <h2 className="font-serif text-xl font-semibold text-ink">Before you start</h2>
          <ul className="mt-4 space-y-3 text-muted">
            <li className="flex gap-3"><span className="text-gold-dark">1.</span> Set aside the full exam time in one sitting — the timer does not pause.</li>
            <li className="flex gap-3"><span className="text-gold-dark">2.</span> Use a laptop or desktop with a working camera, on a stable connection.</li>
            <li className="flex gap-3"><span className="text-gold-dark">3.</span> The exam runs in fullscreen and is proctored; leaving the tab is recorded.</li>
            <li className="flex gap-3"><span className="text-gold-dark">4.</span> Pass and your certificate is issued immediately, with a verification link.</li>
          </ul>
          {expires && (
            <p className="mt-5 border-t border-ink/10 pt-4 text-sm text-muted">
              Your link is valid until <strong className="text-ink">{expires}</strong>.
            </p>
          )}
        </div>

        <p className="mt-6 text-sm text-muted">
          No email after a few minutes? Check spam, then{' '}
          <Link href="/contact" className="font-semibold text-gold-dark">tell us</Link> — we can
          resend it.
        </p>
      </div>
    </Section>
  );
}
