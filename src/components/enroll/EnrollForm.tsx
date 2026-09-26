'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EnquiryForm from '@/components/EnquiryForm';
import { pricedCourses, inr } from '@/data/pricing';
import { courses } from '@/data/courses';
import {
  getEnrollConfig,
  createEnrollOrder,
  verifyEnrollPayment,
  heldReferralCode,
  type EnrollConfig,
} from '@/lib/api';

export const ENROLL_HANDOFF_KEY = 'knovate.enroll.result';

const field =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';
const label = 'mb-1.5 block text-sm font-semibold text-ink';

type Plan = 'self' | 'mentor';

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (ev: string, cb: (r: any) => void) => void };
  }
}

// Razorpay's checkout script, loaded once, only when the student is ready to pay.
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
 * Online enrolment. The fee shown comes from data/pricing.ts; the amount
 * actually charged is decided by the server when the order is created, and
 * that server amount is what the Pay button and the Razorpay window show.
 */
export default function EnrollForm({ defaultCourse = '', defaultPlan = 'mentor' }: { defaultCourse?: string; defaultPlan?: Plan }) {
  const router = useRouter();
  const groups = useMemo(() => pricedCourses(), []);
  const bySlug = (slug: string) => courses.find((c) => c.slug === slug || c.id === slug);

  const [config, setConfig] = useState<EnrollConfig | null>(null);
  const [configError, setConfigError] = useState(false);
  const [courseId, setCourseId] = useState(bySlug(defaultCourse)?.id ?? '');
  const [plan, setPlan] = useState<Plan>(defaultPlan);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // Set from the server's reply, so the summary shows the discount that was
  // actually applied rather than one the browser hoped for.
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [refCode, setRefCode] = useState('');

  useEffect(() => { setRefCode(heldReferralCode()); }, []);

  useEffect(() => {
    getEnrollConfig().then(setConfig).catch(() => setConfigError(true));
  }, []);

  const group = groups.find((g) => g.courseIds.includes(courseId));
  const course = courses.find((c) => c.id === courseId);
  const price = group ? (plan === 'self' ? group.selfPaced : group.mentorLed) : 0;

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!courseId) return setError('Choose the course you want to join.');
    if (!name.trim()) return setError('Please enter your name.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email — your login is sent there.');
    if (!/^[+\d][\d\s-]{7,}$/.test(phone.trim())) return setError('Please enter a phone number we can reach you on.');
    if (!agreed) return setError('Please accept the terms to continue.');

    setBusy(true);
    try {
      const [order] = await Promise.all([
        createEnrollOrder({
          course_id: courseId,
          plan,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          // Whoever sent them, if anyone. The server decides what it is worth;
          // an invalid or self-referring code simply costs nothing.
          referral_code: heldReferralCode(),
        }),
        loadCheckout(),
      ]);
      if (order.referral_discount) {
        setReferralDiscount(order.referral_discount / 100);
      }
      const rzp = new window.Razorpay!({
        key: order.key_id,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Knovate',
        description: `${order.course_name} · ${order.plan_name}`,
        prefill: order.prefill,
        notes: { course: order.course_name, plan: order.plan_name },
        theme: { color: '#c98a3a' },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const result = await verifyEnrollPayment(resp);
            try { sessionStorage.setItem(ENROLL_HANDOFF_KEY, JSON.stringify(result)); } catch { /* ignore */ }
            router.push('/enroll/success');
          } catch (err: any) {
            setError(`${err.message} Payment id: ${resp.razorpay_payment_id}`);
            setBusy(false);
          }
        },
      });
      rzp.on('payment.failed', (r: any) => {
        setError(r?.error?.description ? `Payment failed: ${r.error.description}` : 'Payment failed. No money was taken — please try again.');
        setBusy(false);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      setBusy(false);
    }
  };

  if (!config && !configError) {
    return <div className="h-96 animate-pulse rounded-2xl border border-ink/10 bg-white" />;
  }

  // Online payment switched off (no Razorpay keys) or the API is down:
  // fall back to a callback request so the student is never stuck.
  if (configError || !config?.enabled) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-9">
        <h2 className="font-serif text-2xl font-semibold text-ink">Request enrolment</h2>
        <p className="mt-1 mb-5 text-sm text-muted">
          Online payment isn&apos;t available right now. Leave your details and an advisor will call you to complete your enrolment
          {course ? <> in <strong className="text-ink">{course.title}</strong></> : null}.
        </p>
        <EnquiryForm source="enroll" defaultInterest={course?.title ?? ''} />
      </div>
    );
  }

  return (
    <form onSubmit={pay} noValidate className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div className="space-y-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
        {config.test_mode && (
          <p className="rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
            Test mode — use Razorpay test cards or UPI <code>success@razorpay</code>. No real money is charged.
          </p>
        )}

        <div>
          <label className={label} htmlFor="course">Course *</label>
          <select id="course" className={field} value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            <option value="" disabled>Select a course…</option>
            {groups.map((g) => (
              <optgroup key={g.key} label={g.name}>
                {g.courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className={label}>Plan *</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['self', 'mentor'] as Plan[]).map((p) => {
              const amount = group ? (p === 'self' ? group.selfPaced : group.mentorLed) : null;
              return (
                <label
                  key={p}
                  className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${plan === p ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-ink/15 hover:bg-sand/40'}`}
                >
                  <span className="flex items-center gap-2">
                    <input type="radio" name="plan" checked={plan === p} onChange={() => setPlan(p)} className="accent-[#c98a3a]" />
                    <span className="font-semibold text-ink">{p === 'self' ? 'Self-Paced' : 'Mentor-Led'}</span>
                    {p === 'mentor' && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-gold-dark">Popular</span>}
                  </span>
                  <span className="mt-1 pl-6 text-sm text-muted">
                    {p === 'self' ? 'Full course, practice and certificate' : 'Plus live classes, projects and placement help'}
                  </span>
                  <span className="mt-2 pl-6 font-serif text-xl font-bold text-ink">{amount != null ? inr(amount) : '—'}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="name">Full name *</label>
            <input id="name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div>
            <label className={label} htmlFor="phone">Phone / WhatsApp *</label>
            <input id="phone" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <p className="mt-1 text-xs text-muted">Your login details are sent here. Already a student? Use the same email and the course is added to your account.</p>
        </div>

        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-[#c98a3a]" />
          <span>I agree to Knovate&apos;s terms, and understand the fee is a one-time payment for the selected course and plan.</span>
        </label>
      </div>

      {/* Order summary */}
      <aside className="h-fit rounded-2xl border border-gold/40 bg-white p-6 shadow-sm md:sticky md:top-24">
        <h2 className="font-serif text-lg font-semibold text-ink">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3"><dt className="text-muted">Course</dt><dd className="text-right font-medium text-ink">{course?.title ?? '—'}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-muted">Plan</dt><dd className="font-medium text-ink">{plan === 'self' ? 'Self-Paced' : 'Mentor-Led'}</dd></div>
          {course && <div className="flex justify-between gap-3"><dt className="text-muted">Duration</dt><dd className="font-medium text-ink">{course.duration}</dd></div>}
        </dl>
        {refCode && price > 0 && (
          <div className="mt-3 flex justify-between gap-3 text-sm">
            <dt className="text-muted">Referral ({refCode})</dt>
            <dd className="font-medium text-sage">
              {referralDiscount > 0 ? `− ${inr(referralDiscount)}` : 'applied at payment'}
            </dd>
          </div>
        )}
        <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
          <span className="text-sm text-muted">Total</span>
          <span className="font-serif text-3xl font-bold text-ink">
            {price ? inr(Math.max(0, price - referralDiscount)) : '—'}
          </span>
        </div>
        {error && <p className="mt-4 rounded-lg bg-terracotta/10 px-3 py-2 text-sm text-terracotta">{error}</p>}
        <button
          type="submit"
          disabled={busy || !courseId}
          className="mt-5 w-full rounded-lg bg-gold px-5 py-3 font-semibold text-white transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? 'Opening payment…' : price ? `Pay ${inr(price)}` : 'Choose a course'}
        </button>
        <p className="mt-3 text-center text-xs text-muted">Secure payment by Razorpay · UPI, cards, netbanking</p>
        <p className="mt-4 text-center text-xs text-muted">
          Want to pay less? <Link href="/scholarship" className="font-semibold text-gold-dark hover:underline">Try the scholarship test</Link>
        </p>
      </aside>
    </form>
  );
}
