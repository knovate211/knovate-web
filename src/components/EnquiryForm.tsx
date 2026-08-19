'use client';
import { useState } from 'react';
import { submitEnquiry } from '@/lib/api';
import { courses } from '@/data/courses';

// Reusable lead-capture form used across the site. `source` tags which form fired
// (e.g. "home_hero", "course_java", "pricing", "contact") so the admin can see
// where a lead came from. Posts to the public /api/inquiries endpoint.
export default function EnquiryForm({
  source,
  defaultInterest = '',
  compact = false,
}: {
  source: string;
  defaultInterest?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setStatus('sending');
    try {
      await submitEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interest: interest || undefined,
        message: message.trim() || undefined,
        source,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
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
        <div className="font-serif text-xl font-semibold text-ink">Thank you! 🎉</div>
        <p className="mt-2 text-sm text-muted">
          We&apos;ve received your enquiry and our team will reach out shortly.
        </p>
      </div>
    );
  }

  const field = 'w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className={compact ? '' : 'grid gap-4 sm:grid-cols-2'}>
        <input className={field} placeholder="Full name*" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={field} type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={compact ? '' : 'grid gap-4 sm:grid-cols-2'}>
        <input className={field} placeholder="Phone / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <select className={field} value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="">I&apos;m interested in…</option>
          {courses.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
        </select>
      </div>
      {!compact && (
        <textarea className={field} rows={3} placeholder="Your message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} />
      )}
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-gold px-5 py-3 font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Request a callback'}
      </button>
      <p className="text-center text-xs text-muted">No spam. We&apos;ll only use this to contact you about your enquiry.</p>
    </form>
  );
}
