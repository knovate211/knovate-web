import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Section, { Eyebrow, Heading } from '@/components/Section';
import EnquiryForm from '@/components/EnquiryForm';
import ReferButton from '@/components/referral/ReferButton';
import { site } from '@/data/site';

export const metadata: Metadata = pageMeta({
  title: 'Contact Us — Talk to a Course Advisor',
  description:
    'Questions about a course, fees, batch dates or placements? Tell us your goal and a Knovate advisor will help you pick the right track.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <Heading as="h1">Let&apos;s find your track</Heading>
          <p className="mt-4 text-muted">
            Have a question about a course, pricing, or your career path? Fill in the form and our team will get back to you — usually within a day.
          </p>
          <dl className="mt-8 space-y-4 text-ink">
            <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Email</dt><dd>{site.email}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Phone</dt><dd>{site.phone}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Location</dt><dd>{site.location}</dd></div>
          </dl>
        </div>
        <div>
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
            <EnquiryForm source="contact" />
          </div>

          {/* Outside the card, so it reads as its own thing rather than part of
              the form. */}
          <div className="mt-2 text-right">
            <ReferButton
              className="text-sm font-semibold text-gold-dark hover:text-gold"
              label="Not for you, but right for a friend? Refer them and earn →"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
