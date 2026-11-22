import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Section, { Eyebrow, Heading } from '@/components/Section';
import Link from 'next/link';
import { Block, LEGAL, List, Mail, Para, SubBlock, Term } from '@/components/Policy';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How Knovate uses and shares your information, plus when you can cancel a course or exam and how refunds work.',
  path: '/refund-policy',
});

// Shown under "Who We Share Your Information With". Left blank, the email line is
// hidden rather than published as a placeholder; fill in the provider's name.
const EMAIL_PROVIDER = '';

// Retention periods under "How Long We Keep Your Information" that the draft left
// open. A blank value hides that line rather than publishing a placeholder.
const AI_CHAT_RETENTION = ''; // e.g. '12 months'
const SECURITY_LOG_RETENTION = ''; // e.g. '1 year'

// Bump this whenever the wording below changes: section 13 promises it is accurate.
const LAST_UPDATED = '8 November 2026';

export default function RefundPolicyPage() {
  return (
    <>
      <Section className="bg-sand/50 !pb-10">
        <Eyebrow>Policy</Eyebrow>
        <Heading as="h1" className="max-w-3xl">Privacy Policy</Heading>
        <p className="mt-4 text-sm text-muted">Last updated: {LAST_UPDATED}</p>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          At Knovate, we want you to learn with confidence. This policy explains when you can cancel, how refunds work, and how we use and share your information.
        </p>
      </Section>

      <Section className="!pt-8">
        <div className="max-w-3xl space-y-10">
          <Block n={1} title="Cancellation by You">
            <List>
              <Term label="Within 7 days of payment">
                You are eligible for a full refund if you have completed less than 10% of the course content.
              </Term>
              <Term label="After 7 days, or once you have completed 10% or more">The course fee is non-refundable.</Term>
            </List>
            <p className="text-muted">
              Course progress is calculated from the lessons, videos, and assessments you have accessed or completed on the
              platform, as recorded in your learner dashboard.
            </p>
          </Block>

          <Block n={2} title="Cancellation by Knovate">
            <p>If we cancel a course or batch, you can choose either:</p>
            <List>
              <li>A full refund, or</li>
              <li>A free transfer to another available batch or an equivalent course.</li>
            </List>
            <p>We will notify you by email as soon as possible if a batch is cancelled or rescheduled.</p>
          </Block>

          <Block n={3} title="Certification Exam Fees">
            <List>
              <li>
                Exam fees are refundable only if you cancel at least 2 days (48 hours) before your scheduled exam start time.
              </li>
              <li>Cancellations made less than 2 days before the exam are not eligible for a refund.</li>
              <li>
                Once an exam has been started or attempted, or if you miss your scheduled slot, the fee is non-refundable.
              </li>
              <li>
                To cancel, email <Mail /> from your registered email address with your name, exam name, and transaction ID.
                The time of your email is treated as the cancellation time.
              </li>
              <li>Approved refunds follow the standard timeline of 7-10 working days to your original payment method.</li>
            </List>
          </Block>

          <Block n={4} title="How to Request a Refund">
            <List>
              <li>
                Email <Mail /> from your registered email address.
              </li>
              <li>
                Include your full name, registered email or phone number, course or batch name, order or transaction ID, and
                the reason for cancellation.
              </li>
              <li>
                We will acknowledge your request within 2 working days and confirm approval or rejection within 5 working
                days.
              </li>
            </List>
          </Block>

          <Block n={5} title="Refund Processing">
            <List>
              <li>Approved refunds are credited to your original payment method within 7-10 working days of approval.</li>
              <li>Your bank or payment provider may take additional time to reflect the amount.</li>
              <li>Refunds are not issued in cash or to a different account or payment method.</li>
            </List>
          </Block>

          <Block n={6} title="Additional Terms">
            <List>
              <Term label="Access after refund">
                Course access, certificates, and downloadable resources are withdrawn once a refund is processed.
              </Term>
              <Term label="Discounts and coupons">
                Refunds are for the amount actually paid. Coupons and promotional credits are not refundable or reissued.
              </Term>
              <Term label="Taxes and fees">
                Applicable taxes are refunded along with the course fee. Payment gateway charges are non-refundable unless the
                refund is due to an error on our side.
              </Term>
              <Term label="Duplicate or failed payments">
                If you are charged twice or money is debited without enrollment, contact us with proof of payment and we will
                refund the extra amount in full.
              </Term>
              <Term label="Instalments and EMI">
                For fees paid in instalments, only the amount paid up to the date of cancellation is eligible for refund,
                subject to the rules above. Any bank or EMI-provider charges are governed by their terms.
              </Term>
              <Term label="Misuse">
                Refunds may be denied if there is evidence of account sharing, content downloading or piracy, or a violation
                of our{' '}
                <Link href="/terms" className="font-medium text-terracotta underline underline-offset-2 hover:text-ink">
                  Terms and Conditions
                </Link>
                .
              </Term>
              <Term label="Bundles and add-ons">
                Refunds on bundled courses are calculated on the specific course(s) that meet the eligibility criteria.
              </Term>
              <Term label="Policy updates">
                We may update this policy from time to time. The version in effect at the time of your purchase applies to
                you.
              </Term>
            </List>
          </Block>

          <Block n={7} title="How We Use Your Information">
            <p>We use your information to:</p>
            <SubBlock title="Provide your learning">
              <List>
                <li>Create your account, give you access to the courses you&apos;ve paid for, and send your login details.</li>
                <li>Run classes, grade your work, track your progress, and issue certificates.</li>
              </List>
            </SubBlock>
            <SubBlock title="Handle payments and scholarships">
              <List>
                <li>Decide scholarship awards from your test score.</li>
                <li>Process payments, referral rewards, and refunds.</li>
              </List>
            </SubBlock>
            <SubBlock title="Share it only as described">
              <List>
                <Term label="Your college">your progress, if you joined through a college program.</Term>
                <Term label="Hiring partners">
                  your profile and scores, only when you apply or agree to be considered.
                </Term>
              </List>
            </SubBlock>
            <SubBlock title="Stay in touch">
              <List>
                <li>Answer your questions and send course updates.</li>
                <li>With your consent, send news about new courses. You can unsubscribe at any time.</li>
              </List>
            </SubBlock>
            <SubBlock title="Keep Knovate safe">
              <List>
                <li>Prevent fraud and cheating, and keep the platform secure.</li>
              </List>
            </SubBlock>
          </Block>

          <Block n={8} title="Who We Share Your Information With">
            <p>We do not sell your personal data. We share it only with:</p>
            <List>
              <li>
                <span className="font-semibold text-ink">Service providers</span> that run parts of our service for us.
                They may use your data only to provide that service:
                <ul className="mt-2 list-[circle] space-y-1 pl-5">
                  <Term label="Cloud hosting">Amazon Web Services (India region)</Term>
                  <Term label="Payments">Cashfree</Term>
                  {EMAIL_PROVIDER && <Term label="Email delivery">{EMAIL_PROVIDER}</Term>}
                  <Term label="AI mentor">Google (Gemini)</Term>
                </ul>
              </li>
              <li>
                <span className="font-semibold text-ink">Your college</span>, if you joined through a college program:
                your progress, attendance, and test scores.
              </li>
              <li>
                <span className="font-semibold text-ink">Hiring partners</span>, only with your consent.
              </li>
              <li>
                <span className="font-semibold text-ink">Authorities</span>, when the law requires it.
              </li>
            </List>
          </Block>

          <Block n={9} title="Cookies and Local Storage">
            <p>We use your browser&apos;s storage (cookies and local storage) only for features you need:</p>
            <List>
              <li>Keeping you signed in</li>
              <li>Remembering your place in a course</li>
              <li>Remembering your theme (light or dark)</li>
              <li>Remembering a referral code for 30 days</li>
            </List>
            <p>
              We do not use advertising cookies, and we do not use your browser storage to track you across other websites.
            </p>
            <p>
              You can clear or block cookies and local storage in your browser settings. If you do, you may be signed out
              and some features may not work as expected.
            </p>
          </Block>

          <Block n={10} title="How Long We Keep Your Information">
            <p>
              We keep your information only for as long as we need it for the purposes in Section 7, or as the law
              requires.
            </p>
            <SubBlock title="What we keep, and for how long">
              <List>
                <Term label="Account and learning records">
                  while your account is active, and for 90 days after it closes. This covers your profile, progress,
                  grades, and project submissions.
                </Term>
                <Term label="Certificate records">
                  for as long as the certificate can be verified. We keep only what verification needs, such as your
                  name, course, and issue date.
                </Term>
                <Term label="Payment records">8 years, as Indian law requires.</Term>
                {AI_CHAT_RETENTION && (
                  <Term label="AI mentor conversations">
                    {AI_CHAT_RETENTION}, after which we delete or anonymise them.
                  </Term>
                )}
                <Term label="Marketing preferences and email subscriptions">
                  until you unsubscribe or withdraw your consent.
                </Term>
                <Term label="Enquiries that did not lead to enrolment">deleted after 2 years.</Term>
                {SECURITY_LOG_RETENTION && (
                  <Term label="Security logs">
                    {SECURITY_LOG_RETENTION}, kept separately to protect the platform and investigate misuse.
                  </Term>
                )}
              </List>
            </SubBlock>
            <SubBlock title="Inactive accounts">
              <p>
                If your account has had no activity for 2 years, we will email you and then delete or anonymise your data
                unless you tell us you want to keep it.
              </p>
            </SubBlock>
            <SubBlock title="When you ask us to delete your data">
              <List>
                <li>
                  You can ask for deletion at any time by writing to <Mail address="privacy@knovate.com" />.
                </li>
                <li>We will respond within 30 days.</li>
                <li>
                  We will delete your data except for records we must keep by law, such as payment records. These stay for
                  the periods above and are used only for those legal purposes.
                </li>
                <li>
                  Your certificate can still be verified if you earned one, unless you ask us to remove it. In that case it
                  can no longer be verified.
                </li>
              </List>
            </SubBlock>
            <SubBlock title="Backups">
              <p>Deleted data may remain in our backups for up to 35 days before it is permanently removed.</p>
            </SubBlock>
            <SubBlock title="Copies held by others">
              <p>
                If we shared your information with your college or a hiring partner (with your consent, as described in
                Section 8), they may keep their own copy under their own policies. Deleting your data with us does not
                delete theirs, so contact them directly about it.
              </p>
            </SubBlock>
            <SubBlock title="When we no longer need it">
              <p>
                We delete or anonymise your information. Anonymised data cannot identify you, and we may keep it for
                analysis and improving our courses.
              </p>
            </SubBlock>
          </Block>

          <Block n={11} title="Your Rights">
            <p>You have the right to:</p>
            <List>
              <Term label="Access">ask to see the personal data we hold about you and how we use it.</Term>
              <Term label="Correct">ask us to fix anything that is wrong or incomplete.</Term>
              <Term label="Delete">ask us to delete your account and personal data.</Term>
              <Term label="Withdraw consent">
                at any time, including for marketing messages and for sharing your profile with hiring partners.
                Withdrawing consent does not affect anything we did before you withdrew it.
              </Term>
              <Term label="Complain">
                if you are unhappy with how we handled your data, write to our Grievance Officer (see Grievances in Section 13).
              </Term>
            </List>
            <Para label="How to use your rights">
              Write to <Mail address="privacy@knovate.com" /> from your registered email address. We may ask you to confirm
              your identity first. We will respond within 30 days, and there is no charge.
            </Para>
            <Para label="Before you delete your account">
              Deleting your account ends your access to your courses and cannot be undone. Fees already paid are not
              refunded because of deletion, except as set out in our Cancellations and Refunds policy (Sections 1&ndash;6
              above). We may keep some records, such as payment records, where the law requires it (see Section 10).
            </Para>
          </Block>

          <Block n={12} title="Security">
            <p>We protect your information with reasonable security measures, including:</p>
            <List>
              <Term label="Hashed passwords">we store passwords in hashed form, never in plain text.</Term>
              <Term label="Encrypted connections">
                data travels between your device and our servers over HTTPS.
              </Term>
              <Term label="Restricted access">
                only authorised staff can access learner data, and only as their work requires.
              </Term>
            </List>
            <Para label="Your part">
              Choose a strong, unique password, keep it private, and tell us straight away if you think someone else has
              accessed your account.
            </Para>
            <Para label="If something goes wrong">
              No system can be completely secure. If a data breach affects you, we will tell you and the Data Protection
              Board of India as the law requires. To report a security concern or vulnerability, write to{' '}
              <Mail address="security@knovate.com" />.
            </Para>
          </Block>

          <Block n={13} title="Children, Updates and Grievances">
            <h3 className="pt-2 font-serif text-xl font-semibold text-ink">Children</h3>
            <SubBlock title="Who can join">
              <List>
                <li>Our courses are for people aged 18 and over.</li>
                <li>Learners aged 16 or 17 may join only with a parent&apos;s or guardian&apos;s consent.</li>
                <li>
                  We do not knowingly collect personal data from anyone under 16. If we learn that we have, we will delete it
                  promptly and close the account.
                </li>
              </List>
            </SubBlock>
            <SubBlock title="How we get and check consent">
              <List>
                <li>At sign-up we ask learners aged 16 or 17 for their parent&apos;s or guardian&apos;s name and contact details.</li>
                <li>
                  We contact the parent or guardian to confirm consent before the learner can access paid courses, or we ask
                  for a signed consent form.
                </li>
                <li>
                  If a learner joins through a college program, the college does not give consent on a parent&apos;s behalf.
                  The parent or guardian must still consent.
                </li>
              </List>
            </SubBlock>
            <SubBlock title="How we handle a minor’s data">
              <List>
                <li>We collect only what we need to run the course, such as account details, progress, and assignments.</li>
                <li>
                  We do not send marketing messages to learners under 18, and we do not share their profile with hiring
                  partners without their parent&apos;s or guardian&apos;s consent.
                </li>
                <li>We ask minors not to share sensitive personal information with the AI mentor.</li>
              </List>
            </SubBlock>
            <SubBlock title="A parent’s or guardian’s rights">
              <List>
                <li>
                  Write to <Mail address="privacy@knovate.com" /> at any time to see, correct, or delete a minor
                  learner&apos;s data, or to withdraw consent.
                </li>
                <li>
                  Withdrawing consent may end the learner&apos;s access to the courses. Refunds follow our Cancellations and
                  Refunds policy (Sections 1&ndash;6 above).
                </li>
                <li>If you think your child has joined without your consent, tell us and we will act within 7 days.</li>
              </List>
            </SubBlock>

            <h3 className="pt-4 font-serif text-xl font-semibold text-ink">Updates to this policy</h3>
            <List>
              <li>We may update this policy from time to time, for example when our services, providers, or the law change.</li>
              <li>
                Every change is posted on this page, with the &ldquo;Last updated&rdquo; date at the top. Earlier versions
                are available on request.
              </li>
              <li>
                We treat changes as significant when they involve new uses of your data, new types of recipients, or less
                time to exercise your rights. For these, we will email you at your registered address at least 14 days
                before the change takes effect.
              </li>
              <li>
                If you keep using our services after a change takes effect, you accept the updated policy. If you do not
                agree, you can stop using our services and ask us to delete your account (see Section 11, Your Rights).
              </li>
              <li>Keep your registered email address up to date so you receive our notices.</li>
            </List>

            <h3 id="grievances" className="scroll-mt-24 pt-4 font-serif text-xl font-semibold text-ink">Grievances</h3>
            <p>If you have a complaint about how we handle your personal data, write to our Grievance Officer:</p>
            <ul className="space-y-1">
              {LEGAL.grievanceOfficer && (
                <li><span className="font-semibold text-ink">Name:</span> {LEGAL.grievanceOfficer}, Grievance Officer</li>
              )}
              {LEGAL.entityName && (
                <li><span className="font-semibold text-ink">Organisation:</span> {LEGAL.entityName}</li>
              )}
              {LEGAL.address && (
                <li><span className="font-semibold text-ink">Address:</span> {LEGAL.address}</li>
              )}
              <li>
                <span className="font-semibold text-ink">Email:</span> <Mail address="grievance@knovate.com" />
              </li>
            </ul>
            <SubBlock title="How it works">
              <List>
                <li>
                  Send your complaint with your name, registered email address, and a short description of the issue.
                  Attach anything that helps.
                </li>
                <li>We acknowledge it within 48 hours and give you a reference number.</li>
                <li>We investigate and may ask you for more information.</li>
                <li>We resolve it within 30 days and tell you the outcome and the reasons for it.</li>
                <li>
                  If you are not satisfied, you can ask for a review by a senior member of our team, and you may approach
                  the Data Protection Board of India or any other authority that applies to you.
                </li>
              </List>
            </SubBlock>
            <p>We keep a record of complaints and use them to improve how we handle data.</p>
          </Block>

          <Block n={14} title="Contact Us">
            <p>
              For any questions, write to <Mail />.
            </p>
          </Block>
        </div>
      </Section>
    </>
  );
}
