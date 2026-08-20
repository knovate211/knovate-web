'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  applyForScholarship,
  getScholarshipPrograms,
  type ScholarshipProgram,
} from '@/lib/api';

/**
 * The scholarship application.
 *
 * The course list is fetched rather than hardcoded: the backend only returns a
 * programme whose paper is published, inside its window and not full, so this
 * cannot offer a course the submit would then reject. If the list comes back
 * empty we say applications are closed instead of showing a picker that leads
 * nowhere.
 *
 * The response carries a one-time claim URL, and this deliberately throws it
 * away: the link reaches the candidate by email and nowhere else. That keeps
 * the credential out of browser history and out of a tab they are one refresh
 * away from losing, and it proves the address works before anyone commits an
 * hour to a paper — a typo surfaces now, as a re-application, rather than after
 * the result is sitting in an inbox nobody owns.
 *
 * Only what the confirmation page needs to say goes into sessionStorage.
 */

export const HANDOFF_KEY = 'knovate.scholarship.handoff';

const field =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';
const label = 'mb-1.5 block text-sm font-semibold text-ink';

const thisYear = new Date().getFullYear();

export default function ScholarshipForm({ defaultCourseId = '' }: { defaultCourseId?: string }) {
  const router = useRouter();

  const [programs, setPrograms] = useState<ScholarshipProgram[] | null>(null);
  const [loadError, setLoadError] = useState('');

  const [courseId, setCourseId] = useState(defaultCourseId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [city, setCity] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot

  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getScholarshipPrograms();
        if (cancelled) return;
        setPrograms(list);
        // Preselect when there is no real choice to make.
        if (list.length === 1) setCourseId(list[0].courseId);
        else if (defaultCourseId && list.some((p) => p.courseId === defaultCourseId)) {
          setCourseId(defaultCourseId);
        }
      } catch {
        if (!cancelled) setLoadError('We could not load the open courses just now.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [defaultCourseId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Please tell us your name.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address — your test link goes there.');
    if (!courseId) return setError('Please choose the course you want to apply for.');
    if (!agreed) return setError('Please confirm you understand this is a one-attempt test.');

    setStatus('sending');
    try {
      // Attribution, read at submit time so it reflects the landing URL.
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const utm: Record<string, string> = {};
      params?.forEach((v, k) => {
        if (k.startsWith('utm_')) utm[k] = v;
      });

      const year = parseInt(graduationYear, 10);
      const result = await applyForScholarship({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        courseId,
        qualification: qualification.trim() || undefined,
        college: college.trim() || undefined,
        graduationYear: Number.isFinite(year) ? year : undefined,
        city: city.trim() || undefined,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        utm: Object.keys(utm).length ? utm : undefined,
        website,
      });

      const chosen = programs?.find((p) => p.courseId === courseId);
      // Note what is absent: result.testUrl. It is not stored, not put in the
      // URL, and not shown — the email is the only route in.
      sessionStorage.setItem(
        HANDOFF_KEY,
        JSON.stringify({
          email: email.trim().toLowerCase(),
          courseName: chosen?.courseName ?? '',
          assessment: result.assessment,
        }),
      );
      router.push('/scholarship/submitted');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (loadError) {
    return (
      <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-8 text-center">
        <p className="font-semibold text-ink">{loadError}</p>
        <p className="mt-2 text-sm text-muted">
          Please refresh, or{' '}
          <Link href="/contact" className="font-semibold text-gold-dark underline">
            talk to our team
          </Link>{' '}
          and we will sort it out for you.
        </p>
      </div>
    );
  }

  if (programs && programs.length === 0) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold text-ink">Applications are closed right now</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          The next scholarship round has not opened yet. Leave us your details and we will tell you
          the moment it does.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex rounded-lg bg-gold px-5 py-2.5 font-semibold text-white hover:bg-gold-dark"
        >
          Tell me when it opens
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <fieldset>
        <legend className={label}>Which course? *</legend>
        {!programs ? (
          <div className="h-[58px] animate-pulse rounded-lg border border-ink/10 bg-sand/60" />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {programs.map((p) => (
              <label
                key={p.courseId}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                  courseId === p.courseId
                    ? 'border-gold bg-gold/5 ring-1 ring-gold'
                    : 'border-ink/15 bg-white hover:bg-sand/40'
                }`}
              >
                <input
                  type="radio"
                  name="courseId"
                  value={p.courseId}
                  checked={courseId === p.courseId}
                  onChange={() => setCourseId(p.courseId)}
                  className="mt-1 accent-[#c98a3a]"
                />
                <span>
                  <span className="block font-semibold text-ink">{p.courseName}</span>
                  <span className="block text-xs text-muted">
                    {p.durationMinutes} min · {p.sectionSummary || `${p.totalMarks} marks`}
                    {typeof p.seatsLeft === 'number' && p.seatsLeft <= 20 && (
                      <span className="ml-1 font-semibold text-terracotta">
                        · {p.seatsLeft} place{p.seatsLeft === 1 ? '' : 's'} left
                      </span>
                    )}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Full name *</label>
          <input id="name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <p className="mt-1 text-xs text-muted">Your test link is sent here.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div>
          <label className={label} htmlFor="city">City</label>
          <input id="city" className={field} value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className={label} htmlFor="qualification">Highest qualification</label>
          <select id="qualification" className={field} value={qualification} onChange={(e) => setQualification(e.target.value)}>
            <option value="">Select…</option>
            <option>School / Class 12</option>
            <option>Diploma</option>
            <option>Bachelor&apos;s degree</option>
            <option>Master&apos;s degree</option>
            <option>Other</option>
          </select>
        </div>
        <div className="sm:col-span-1">
          <label className={label} htmlFor="college">College / school</label>
          <input id="college" className={field} value={college} onChange={(e) => setCollege(e.target.value)} />
        </div>
        <div className="sm:col-span-1">
          <label className={label} htmlFor="graduationYear">Graduation year</label>
          <input
            id="graduationYear"
            className={field}
            inputMode="numeric"
            placeholder={String(thisYear)}
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink/15 bg-white p-4">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-[#c98a3a]" />
        <span className="text-sm text-muted">
          I understand my test link will be <strong className="text-ink">emailed to me</strong>, and
          that it is a <strong className="text-ink">timed test with one attempt</strong> whose clock
          keeps running if I close the tab. I will sit it on a laptop or desktop.
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-lg border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-sm font-semibold text-terracotta">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || !programs}
        className="w-full rounded-lg bg-gold px-5 py-3.5 font-semibold text-white transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending your test link…' : 'Apply and email me the test link'}
      </button>
      <p className="text-center text-xs text-muted">
        Free to apply. No documents, no application fee, no obligation to enrol.
      </p>
    </form>
  );
}
