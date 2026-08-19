import type { Metadata } from 'next';
import Section, { Eyebrow, Heading } from '@/components/Section';
import EnquiryForm from '@/components/EnquiryForm';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Knovate. Tell us your goal and our advisors will help you choose the right course.',
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <Heading>Let&apos;s find your track</Heading>
          <p className="mt-4 text-muted">
            Have a question about a course, pricing, or your career path? Fill in the form and our team will get back to you — usually within a day.
          </p>
          <dl className="mt-8 space-y-4 text-ink">
            <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Email</dt><dd>{site.email}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Phone</dt><dd>{site.phone}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Location</dt><dd>{site.location}</dd></div>
          </dl>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg md:p-8">
          <EnquiryForm source="contact" />
        </div>
      </div>
    </Section>
  );
}
