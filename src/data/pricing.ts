export interface Plan {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Self-Paced',
    price: '₹9,999',
    period: 'one-time',
    tagline: 'Learn on your schedule.',
    features: ['Full course access', '500+ practice problems', 'Auto-graded coding tests', 'Community support', 'Certificate of completion'],
    cta: 'Get started',
  },
  {
    name: 'Mentor-Led',
    price: '₹24,999',
    period: 'per track',
    tagline: 'The complete, guided experience.',
    features: ['Everything in Self-Paced', 'Live mentorship & doubt-clearing', 'Real capstone projects', 'Mock interviews', 'Placement assistance', 'Priority support'],
    cta: 'Enroll now',
    highlighted: true,
  },
  {
    name: 'Career Track',
    price: 'Custom',
    period: 'talk to us',
    tagline: 'Multi-course path to a job.',
    features: ['Multiple courses bundled', 'Dedicated career coach', 'Guaranteed interview opportunities', 'Resume & LinkedIn review', 'Flexible EMI options'],
    cta: 'Contact us',
  },
];

export const faqs = [
  { q: 'Do I need prior experience?', a: 'No. Our beginner tracks assume zero background — we start from the fundamentals and build up with hands-on practice.' },
  { q: 'Are the courses live or recorded?', a: 'Mentor-Led plans include live sessions and doubt-clearing; Self-Paced gives you the full content and practice on your own schedule.' },
  { q: 'Do you offer placement support?', a: 'Yes. Mentor-Led and Career Track plans include mock interviews, resume reviews and interview opportunities with our hiring partners.' },
  { q: 'Is there a certificate?', a: 'Every track ends with a certificate of completion, plus real projects you can show employers.' },
  { q: 'Can I pay in instalments?', a: 'Career Track plans support flexible EMI options. Reach out via the contact form and we will help you pick a plan.' },
];
