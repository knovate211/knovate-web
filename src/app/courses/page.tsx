import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CourseCatalog from '@/components/courses/CourseCatalog';

export const metadata: Metadata = pageMeta({
  title: 'Full Stack, Java, SQL & GenAI Courses Online',
  description:
    'Mentor-led online tech courses with real projects and placement support — Full Stack, Java, Front-End, SQL, Golang, GenAI, Digital Marketing, SEO and Software Testing.',
  path: '/courses',
});

export default function CoursesPage() {
  return <CourseCatalog />;
}
