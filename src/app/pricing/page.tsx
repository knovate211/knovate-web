import type { Metadata } from 'next';
import Section, { Eyebrow, Heading } from '@/components/Section';
import Button from '@/components/Button';
import FAQ from '@/components/FAQ';
import { plans, faqs } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for Knovate career tracks — self-paced, mentor-led and full career-track plans.',
};

export default function PricingPage() {
  return (
    <>
      <Section className="bg-sand/50 text-center !pb-10">
        <Eyebrow>Pricing</Eyebrow>
        <Heading>Invest in your career</Heading>
        <p className="mx-auto mt-3 max-w-xl text-muted">Flexible plans for every kind of learner. No hidden fees — talk to us for EMI options.</p>
      </Section>
      <Section className="!pt-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-8 ${p.highlighted ? 'border-gold bg-white shadow-xl ring-1 ring-gold' : 'border-ink/10 bg-white'}`}
            >
              {p.highlighted && <span className="mb-3 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold-dark">Most popular</span>}
              <h3 className="font-serif text-2xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <div className="mt-5">
                <span className="font-serif text-4xl font-bold text-ink">{p.price}</span>
                <span className="ml-2 text-sm text-muted">{p.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/90">
                {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-gold-dark">✓</span>{f}</li>)}
              </ul>
              <Button href="/contact" variant={p.highlighted ? 'primary' : 'outline'} className="mt-8 w-full">{p.cta}</Button>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-sand/50">
        <div className="mb-10 text-center"><Eyebrow>FAQ</Eyebrow><Heading>Questions, answered</Heading></div>
        <FAQ items={faqs} />
      </Section>
    </>
  );
}
