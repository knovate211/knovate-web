'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HANDOFF_KEY } from './ScholarshipForm';

interface Handoff {
  email: string;
  courseName: string;
  assessment?: { title: string; durationMinutes: number; totalMarks: number };
}

/**
 * What an applicant sees after submitting.
 *
 * The test link is deliberately NOT here. It is emailed, and only emailed —
 * the same shape as every other assessment invitation a candidate has met, and
 * it means the link lives somewhere they can come back to rather than in a tab
 * they are one refresh away from losing. It also proves the address before
 * anyone spends an hour on a paper: a typo surfaces now, while it is a
 * re-application, instead of after the result is sitting in nobody's inbox.
 *
 * Landing here without a handoff — a refresh, a bookmark, a shared link — is
 * normal and gets the same instruction, because the instruction does not depend
 * on knowing who they are.
 */
export default function ApplicationReceived() {
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(HANDOFF_KEY);
      if (raw) setHandoff(JSON.parse(raw) as Handoff);
      // Read once. Nothing here is worth keeping for a second visit.
      sessionStorage.removeItem(HANDOFF_KEY);
    } catch {
      /* unavailable or malformed storage — the page still works */
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-lg md:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/20">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8ba888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 6h16v12H4z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      </div>

      <h1 className="mt-5 font-serif text-3xl font-semibold text-ink">Check your email</h1>

      <p className="mt-3 text-muted">
        {handoff?.email ? (
          <>
            We&apos;ve sent your test link to{' '}
            <strong className="text-ink">{handoff.email}</strong>.
          </>
        ) : (
          <>We&apos;ve sent your test link to the address you applied with.</>
        )}{' '}
        Open it when you&apos;re ready to begin.
      </p>

      {handoff?.assessment && (
        <div className="mt-6 rounded-xl border border-ink/10 bg-sand/40 px-5 py-4 text-left">
          <div className="font-semibold text-ink">{handoff.assessment.title}</div>
          <div className="mt-1 text-sm text-muted">
            {handoff.assessment.durationMinutes} minutes · {handoff.assessment.totalMarks} marks ·
            one attempt · multiple choice and live coding
          </div>
        </div>
      )}

      <ul className="mt-6 space-y-2.5 text-left text-sm text-muted">
        <li className="flex gap-2.5">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span>
            The link works for <strong className="text-ink">3 days</strong>. The clock only starts
            when you open the test, so there&apos;s no rush to click it.
          </span>
        </li>
        <li className="flex gap-2.5">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span>Sit it on a laptop or desktop, in one go, with a stable connection.</span>
        </li>
        <li className="flex gap-2.5">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span>
            Nothing there after a few minutes? Check spam — and if it&apos;s still missing, apply
            again with the same address and we&apos;ll send a fresh link.
          </span>
        </li>
      </ul>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/scholarship/apply"
          className="rounded-lg border border-ink/15 bg-white px-5 py-2.5 font-semibold text-ink hover:bg-sand"
        >
          Resend my link
        </Link>
        <Link
          href="/courses"
          className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-white hover:bg-gold-dark"
        >
          Browse the courses
        </Link>
      </div>
    </div>
  );
}
