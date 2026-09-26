import type { MetadataRoute } from 'next';
import { courses } from '@/data/courses';
import { posts } from '@/data/posts';
import { getCertificationConfig } from '@/lib/api';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // /scholarship/apply and /scholarship/submitted are deliberately absent: the
  // first is a form behind the landing page, the second is a private
  // confirmation that is also noindex'd. Only the landing page is a search
  // destination.
  const staticRoutes = ['', '/courses', '/scholarship', '/pricing', '/enroll', '/certifications', '/verify', '/referrals', '/placements', '/hire', '/about', '/contact', '/blog'].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : r === '/scholarship' ? 0.9 : 0.8,
  }));
  const courseRoutes = courses.map((c) => ({ url: `${base}/courses/${c.slug}`, lastModified: new Date(), priority: 0.7 }));
  const postRoutes = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));

  // Exams are configured in the admin panel, not in this repo, so they have to
  // be read at build time. A gateway that is down costs us those URLs in this
  // sitemap rather than failing the whole build.
  let examRoutes: MetadataRoute.Sitemap = [];
  try {
    const cfg = await getCertificationConfig();
    examRoutes = cfg.exams.map((e) => ({
      url: `${base}/certifications/${e.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }));
  } catch {
    // no exams listed this build
  }

  return [...staticRoutes, ...courseRoutes, ...postRoutes, ...examRoutes];
}
