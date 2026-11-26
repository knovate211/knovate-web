import Link from 'next/link';
import { Heading } from '@/components/Section';
import CertificateA from '@/components/certification/CertificateA';

// The two certificates a learner can earn for this program, drawn with the
// same component that renders the real ones.
export default function SampleCertificates({ title }: { title: string }) {
  const issuedAt = new Date().toISOString();
  const samples = [
    {
      label: 'Program completion',
      note: 'Awarded when you finish the program.',
      kind: 'course' as const,
      cta: null,
    },
    {
      label: 'Certification exam',
      note: 'Pass the proctored Knovate exam to earn a verifiable certificate.',
      kind: 'exam' as const,
      cta: { href: '/certifications', text: 'About certification exams →' },
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-content px-5">
        <Heading className="text-center">
          Sample <span className="text-gold-dark">certificates</span>
        </Heading>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          Every certificate has a credential ID and a public page, so employers can check it is genuine.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {samples.map((s) => (
            <figure key={s.label} className="flex flex-col">
              <div className="rounded-xl bg-white p-2 shadow-[0_24px_48px_-24px_rgba(43,38,32,.35)]" aria-hidden="true">
                <CertificateA
                  holderName="Your name here"
                  title={title}
                  scorePercent={0}
                  issuedAt={issuedAt}
                  credentialId="KNV-XXXX-XXXX"
                  kind={s.kind}
                />
              </div>
              <figcaption className="mt-4 text-center">
                <div className="font-semibold text-ink">{s.label}</div>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
                {s.cta && (
                  <Link href={s.cta.href} className="mt-2 inline-block text-sm font-semibold text-gold-dark hover:text-gold">
                    {s.cta.text}
                  </Link>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
