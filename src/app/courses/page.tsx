import type { Metadata } from 'next';
import Section, { Eyebrow, Heading } from '@/components/Section';
import CourseCard from '@/components/CourseCard';
import CTASection from '@/components/CTASection';
import { courses } from '@/data/courses';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore Knovate’s mentor-led career tracks — Full-Stack, Java, SQL, Golang, GenAI, Digital Marketing and more.',
};

export default function CoursesPage() {
  return (
    <>
      <Section className="bg-sand/50 !pb-10">
        <Eyebrow>Career tracks</Eyebrow>
        <Heading>Courses built to get you hired</Heading>
        <p className="mt-3 max-w-2xl text-muted">
          Every track blends concepts with hands-on practice, real projects and mentorship. Pick one and start building.
        </p>
      </Section>
      <Section className="!pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
