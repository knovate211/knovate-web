import Link from 'next/link';
import { site } from '@/data/site';
import { courses } from '@/data/courses';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="font-serif text-2xl font-bold text-ink">Knovate</div>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}. Mentor-led tech education built around real practice.</p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">Courses</h4>
          <ul className="space-y-2 text-sm text-muted">
            {courses.slice(0, 5).map((c) => (
              <li key={c.slug}><Link href={`/courses/${c.slug}`} className="hover:text-ink">{c.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/placements" className="hover:text-ink">Placements</Link></li>
            <li><Link href="/pricing" className="hover:text-ink">Pricing</Link></li>
            <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">Get in touch</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>{site.email}</li>
            <li>{site.phone}</li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-content px-5 py-5 text-sm text-muted">
          © {new Date().getFullYear()} Knovate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
