import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import Section, { Eyebrow, Heading } from '@/components/Section';
import { Block, LEGAL, List, Mail, Para, SubBlock, Term } from '@/components/Policy';

export const metadata: Metadata = pageMeta({
  title: 'Terms and Conditions',
  description:
    'The terms and conditions for using Knovate: who owns course content and your work, acceptable use of the platform, use of the AI mentor, limits of liability, and what happens if the rules are broken.',
  path: '/terms',
});

// Bump this whenever the wording below changes: section 5 promises it is accurate.
const LAST_UPDATED = '8 November 2026';

export default function TermsPage() {
  return (
    <>
      <Section className="bg-sand/50 !pb-10">
        <Eyebrow>Policy</Eyebrow>
        <Heading as="h1" className="max-w-3xl">Terms and Conditions</Heading>
        <p className="mt-4 text-sm text-muted">Last updated: {LAST_UPDATED}</p>
      </Section>

      <Section className="!pt-8">
        <div className="max-w-3xl space-y-10">
          <Block n={1} title="Intellectual Property">
            <Para label="Our content">
              All course content, including videos, notes, problems, tests, solutions, and software, along with the Knovate
              name, logo, and branding, is owned by Knovate or its licensors and is protected by applicable intellectual
              property laws.
            </Para>
            <Para label="Your licence">
              While you are enrolled, we grant you a limited, personal, non-exclusive, non-transferable, non-sublicensable
              licence to access and use this content for your own learning only. You may not use it commercially, share it,
              or create derivative works from it, as set out in{' '}
              <a href="#acceptable-use" className="font-medium text-terracotta underline underline-offset-2 hover:text-ink">
                Section 2 (Acceptable Use)
              </a>
              .
            </Para>
            <Para label="Your work">
              You own the code, projects, and other work you create. You grant Knovate a limited licence to host, run, and
              review that work for the purposes of providing the course, mentoring, grading, and support.
            </Para>
            <Para label="Feedback">
              If you give us suggestions or feedback, we may use them to improve Knovate without owing you anything.
            </Para>
          </Block>

          <div id="acceptable-use" className="scroll-mt-24">
            <Block n={2} title="Acceptable Use">
              <p>To keep Knovate safe and fair for every learner, you agree not to:</p>
              <List>
                <Term label="Misuse content">
                  copy, record, download, resell, distribute, or publicly share course videos, problems, tests, solutions,
                  or any other materials, except where we expressly allow it.
                </Term>
                <Term label="Misuse the code runner">
                  use it to attack or probe other systems, mine cryptocurrency, run malicious code, or access anything
                  outside the sandbox.
                </Term>
                <Term label="Harass others">
                  abuse, threaten, harass, or discriminate against mentors, instructors, staff, or fellow learners, in any
                  forum, chat, or live session.
                </Term>
                <Term label="Interfere with the platform">
                  try to break, overload, scrape, reverse-engineer, or bypass its security or access controls.
                </Term>
                <Term label="Share your account">let others use your login, or use someone else&apos;s.</Term>
                <Term label="Cheat in assessments">
                  use impersonation, unauthorised help, leaked questions, or automated tools in tests or certification
                  exams.
                </Term>
              </List>
              <SubBlock n="2.1" title="Consequences">
                <p>
                  If you break these rules, we may issue a warning, restrict features, or suspend or permanently close your
                  account, with or without notice depending on the severity. Fees paid are not refunded where an account is
                  closed for a violation. We may also report unlawful activity to the relevant authorities.
                </p>
              </SubBlock>
              <SubBlock n="2.2" title="Reporting">
                <p>
                  To report a violation, write to <Mail />.
                </p>
              </SubBlock>
            </Block>
          </div>

          <Block n={3} title="AI Mentor">
            <Para label="What it is">
              The AI mentor is an automated tool that helps you learn by answering questions, explaining concepts, and
              giving feedback. It is meant to support your learning, not replace your human mentors or the course material.
            </Para>
            <Para label="Accuracy">
              AI-generated answers can be incomplete, outdated, or wrong. Always check important information, such as code
              that you submit, exam preparation, and anything you rely on for work or decisions, with your human mentor or
              the official course material.
            </Para>
            <Para label="Fair use">
              Do not use the AI mentor to cheat in tests, graded assignments, or certification exams, unless the assessment
              instructions expressly allow it.
            </Para>
            <Para label="Your inputs">
              Do not share passwords, financial details, or other sensitive personal information in your conversations. We
              may store and review conversations to provide support, improve the service, and enforce these terms, as
              described in our{' '}
              <Link href="/refund-policy" className="font-medium text-terracotta underline underline-offset-2 hover:text-ink">
                Privacy Policy
              </Link>
              .
            </Para>
            <Para label="Availability">
              We may change, limit, or suspend the AI mentor at any time, and we do not guarantee that it will be
              uninterrupted or error-free.
            </Para>
          </Block>

          <Block n={4} title="Limitation of Liability">
            <Para label="Our services">
              We provide Knovate with reasonable care and skill, but on an &ldquo;as available&rdquo; basis. We do not
              guarantee uninterrupted or error-free service, or any particular outcome, such as exam results, certification,
              a job, or income.
            </Para>
            <Para label="Liability cap">
              To the extent the law allows, Knovate&apos;s total liability for all claims relating to a course or service is
              limited to the fees you paid for that course or service in the 12 months before the event that led to the
              claim.
            </Para>
            <Para label="Excluded losses">
              To the extent the law allows, we are not liable for indirect or consequential losses, including lost income,
              profits, opportunities, or data.
            </Para>
            <Para label="What this does not limit">
              Nothing in these terms limits liability that cannot legally be limited, including liability for fraud, death
              or personal injury caused by negligence, or any rights you have under consumer protection law.
            </Para>
          </Block>

          <Block n={5} title="Governing Law and Disputes">
            <Para label="Governing law">These terms are governed by the laws of India.</Para>
            <Para label="Contact us first">
              If you have a complaint or dispute, write to <Mail /> with the details. We will acknowledge it within 2
              working days and aim to resolve it within 30 days. Most issues can be settled quickly this way.
            </Para>
            <Para label="Jurisdiction">
              If we can&apos;t resolve it, the courts in Bengaluru, Karnataka have exclusive jurisdiction, subject to any
              right you have under applicable consumer law to bring a claim elsewhere.
            </Para>
          </Block>

          <Block n={6} title="Changes to These Terms">
            <p>
              We may update these terms from time to time, for example to reflect changes in our services, the law, or our
              policies.
            </p>
            <Para label="Where we post them">
              The latest version is always available on our website, with the &ldquo;Last updated&rdquo; date at the top.
            </Para>
            <Para label="Notice of significant changes">
              For significant changes, we will email you at your registered email address at least 30 days before they
              take effect.
            </Para>
            <Para label="Your acceptance">
              If you keep using our services after a change takes effect, you accept the updated terms.
            </Para>
            <Para label="If you disagree">
              If you don&apos;t accept a change, you can stop using the services and write to <Mail />. Changes do not
              affect fees you have already paid, as explained in the next point.
            </Para>
            <Para label="Purchases already made">
              Refund and cancellation rights for a course you have already bought stay as they were when you purchased it.
            </Para>
          </Block>

          <Block n={7} title="Contact Us">
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-ink">Support:</span> <Mail />
              </li>
              <li>
                <span className="font-semibold text-ink">Privacy queries:</span> <Mail address="privacy@knovate.com" />
              </li>
              <li>
                <span className="font-semibold text-ink">Grievance Officer:</span>{' '}
                {LEGAL.grievanceOfficer && <>{LEGAL.grievanceOfficer}, </>}
                <Mail address="grievance@knovate.com" />
              </li>
              {LEGAL.entityName && LEGAL.address && LEGAL.gstin && (
                <li>
                  <span className="font-semibold text-ink">Registered office:</span> {LEGAL.entityName}, {LEGAL.address},
                  GSTIN {LEGAL.gstin}
                </li>
              )}
            </ul>
            <p>We acknowledge grievances within 48 hours and aim to resolve them within 30 days.</p>
          </Block>
        </div>
      </Section>
    </>
  );
}
