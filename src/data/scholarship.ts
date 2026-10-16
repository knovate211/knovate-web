// Scholarship programme content.
//
// The award slabs here are marketing copy and MUST match the `award_slabs` JSON
// on the backend programme (set by scripts/seed-scholarship-test.sh). They are
// duplicated deliberately: the landing page is statically generated and must
// render even when the gateway is unreachable at build time. The *course
// picker* on the apply page is the live half — it reads /api/scholarship/config,
// so a course whose paper is unpublished, closed or full is never offered.

export interface Slab {
  minPercent: number;
  awardPercent: number;
  label: string;
}

export const slabs: Slab[] = [
  { minPercent: 80, awardPercent: 100, label: 'Full scholarship' },
  { minPercent: 65, awardPercent: 50, label: 'Half scholarship' },
  { minPercent: 50, awardPercent: 25, label: 'Partial scholarship' },
];

export const testFormat = {
  durationMinutes: 60,
  totalMarks: 100,
  attempts: 1,
  sections: [
    { title: 'Aptitude & fundamentals', detail: '20 multiple-choice questions', marks: 40 },
    { title: 'Coding', detail: '2 problems, written and run in the browser', marks: 60 },
  ],
  languages: ['Python', 'JavaScript', 'Java', 'C++', 'Go'],
};

export const steps = [
  {
    title: 'Choose your course',
    body: 'Tell us which track you want to study. One short form — no documents, no application fee.',
  },
  {
    title: 'Get your link',
    body: 'We email your personal test link straight away. It stays valid for three days, and the clock only starts when you open it.',
  },
  {
    title: 'Sit the test',
    body: '60 minutes, multiple choice plus live coding, in one sitting. Graded the moment you submit — no waiting on a panel.',
  },
  {
    title: 'Claim your place',
    body: 'Score above the bar and your scholarship is applied to the course fee. A counsellor calls to enrol you.',
  },
];

export const eligibility = [
  'Open to students and working professionals — any degree, any branch, any year.',
  'No prior experience with the course subject is required. The test covers reasoning and programming basics, not the syllabus you are applying to learn.',
  'One attempt per course. Take your time and sit it when you can give it a clear hour.',
  'A laptop or desktop with a stable internet connection. The test does not work well on a phone.',
];

export const faqs = [
  {
    q: 'Does it cost anything to apply?',
    a: 'No. The application and the test are free, and there is no obligation to enrol afterwards.',
  },
  {
    q: 'Do I need to know how to code already?',
    a: 'Some programming basics help — loops, arrays, functions. The coding section can be answered in Python, JavaScript, Java, C++ or Go, whichever you are most comfortable with. You are applying to learn the subject, so the test does not examine you on it.',
  },
  {
    q: 'When do I take the test?',
    a: 'Whenever suits you. Submitting the form emails your personal test link straight away, and it stays valid for three days. The clock only starts when you open the test, so there is no rush to click it.',
  },
  {
    q: 'The email has not arrived.',
    a: 'Check your spam folder first — a first message from a new sender often lands there. If it is still missing after a few minutes, apply again with the same address and we will send a fresh link.',
  },
  {
    q: 'Can I retake it?',
    a: 'Not for the same course. You get one attempt, so sit it when you can give it a clear hour on a laptop.',
  },
  {
    q: 'What happens if I do not score enough?',
    a: 'Nothing is lost. You can still enrol at the standard fee, and our team will talk you through payment plans and EMI options.',
  },
  {
    q: 'Is the test proctored?',
    a: 'Yes, lightly. It runs full-screen and we count how often you switch away from it. There is no webcam and no screen recording.',
  },
];
