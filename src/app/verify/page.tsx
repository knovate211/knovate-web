import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Section, { Eyebrow, Heading } from '@/components/Section';
import VerifyLookup from '@/components/certification/VerifyLookup';

export const metadata: Metadata = pageMeta({
  title: 'Verify a Knovate Certificate',
  description:
    'Check whether a Knovate certificate is genuine. Enter the credential ID printed on the certificate to see the holder, exam and issue date.',
  path: '/verify',
});

export default function VerifyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <Eyebrow>Credential check</Eyebrow>
        <Heading as="h1">Verify a certificate</Heading>
        <p className="mt-3 text-muted">
          Enter the credential ID printed on the certificate. It looks like{' '}
          <span className="font-mono text-ink">KNV-7F3K-92QD</span>.
        </p>
        <VerifyLookup />
      </div>
    </Section>
  );
}
