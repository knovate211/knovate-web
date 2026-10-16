'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The credential ID box on /verify.
 *
 * It navigates to /verify/{id} rather than fetching here, so a checked
 * credential has a URL the employer can keep, forward or attach to a record.
 */
export default function VerifyLookup() {
  const router = useRouter();
  const [id, setId] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = id.trim().toUpperCase().replace(/\s+/g, '');
    if (clean) router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  return (
    <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="credential-id">Credential ID</label>
      <input
        id="credential-id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="KNV-XXXX-XXXX"
        autoComplete="off"
        className="flex-1 rounded-lg border border-ink/15 bg-white px-4 py-3 text-center font-mono text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 sm:text-left"
      />
      <button type="submit" className="rounded-lg bg-gold px-7 py-3 font-semibold text-white transition-colors hover:bg-gold-dark">
        Check
      </button>
    </form>
  );
}
