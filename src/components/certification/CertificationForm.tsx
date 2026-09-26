'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createCertificationOrder,
  verifyCertificationPayment,
  heldReferralCode,
  type CertificationExam,
} from '@/lib/api';

export const CERTIFICATION_HANDOFF_KEY = 'knovate.certification.result';

const field =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';
const label = 'mb-1.5 block text-sm font-semibold text-ink';

// Razorpay's checkout script, loaded once, only when the candidate is ready to pay.
function loadCheckout(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load the payment window. Check your connection and try again.'));
    document.body.appendChild(s);
  });
}

/**
 * Exam registration and checkout.
 *
 * The name typed here is printed on the certificate, and the email is where the
 * exam link goes — so both are asked for plainly and neither is optional. The
 * amount charged is decided by the server from the exam's slug; the price shown
 * is what the server returned when the order was created.
 */
export default function CertificationForm({ exam }: { exam: CertificationExam }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [refCode, setRefCode] = useState('');

  useEffect(() => { setRefCode(heldReferralCode()); }, []);

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please enter your full name — it is printed on your certificate.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email — your exam link is sent there.');
    if (!/^[+\d][\d\s-]{7,}$/.test(phone.trim())) return setError('Please enter a phone number we can reach you on.');
    if (!agreed) return setError('Please confirm you have read the exam rules.');

    setBusy(true);
    try {
      const [order] = await Promise.all([
        createCertificationOrder({
          slug: exam.slug,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          website,
          referral_code: refCode,
        }),
        loadCheckout(),
      ]);
      const rzp = new window.Razorpay!({
        key: order.key_id,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Knovate',
        description: `${order.exam_name} — certification exam`,
        prefill: order.prefill,
        theme: { color: '#c98a3a' },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const result = await verifyCertificationPayment(resp);
            try { sessionStorage.setItem(CERTIFICATION_HANDOFF_KEY, JSON.stringify(result)); } catch { /* ignore */ }
            router.push('/certifications/registered');
          } catch (err: any) {
            // The payment id is the only handle support has on a payment whose
            // fulfilment failed, so it goes in front of the candidate.
            setError(`${err.message} Payment id: ${resp.razorpay_payment_id}`);
            setBusy(false);
          }
        },
      });
      rzp.on('payment.failed', (r: any) => {
        setError(r?.error?.description
          ? `Payment failed: ${r.error.description}`
          : 'Payment failed. No money was taken — please try again.');
        setBusy(false);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={pay} noValidate className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
      <h2 className="font-serif text-2xl font-semibold text-ink">Register for this exam</h2>
      <p className="mt-1 text-sm text-muted">
        ₹{exam.priceRupees.toLocaleString('en-IN')} · one attempt · sit it any time within{' '}
        {exam.linkValidDays} days
      </p>
      {refCode && (
        <p className="mt-3 rounded-lg bg-sage/10 px-3 py-2 text-sm text-ink">
          Referral <strong>{refCode}</strong> applied — your discount is taken off at payment.
        </p>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <label className={label} htmlFor="cert-name">Full name *</label>
          <input id="cert-name" className={field} value={name} onChange={(e) => setName(e.target.value)}
                 autoComplete="name" placeholder="As it should appear on your certificate" />
        </div>
        <div>
          <label className={label} htmlFor="cert-email">Email *</label>
          <input id="cert-email" type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)}
                 autoComplete="email" placeholder="you@example.com" />
          <p className="mt-1.5 text-xs text-muted">Your exam link is sent here. Check it is right.</p>
        </div>
        <div>
          <label className={label} htmlFor="cert-phone">Phone *</label>
          <input id="cert-phone" type="tel" className={field} value={phone} onChange={(e) => setPhone(e.target.value)}
                 autoComplete="tel" placeholder="+91 " />
        </div>

        {/* Hidden from real users; bots fill every field they find. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="cert-website">Website</label>
          <input id="cert-website" tabIndex={-1} autoComplete="off" value={website}
                 onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <label className="flex gap-3 text-sm text-muted">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-gold" checked={agreed}
                 onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I understand the exam is proctored, runs in fullscreen with my camera on, must be
            finished in one sitting, and that the fee covers one attempt.
          </span>
        </label>

        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={busy}
                className="w-full rounded-lg bg-gold px-6 py-3 font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-60">
          {busy ? 'Opening payment…' : `Pay ₹${exam.priceRupees.toLocaleString('en-IN')} and register`}
        </button>
        <p className="text-center text-xs text-muted">
          Secure payment via Razorpay. Your exam link arrives by email within a minute.
        </p>
      </div>
    </form>
  );
}
