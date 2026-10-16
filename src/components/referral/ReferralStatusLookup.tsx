'use client';
import { useState } from 'react';
import { getReferralStatus, type ReferralStatus } from '@/lib/api';

const field =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';

const STATUS_COPY: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Being checked', cls: 'bg-sand text-gold-dark' },
  approved: { label: 'Approved — payout due', cls: 'bg-sage/20 text-sage' },
  paid: { label: 'Paid', cls: 'bg-sage/20 text-sage' },
  reversed: { label: 'Cancelled (refunded)', cls: 'bg-terracotta/10 text-terracotta' },
};

/**
 * A referrer's own view of their referrals.
 *
 * Both the code and the matching email are required, because the code travels
 * in every link they share. Friends appear by first name only: the referrer
 * introduced them, which does not entitle them to the address they bought with.
 */
export default function ReferralStatusLookup() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<ReferralStatus | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      setData(await getReferralStatus(code.trim(), email.trim().toLowerCase()));
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor="ref-code">Referral code</label>
        <input id="ref-code" className={field} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Your code" />
        <label className="sr-only" htmlFor="ref-email">Email</label>
        <input id="ref-email" type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <button type="submit" disabled={busy} className="rounded-lg bg-gold px-6 py-2.5 font-semibold text-white hover:bg-gold-dark disabled:opacity-60">
          {busy ? 'Checking…' : 'Check'}
        </button>
      </form>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {data && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              ['Link opened', `${data.clicks}`],
              ['Friends joined', `${data.conversions}`],
              ['Earned', `₹${data.earnedRupees.toLocaleString('en-IN')}`],
              ['Paid out', `₹${data.paidRupees.toLocaleString('en-IN')}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-ink/10 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-ink">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-sand/60 p-4 text-sm text-muted">
            Your link: <span className="break-all font-mono text-gold-dark">{data.link}</span>
          </div>

          {data.referrals.length === 0 ? (
            <p className="mt-6 rounded-xl border border-ink/10 bg-white p-6 text-center text-muted">
              No referrals yet. Rewards appear here once a friend pays for a course or an exam.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
              {data.referrals.map((r, i) => {
                const s = STATUS_COPY[r.status] ?? { label: r.status, cls: 'bg-sand text-muted' };
                return (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-semibold text-ink">{r.friend} · {r.item}</p>
                      <p className="text-xs text-muted">{r.at}{r.paidAt ? ` · paid ${r.paidAt}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.cls}`}>{s.label}</span>
                      <span className="font-serif text-lg font-semibold text-ink">₹{r.rewardRupees.toLocaleString('en-IN')}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
