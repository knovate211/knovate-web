import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CourseCatalog from '@/components/courses/CourseCatalog';

export const metadata: Metadata = pageMeta({
  title: 'Full Stack, Java, SQL & GenAI Programs Online',
  description:
    'Mentor-led online tech programs with real projects and placement support — Full Stack, Java, Front-End, SQL, Golang, GenAI, Digital Marketing, SEO and Software Testing.',
  path: '/programs',
});

export default function CoursesPage() {
  return <CourseCatalog />;
}
