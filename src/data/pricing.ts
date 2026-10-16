// Course fees — the single source for every price shown on the site: the
// /pricing page, the fee box on each course page and the "from" price on the
// catalog cards. Change a number here and it changes everywhere.
//
// Structure: courses are priced by group. Every course has two plans —
// Self-Paced and Mentor-Led — and Career Track bundles several courses at a
// quoted price. Course ids match data/courses.ts (and the platform's course
// access ids), so a course cannot be priced without existing.

import { courses } from './courses';

export interface PriceGroup {
  key: string;
  name: string;
  blurb: string;
  courseIds: string[];
  /** Self-Paced fee in rupees. */
  selfPaced: number;
  /** Mentor-Led fee in rupees. */
  mentorLed: number;
}

export const priceGroups: PriceGroup[] = [
  {
    key: 'development',
    name: 'Development',
    blurb: 'Full-length engineering tracks with coding projects.',
    courseIds: ['5', '1', '2', '4'], // Full Stack, Java, Front-End, Golang
    selfPaced: 8999,
    mentorLed: 14999,
  },
  {
    key: 'genai',
    name: 'GenAI & AI engineering',
    blurb: 'Advanced track building and deploying AI systems.',
    courseIds: ['genai'],
    selfPaced: 11999,
    mentorLed: 18999,
  },
  {
    key: 'data',
    name: 'Data',
    blurb: 'Short, focused course on querying and modelling data.',
    courseIds: ['3'], // Mastering SQL
    selfPaced: 4999,
    mentorLed: 7999,
  },
  {
    key: 'marketing',
    name: 'Marketing',
    blurb: 'Practical growth, content and search skills. No coding needed.',
    courseIds: ['digital-marketing', 'seo'],
    selfPaced: 5999,
    mentorLed: 9999,
  },
  {
    key: 'testing',
    name: 'Software Testing',
    blurb: 'Manual and automation testing for QA careers.',
    courseIds: ['testing'],
    selfPaced: 5999,
    mentorLed: 9999,
  },
];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** Fees for one course, or undefined if it has not been priced yet. */
export function priceFor(courseId: string): PriceGroup | undefined {
  return priceGroups.find((g) => g.courseIds.includes(courseId));
}

/** Groups with their course objects, in catalog order, for the fee table. */
export function pricedCourses() {
  return priceGroups.map((g) => ({
    ...g,
    courses: g.courseIds
      .map((id) => courses.find((c) => c.id === id))
      .filter((c): c is (typeof courses)[number] => !!c),
  }));
}

const lowest = (k: 'selfPaced' | 'mentorLed') => Math.min(...priceGroups.map((g) => g[k]));

export interface Plan {
  key: 'self' | 'mentor' | 'career';
  name: string;
  from: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    key: 'self',
    name: 'Self-Paced',
    from: `from ${inr(lowest('selfPaced'))}`,
    period: 'one-time, per course',
    tagline: 'The full course, on your schedule.',
    features: [
      'Full course content and syllabus',
      'Practice problems and auto-graded tests',
      'Assignments with instant feedback',
      'Community doubt support',
      'Certificate of completion',
    ],
    cta: 'Enroll Self-Paced',
  },
  {
    key: 'mentor',
    name: 'Mentor-Led',
    from: `from ${inr(lowest('mentorLed'))}`,
    period: 'one-time, per course',
    tagline: 'Guided learning with live classes and placement help.',
    features: [
      'Everything in Self-Paced',
      'Live classes with attendance tracking',
      'Mentor doubt-clearing sessions',
      'Real capstone projects, reviewed',
      'Mock interviews and resume review',
      'Placement assistance',
    ],
    cta: 'Enroll Mentor-Led',
    highlighted: true,
  },
  {
    key: 'career',
    name: 'Career Track',
    from: 'Custom',
    period: 'bundle price',
    tagline: 'Two or more courses as one path to a job.',
    features: [
      'Everything in Mentor-Led, for every course in the bundle',
      'One combined price for the whole bundle',
      'Dedicated career coach',
      'Interview opportunities with hiring partners',
      'Flexible EMI options',
    ],
    cta: 'Talk to us',
  },
];

export const faqs = [
  { q: 'Why do courses cost different amounts?', a: 'Fees follow the depth and length of the course. Development tracks run 3–6 months with coding projects; Marketing and Testing courses are shorter and need no programming background; GenAI is our most advanced track.' },
  { q: 'What is the difference between Self-Paced and Mentor-Led?', a: 'Both give you the full course, practice and certificate. Mentor-Led adds live classes, mentor doubt-clearing, reviewed capstone projects, mock interviews and placement assistance.' },
  { q: 'Can I reduce the fee with a scholarship?', a: 'Yes. Take the free 60-minute scholarship test for your course — a good score covers part of the course fee. See the Scholarship page for details.' },
  { q: 'Can I pay in instalments?', a: 'Career Track plans support flexible EMI options. Reach out through the contact form and we will help you pick a plan.' },
  { q: 'Do I need prior experience?', a: 'No. Beginner courses assume no background and start from the fundamentals.' },
];
