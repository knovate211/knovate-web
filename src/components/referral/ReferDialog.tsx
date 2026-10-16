'use client';
import { useEffect, useState } from 'react';
import {
  getCertificationConfig,
  joinReferralProgram,
  type CertificationExam,
  type ReferralConfig,
  type ReferralLink,
} from '@/lib/api';
import { courses } from '@/data/courses';

const field =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';
const label = 'mb-1.5 block text-sm font-semibold text-ink';

/**
 * Three fields, then a link.
 *
 * Every extra question here costs referrals, so it asks for a name (what the
 * friend sees), an email (where the link and the payout notice go) and a phone
 * number (how finance reaches them about a payout) — and nothing else.
 *
 * Asking twice with the same address returns the same link rather than a second
 * one: two codes would split someone's referrals and their payout.
 */
/**
 * What a referrer is sending someone to.
 *
 * One code, many destinations: splitting the code per course would fragment a
 * referrer's earnings and give them several links to keep track of. The code
 * identifies the person; `to` says what they were recommending.
 */
interface ShareTarget {
  /** Path the friend lands on. Empty means the courses page. */
  to: string;
  /** What the referrer is recommending, in the share message. */
  label: string;
  /** What they earn if the friend buys this, in rupees. */
  reward: number;
  kind: 'course' | 'exam' | 'all';
}

export default function ReferDialog({
  config,
  onClose,
  defaultTo = '',
}: {
  config: ReferralConfig;
  onClose: () => void;
  /** Pre-selects a destination, e.g. from a "Refer this course" button. */
  defaultTo?: string;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReferralLink | null>(null);
  const [copied, setCopied] = useState(false);
  const [exams, setExams] = useState<CertificationExam[]>([]);
  const [target, setTarget] = useState(defaultTo);

  // Exams are configured in the admin panel, so the picker has to ask. A
  // failure here just leaves the courses in the list.
  useEffect(() => {
    getCertificationConfig()
      .then((c) => setExams(c.exams))
      .catch(() => setExams([]));
  }, []);

  // Escape closes, like every other dialog on the site.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please enter your name — your friends will see it.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email — your link is sent there.');
    if (!/^[+\d][\d\s-]{7,}$/.test(phone.trim())) return setError('Please enter a phone number we can reach you on about payouts.');
    setBusy(true);
    try {
      setResult(await joinReferralProgram({
        name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), website,
      }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy automatically — select the link and copy it.');
    }
  };

  const targets: ShareTarget[] = [
    { to: '', label: 'Knovate courses', reward: config.courseRewardRupees, kind: 'all' },
    ...courses.map((c) => ({
      to: `/courses/${c.slug}`,
      label: `the ${c.title} course`,
      reward: config.courseRewardRupees,
      kind: 'course' as const,
    })),
    ...(exams.length
      ? [{ to: '/certifications', label: 'Knovate certification exams', reward: config.examRewardRupees, kind: 'exam' as const }]
      : []),
    ...exams.map((e) => ({
      to: `/certifications/${e.slug}`,
      label: `the ${e.title} exam`,
      reward: config.examRewardRupees,
      kind: 'exam' as const,
    })),
  ];
  const chosen = targets.find((t) => t.to === target) ?? targets[0];

  // The destination rides on the link, so the friend lands on the thing that
  // was recommended rather than a general page they have to search.
  const shareLink = result ? (chosen.to ? `${result.link}?to=${encodeURIComponent(chosen.to)}` : result.link) : '';
  const shareText = result
    ? `I'm learning with Knovate — take a look at ${chosen.label}. Use my link for ${config.friendDiscountPercent}% off your first course or exam: ${shareLink}`
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 text-left backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="refer-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl md:p-8">
        {!result ? (
          <form onSubmit={submit} noValidate>
            <h2 id="refer-title" className="font-serif text-2xl font-semibold text-ink">Refer a friend, get paid</h2>
            <p className="mt-2 text-sm text-muted">
              They get {config.friendDiscountPercent}% off their first course or exam. You get
              ₹{config.courseRewardRupees.toLocaleString('en-IN')} when they enrol on a course, or
              ₹{config.examRewardRupees.toLocaleString('en-IN')} for a certification exam — paid by UPI.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className={label} htmlFor="refer-name">Your name *</label>
                <input id="refer-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </div>
              <div>
                <label className={label} htmlFor="refer-email">Your email *</label>
                <input id="refer-email" type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div>
                <label className={label} htmlFor="refer-phone">Your phone *</label>
                <input id="refer-phone" type="tel" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+91 " />
              </div>

              <div className="hidden" aria-hidden>
                <label htmlFor="refer-website">Website</label>
                <input id="refer-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

              <div className="flex gap-3">
                <button type="button" onClick={onClose}
                        className="rounded-lg border border-ink/15 px-5 py-2.5 font-semibold text-ink hover:bg-sand">
                  Cancel
                </button>
                <button type="submit" disabled={busy}
                        className="flex-1 rounded-lg bg-gold px-5 py-2.5 font-semibold text-white hover:bg-gold-dark disabled:opacity-60">
                  {busy ? 'Creating…' : 'Get my link'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <h2 id="refer-title" className="font-serif text-2xl font-semibold text-ink">
              {result.created ? 'Your link is ready' : 'Here is your link'}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {result.created
                ? 'We have emailed it to you as well, so you will not lose it.'
                : 'You already had one — this is the same link, so your referrals stay in one place.'}
            </p>

            <div className="mt-5">
              <label className={label} htmlFor="refer-target">What are you recommending?</label>
              <select
                id="refer-target"
                className={field}
                value={chosen.to}
                onChange={(e) => setTarget(e.target.value)}
              >
                {targets.map((t) => (
                  <option key={t.to || 'all'} value={t.to}>
                    {t.kind === 'all' ? 'Knovate courses (general)' : t.label.replace(/^the /, '')}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-muted">
                Your friend lands straight on it — and you earn ₹{chosen.reward.toLocaleString('en-IN')} if they buy it.
                The same code works for anything else they buy too.
              </p>
            </div>

            <div className="mt-4 rounded-xl bg-sand/60 p-4">
              <p className="break-all font-mono text-sm text-gold-dark">{shareLink}</p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"
                 className="rounded-lg bg-[#25D366] px-4 py-2.5 text-center text-sm font-semibold text-white hover:brightness-95">
                WhatsApp
              </a>
              <button onClick={copy}
                      className="rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sand">
                {copied ? 'Copied' : 'Copy link'}
              </button>
              <a href={`mailto:?subject=${encodeURIComponent('Learn with Knovate')}&body=${encodeURIComponent(shareText)}`}
                 className="rounded-lg border border-ink/15 px-4 py-2.5 text-center text-sm font-semibold text-ink hover:bg-sand">
                Email
              </a>
            </div>

            <p className="mt-5 text-xs text-muted">
              Your code is <strong className="text-ink">{result.code}</strong>. Check your referrals
              any time at <span className="text-ink">/referrals/status</span> with this code and your
              email address. We review each referral before paying.
            </p>

            <button onClick={onClose} className="mt-5 w-full rounded-lg bg-gold px-5 py-2.5 font-semibold text-white hover:bg-gold-dark">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
