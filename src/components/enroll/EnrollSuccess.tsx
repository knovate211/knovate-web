'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ENROLL_HANDOFF_KEY } from './EnrollForm';
import type { EnrollResult } from '@/lib/api';

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173').replace(/\/$/, '');

export default function EnrollSuccess() {
  const [r, setR] = useState<EnrollResult | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ENROLL_HANDOFF_KEY);
      if (raw) setR(JSON.parse(raw));
    } catch {
      /* private mode — show the generic message */
    }
  }, []);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm md:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div>
      <h1 className="mt-5 font-serif text-3xl font-semibold text-ink">You&apos;re enrolled!</h1>
      {r ? (
        <p className="mt-3 text-muted">
          Payment received for <strong className="text-ink">{r.course_name}</strong> ({r.plan_name}).{' '}
          {r.new_account
            ? r.emailed
              ? <>We&apos;ve created your account and emailed your login details to <strong className="text-ink">{r.email}</strong>.</>
              : <>We&apos;ve created your account for <strong className="text-ink">{r.email}</strong>. Our team will send your login details shortly.</>
            : <>The course has been added to your existing account, <strong className="text-ink">{r.email}</strong>.</>}
        </p>
      ) : (
        <p className="mt-3 text-muted">Payment received. Your login details are on their way to your email.</p>
      )}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href={`${APP_URL}/login`} className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-2.5 font-semibold text-white hover:bg-gold-dark">
          Sign in and start learning
        </a>
        <Link href="/courses" className="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-white px-5 py-2.5 font-semibold text-ink hover:bg-sand">
          Browse more courses
        </Link>
      </div>
      <p className="mt-6 text-xs text-muted">Can&apos;t find the email? Check your spam folder, or contact us and quote your payment receipt.</p>
    </div>
  );
}
