// The /courses catalog, derived from courses.ts — the same courses the student
// app grants access to. Only presentation (category, thumbnail) is added here,
// so a course cannot appear on the site without existing in the platform.
import { courses, type Course } from './courses';

export type Category = 'Development' | 'Data & AI' | 'Marketing' | 'Quality & Testing';
export type Level = Course['level'];

export interface CatalogCourse extends Course {
  category: Category;
  months: number;
  logo: string;
  /** Course icon under /public; the card falls back to `logo` text without one. */
  image?: string;
  thumb: string; // tailwind gradient classes
  popular?: boolean;
}

const presentation: Record<string, { category: Category; logo: string; image?: string; thumb: string; popular?: boolean }> = {
  'full-stack': { category: 'Development', logo: '</>', image: '/images/knovate-course-icons-individual/10-full-stack.png', thumb: 'from-slate-900 via-indigo-950 to-slate-800', popular: true },
  'java-development': { category: 'Development', logo: '☕', image: '/images/knovate-course-icons-individual/01-java-development.png', thumb: 'from-stone-800 via-amber-900 to-stone-900' },
  frontend: { category: 'Development', logo: '⚛', image: '/images/knovate-course-icons-individual/02-frontend-technologies.png', thumb: 'from-sky-900 via-indigo-900 to-slate-900' },
  golang: { category: 'Development', logo: 'Go', image: '/images/knovate-course-icons-individual/03-golang.png', thumb: 'from-sky-900 via-cyan-800 to-slate-900' },
  sql: { category: 'Data & AI', logo: 'SQL', image: '/images/knovate-course-icons-individual/08-sql.png', thumb: 'from-cyan-900 via-slate-800 to-cyan-950' },
  genai: { category: 'Data & AI', logo: '✨', image: '/images/knovate-course-icons-individual/04-genai-fde.png', thumb: 'from-fuchsia-900 via-violet-900 to-slate-900' },
  'digital-marketing': { category: 'Marketing', logo: '📣', image: '/images/knovate-course-icons-individual/05-digital-marketing.png', thumb: 'from-amber-700 via-orange-700 to-amber-900' },
  seo: { category: 'Marketing', logo: 'SEO', image: '/images/knovate-course-icons-individual/09-seo.png', thumb: 'from-emerald-900 via-green-700 to-emerald-950' },
  testing: { category: 'Quality & Testing', logo: '✓', image: '/images/knovate-course-icons-individual/06-software-testing.png', thumb: 'from-rose-900 via-red-800 to-stone-900' },
};

export const catalog: CatalogCourse[] = courses.map((c) => {
  const p = presentation[c.slug] ?? { category: 'Development' as Category, logo: c.title.slice(0, 2), thumb: 'from-slate-800 to-slate-900' };
  return { ...c, ...p, months: parseInt(c.duration, 10) || 0 };
});

export const categoryTabs: { label: Category; icon: string }[] = [
  { label: 'Development', icon: 'laptop' },
  { label: 'Data & AI', icon: 'brain' },
  { label: 'Marketing', icon: 'users' },
  { label: 'Quality & Testing', icon: 'pen' },
];

export const durationBuckets = [
  { label: 'Up to 2 months', test: (m: number) => m <= 2 },
  { label: '3 - 4 months', test: (m: number) => m >= 3 && m <= 4 },
  { label: '5+ months', test: (m: number) => m >= 5 },
];
