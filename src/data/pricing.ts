// Course fees — the single source for every price shown on the site: the
// /pricing page, the fee box on each course page and the price on the catalog
// cards. Change a number here and it changes everywhere.
//
// Structure: every course costs the same one-time fee and is sold as a single
// plan with everything included. Scholarships take a percentage off that fee
// (see data/scholarship.ts). Career Track bundles several courses at a quoted
// price. Course ids match data/courses.ts (and the platform's course access
// ids), so a course cannot be priced without existing.

import { courses } from './courses';
import { slabs } from './scholarship';

/** One-time fee for any course, in rupees. Must match courseFees in the gateway's enroll.go. */
export const courseFee = 10000;

/** Groups only arrange the courses on the fee table and the enrol form. */
export interface PriceGroup {
  key: string;
  name: string;
  blurb: string;
  courseIds: string[];
}

export const priceGroups: PriceGroup[] = [
  {
    key: 'development',
    name: 'Development',
    blurb: 'Full-length engineering tracks with coding projects.',
    courseIds: ['5', '1', '2', '4'], // Full Stack, Java, Front-End, Golang
  },
  {
    key: 'genai',
    name: 'GenAI & AI engineering',
    blurb: 'Advanced track building and deploying AI systems.',
    courseIds: ['genai'],
  },
  {
    key: 'data',
    name: 'Data',
    blurb: 'Short, focused course on querying and modelling data.',
    courseIds: ['3'], // Mastering SQL
  },
  {
    key: 'marketing',
    name: 'Marketing',
    blurb: 'Practical growth, content and search skills. No coding needed.',
    courseIds: ['digital-marketing', 'seo'],
  },
  {
    key: 'testing',
    name: 'Software Testing',
    blurb: 'Manual and automation testing for QA careers.',
    courseIds: ['testing'],
  },
];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** The fee for one course, or undefined if it is not sold online. */
export function priceFor(courseId: string): number | undefined {
  return priceGroups.some((g) => g.courseIds.includes(courseId)) ? courseFee : undefined;
}

/** The fee left to pay after a scholarship of awardPercent. */
export const afterScholarship = (awardPercent: number) => Math.round((courseFee * (100 - awardPercent)) / 100);

/** What a student pays at each scholarship band, smallest award first. */
export const scholarshipPrices = [...slabs]
  .sort((a, b) => a.awardPercent - b.awardPercent)
  .map((s) => ({ awardPercent: s.awardPercent, minPercent: s.minPercent, pays: afterScholarship(s.awardPercent) }));

export const maxScholarship = Math.max(...slabs.map((s) => s.awardPercent));

/** The least anyone pays: the fee after the top scholarship. */
export const lowestFee = afterScholarship(maxScholarship);

/** Groups with their course objects, in catalog order, for the fee table. */
export function pricedCourses() {
  return priceGroups.map((g) => ({
    ...g,
    courses: g.courseIds
      .map((id) => courses.find((c) => c.id === id))
      .filter((c): c is (typeof courses)[number] => !!c),
  }));
}

export interface Plan {
  key: 'course' | 'career';
  name: string;
  from: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    key: 'course',
    name: 'Course',
    from: inr(courseFee),
    period: 'one-time, per course',
    tagline: 'The full course with mentors, projects and placement help.',
    features: [
      'Full course content and syllabus',
      'Live classes with attendance tracking',
      'Practice problems and auto-graded tests',
      'Mentor doubt-clearing sessions',
      'Real capstone projects, reviewed',
      'Mock interviews and resume review',
      'Placement assistance',
      'Certificate of completion',
    ],
    cta: 'Enroll now',
    href: '/enroll',
    highlighted: true,
  },
  {
    key: 'career',
    name: 'Career Track',
    from: 'Custom',
    period: 'bundle price',
    tagline: 'Two or more courses as one path to a job.',
    features: [
      'Everything in the course plan, for every course in the bundle',
      'One combined price for the whole bundle',
      'Dedicated career coach',
      'Interview opportunities with hiring partners',
      'Flexible EMI options',
    ],
    cta: 'Talk to us',
    href: '/contact',
  },
];

export const faqs = [
  { q: 'Do all courses cost the same?', a: `Yes. Every course is ${inr(courseFee)}, paid once, with no hidden charges.` },
  { q: 'What is included in the fee?', a: 'The full course and syllabus, live classes, practice and auto-graded tests, mentor doubt-clearing, reviewed capstone projects, mock interviews, resume review, placement assistance and a certificate.' },
  {
    q: 'Can I reduce the fee with a scholarship?',
    a: `Yes, by up to ${maxScholarship}%. Take the free 60-minute scholarship test for your course: ${scholarshipPrices
      .map((p) => `score ${p.minPercent}% or more and you pay ${inr(p.pays)}`)
      .join('; ')}.`,
  },
  { q: 'Can I pay in instalments?', a: 'Career Track plans support flexible EMI options. Reach out through the contact form and we will help you pick a plan.' },
  { q: 'Do I need prior experience?', a: 'No. Beginner courses assume no background and start from the fundamentals.' },
];
