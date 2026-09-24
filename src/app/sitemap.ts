import type { MetadataRoute } from 'next';
import { courses } from '@/data/courses';
import { posts } from '@/data/posts';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  // /scholarship/apply and /scholarship/submitted are deliberately absent: the
  // first is a form behind the landing page, the second is a private
  // confirmation that is also noindex'd. Only the landing page is a search
  // destination.
  const staticRoutes = ['', '/courses', '/scholarship', '/pricing', '/enroll', '/placements', '/hire', '/about', '/contact', '/blog'].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : r === '/scholarship' ? 0.9 : 0.8,
  }));
  const courseRoutes = courses.map((c) => ({ url: `${base}/courses/${c.slug}`, lastModified: new Date(), priority: 0.7 }));
  const postRoutes = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));
  return [...staticRoutes, ...courseRoutes, ...postRoutes];
}
