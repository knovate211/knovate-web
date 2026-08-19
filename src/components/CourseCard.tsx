import Link from 'next/link';
import { Course } from '@/data/courses';

const levelColor: Record<string, string> = {
  Beginner: 'bg-sage/20 text-sage',
  Intermediate: 'bg-gold/20 text-gold-dark',
  Advanced: 'bg-terracotta/15 text-terracotta',
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${levelColor[course.level]}`}>{course.level}</span>
        <span className="text-xs font-semibold text-muted">{course.duration}</span>
      </div>
      <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-gold-dark">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{course.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.tags.map((t) => (
          <span key={t} className="rounded-md bg-sand px-2 py-1 text-xs font-medium text-muted">{t}</span>
        ))}
      </div>
      <span className="mt-4 text-sm font-semibold text-gold-dark">Explore course →</span>
    </Link>
  );
}
