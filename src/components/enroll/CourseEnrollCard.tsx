'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EnquiryForm from '@/components/EnquiryForm';
import { getEnrollConfig } from '@/lib/api';
import { inr } from '@/data/pricing';

type Plan = 'self' | 'mentor';

const PLANS: { id: Plan; name: string; blurb: string }[] = [
  { id: 'self', name: 'Self-Paced', blurb: 'Full course, practice and certificate' },
  { id: 'mentor', name: 'Mentor-Led', blurb: 'Plus live classes, projects and placement help' },
];

/**
 * The course page's call to action: choose a plan and go to checkout.
 *
 * Payment itself happens on /enroll, which already knows the course and plan
 * from the link. If online payment is switched off, the card turns back into
 * the enquiry form, so a visitor is never left without a way to sign up.
 */
export default function CourseEnrollCard({
  slug,
  title,
  selfPaced,
  mentorLed,
}: {
  slug: string;
  title: string;
  selfPaced: number;
  mentorLed: number;
}) {
  const [plan, setPlan] = useState<Plan>('mentor');
  // Assume payment is on until the server says otherwise: that is the normal
  // case, and it avoids flashing the enquiry form at every visitor.
  const [paymentsOn, setPaymentsOn] = useState(true);

  useEffect(() => {
    getEnrollConfig()
      .then((c) => setPaymentsOn(c.enabled))
      .catch(() => setPaymentsOn(false));
  }, []);

  if (!paymentsOn) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
        <h2 className="font-serif text-xl font-semibold text-ink">Enquire about this course</h2>
        <p className="mt-1 mb-5 text-sm text-muted">We&apos;ll share the syllabus, next batch dates and EMI options.</p>
        <EnquiryForm source={`course_${slug}`} defaultInterest={title} compact />
      </div>
    );
  }

  const price = plan === 'self' ? selfPaced : mentorLed;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
      <h2 className="font-serif text-xl font-semibold text-ink">Enroll in this course</h2>
      <p className="mt-1 mb-5 text-sm text-muted">Choose a plan, pay online, and start learning today.</p>

      <fieldset className="space-y-3">
        <legend className="sr-only">Plan</legend>
        {PLANS.map((p) => {
          const amount = p.id === 'self' ? selfPaced : mentorLed;
          const active = plan === p.id;
          return (
            <label
              key={p.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${active ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-ink/15 hover:bg-sand/40'}`}
            >
              <input type="radio" name="plan" checked={active} onChange={() => setPlan(p.id)} className="accent-[#c98a3a]" />
              <span className="flex-1">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  {p.name}
                  {p.id === 'mentor' && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-gold-dark">Popular</span>}
                </span>
                <span className="block text-sm text-muted">{p.blurb}</span>
              </span>
              <span className="font-serif text-xl font-bold text-ink">{inr(amount)}</span>
            </label>
          );
        })}
      </fieldset>

      <Link
        href={`/enroll?course=${slug}&plan=${plan}`}
        className="mt-6 block w-full rounded-lg bg-gold px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-gold-dark"
      >
        Enroll &amp; pay {inr(price)}
      </Link>
      <p className="mt-3 text-center text-xs text-muted">One-time fee · UPI, cards, netbanking · Secure payment by Cashfree</p>
      <p className="mt-4 text-center text-sm text-muted">
        Questions first?{' '}
        <Link href="/contact" className="font-semibold text-gold-dark hover:underline">Talk to an advisor</Link>
      </p>
    </div>
  );
}
