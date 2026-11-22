'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EnquiryForm from '@/components/EnquiryForm';
import { getEnrollConfig } from '@/lib/api';
import { inr } from '@/data/pricing';

/**
 * The course page's call to action: go to checkout.
 *
 * Payment itself happens on /enroll, which already knows the course from the
 * link. If online payment is switched off, the card turns back into
 * the enquiry form, so a visitor is never left without a way to sign up.
 */
export default function CourseEnrollCard({
  slug,
  title,
  fee,
}: {
  slug: string;
  title: string;
  fee: number;
}) {
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

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
      <h2 className="font-serif text-xl font-semibold text-ink">Enroll in this course</h2>
      <p className="mt-1 mb-5 text-sm text-muted">Pay online and start learning today.</p>

      <div className="flex items-baseline justify-between gap-3 rounded-lg border border-gold bg-gold/5 p-4 ring-1 ring-gold">
        <span>
          <span className="block font-semibold text-ink">Full course</span>
          <span className="block text-sm text-muted">Live classes, projects, mentor support and placement help</span>
        </span>
        <span className="font-serif text-xl font-bold text-ink">{inr(fee)}</span>
      </div>

      <Link
        href={`/enroll?course=${slug}`}
        className="mt-6 block w-full rounded-lg bg-gold px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-gold-dark"
      >
        Enroll &amp; pay {inr(fee)}
      </Link>
      <p className="mt-3 text-center text-xs text-muted">One-time fee · UPI, cards, netbanking · Secure payment by Cashfree</p>
      <p className="mt-4 text-center text-sm text-muted">
        Questions first?{' '}
        <Link href="/contact" className="font-semibold text-gold-dark hover:underline">Talk to an advisor</Link>
      </p>
    </div>
  );
}
