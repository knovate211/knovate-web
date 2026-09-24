'use client';
import { useState } from 'react';
import { submitEnquiry } from '@/lib/api';

// Lead form for companies interested in the hiring-test platform. It posts to
// the same public /api/inquiries endpoint as the learner form, adding company
// details, so the lead lands in the admin panel's Enquiries list tagged
// source "hire_demo". An admin then sets up the company and recruiter logins.

const sizes = ['1–50', '51–200', '201–1,000', '1,000+'];
const volumes = ['Under 10', '10–50', '50–200', '200+'];
const needs = ['Hiring assessments', 'Campus hiring drive', 'Employee skill tests', 'Something else'];

export default function CompanyEnquiryForm({ source = 'hire_demo' }: { source?: string }) {
  const [f, setF] = useState({
    name: '', email: '', phone: '', company: '', job_title: '',
    company_size: '', hiring_volume: '', interest: needs[0], message: '',
  });
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!f.name.trim() || !f.email.trim() || !f.company.trim()) {
      setError('Please enter your name, work email and company.');
      return;
    }
    setStatus('sending');
    try {
      await submitEnquiry({
        name: f.name.trim(),
        email: f.email.trim(),
        phone: f.phone.trim(),
        company: f.company.trim(),
        job_title: f.job_title.trim() || undefined,
        company_size: f.company_size || undefined,
        hiring_volume: f.hiring_volume || undefined,
        interest: f.interest,
        message: f.message.trim() || undefined,
        source,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        website,
      });
      setStatus('done');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-xl border border-sage/40 bg-sage/10 p-6 text-center">
        <div className="font-serif text-xl font-semibold text-ink">Thanks, we&apos;ve got it.</div>
        <p className="mt-2 text-sm text-muted">
          Our team will get back to you, usually within a day, to set up your company account.
        </p>
      </div>
    );
  }

  const field = 'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';
  const label = 'mb-1.5 block text-xs font-semibold text-ink';

  return (
    <form onSubmit={submit} className="relative space-y-4" noValidate>
      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="hire-website">Website</label>
        <input id="hire-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="hire-name">Your name *</label>
          <input id="hire-name" className={field} autoComplete="name" value={f.name} onChange={set('name')} />
        </div>
        <div>
          <label className={label} htmlFor="hire-email">Work email *</label>
          <input id="hire-email" type="email" className={field} autoComplete="email" value={f.email} onChange={set('email')} />
        </div>
        <div>
          <label className={label} htmlFor="hire-company">Company *</label>
          <input id="hire-company" className={field} autoComplete="organization" value={f.company} onChange={set('company')} />
        </div>
        <div>
          <label className={label} htmlFor="hire-title">Your role</label>
          <input id="hire-title" className={field} autoComplete="organization-title" placeholder="e.g. Talent Acquisition Lead" value={f.job_title} onChange={set('job_title')} />
        </div>
        <div>
          <label className={label} htmlFor="hire-phone">Phone</label>
          <input id="hire-phone" type="tel" className={field} autoComplete="tel" value={f.phone} onChange={set('phone')} />
        </div>
        <div>
          <label className={label} htmlFor="hire-need">What do you need?</label>
          <select id="hire-need" className={field} value={f.interest} onChange={set('interest')}>
            {needs.map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="hire-size">Company size</label>
          <select id="hire-size" className={field} value={f.company_size} onChange={set('company_size')}>
            <option value="">Select…</option>
            {sizes.map((s) => <option key={s} value={s}>{s} employees</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="hire-volume">Hires per year</label>
          <select id="hire-volume" className={field} value={f.hiring_volume} onChange={set('hiring_volume')}>
            <option value="">Select…</option>
            {volumes.map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="hire-message">Roles you&apos;re hiring for (optional)</label>
        <textarea id="hire-message" className={field} rows={3} placeholder="e.g. 20 Java freshers for our Bengaluru office in November" value={f.message} onChange={set('message')} />
      </div>
      {error && <p className="text-sm text-terracotta" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-gold px-5 py-3 font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Request a demo'}
      </button>
      <p className="text-center text-xs text-muted">We&apos;ll only use these details to contact you about the test platform.</p>
    </form>
  );
}
