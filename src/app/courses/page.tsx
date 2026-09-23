import type { Metadata } from 'next';
import CourseCatalog from '@/components/courses/CourseCatalog';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore Knovate’s curated courses — programming, data science, cloud, design and more, designed by industry experts.',
};

export default function CoursesPage() {
  return <CourseCatalog />;
}
