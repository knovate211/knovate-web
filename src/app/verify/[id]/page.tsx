import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import { checkCredential } from '@/lib/api';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return {
    title: `Verify ${params.id.toUpperCase()}`,
    description: 'Check whether a Knovate certificate is genuine.',
    // A credential page is for whoever holds the link, not for search engines:
    // indexing them would publish a list of certificate holders.
    robots: { index: false, follow: false },
  };
}

/**
 * The public face of a certificate — what an employer opens.
 *
 * It answers one question, so it shows one answer, large. It deliberately
 * exposes only what is printed on the certificate itself: holder, exam, date,
 * score. No email, no phone, no attempt detail.
 */
export default async function VerifyCredentialPage({ params }: { params: { id: string } }) {
  const id = params.id.toUpperCase();

  let result;
  try {
    result = await checkCredential(id);
  } catch {
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-3xl font-semibold text-ink">We could not check that credential</h1>
          <p className="mt-3 text-muted">
            Something went wrong on our side. Please try again in a moment, or{' '}
            <Link href="/contact" className="font-semibold text-gold-dark">contact us</Link>.
          </p>
        </div>
      </Section>
    );
  }

  if (!result.found) {
    return (
      <Section>
        <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">✕</div>
          <h1 className="mt-5 font-serif text-2xl font-semibold text-ink">No certificate with this ID</h1>
          <p className="mt-3 text-muted">
            We have no record of <span className="font-mono text-ink">{id}</span>. Check the ID for
            typos — they are printed as KNV-XXXX-XXXX.
          </p>
          <p className="mt-5 text-sm text-muted">
            Still not right?{' '}
            <Link href="/contact" className="font-semibold text-gold-dark">Tell us</Link> and we
            will look into it.
          </p>
        </div>
      </Section>
    );
  }

  const revoked = result.revoked;

  return (
    <Section>
      <div className="mx-auto max-w-xl">
        <div className={`rounded-2xl border p-8 text-center ${revoked ? 'border-red-200 bg-red-50/60' : 'border-ink/10 bg-white'}`}>
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
            revoked ? 'bg-red-100 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {revoked ? '✕' : '✓'}
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-muted">
            {revoked ? 'This certificate has been revoked' : 'Verified certificate'}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-ink">{result.holderName}</h1>
          <p className="mt-2 text-lg text-muted">{result.title}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 pt-6 text-left">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Credential ID</dt>
              <dd className="mt-1 font-mono text-sm text-ink">{result.credentialId}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Issued</dt>
              <dd className="mt-1 text-ink">{result.issuedAt}</dd>
            </div>
            {!revoked && result.scorePercent !== undefined && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Score</dt>
                <dd className="mt-1 text-ink">{result.scorePercent}%</dd>
              </div>
            )}
            {revoked && (
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Reason</dt>
                <dd className="mt-1 text-ink">{result.revokeReason}</dd>
              </div>
            )}
          </dl>

          {revoked && (
            <p className="mt-6 rounded-lg bg-white px-4 py-3 text-sm text-red-800">
              This credential is no longer valid and should not be accepted as proof of
              certification.
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Issued by Knovate.{' '}
          <Link href="/certifications" className="font-semibold text-gold-dark">See our exams</Link>.
        </p>
      </div>
    </Section>
  );
}
