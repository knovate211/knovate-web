import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * Page metadata with a canonical URL attached.
 *
 * Canonicals matter here because the same page is reachable with and without a
 * trailing slash, with tracking parameters on campaign links, and (on Netlify)
 * on the deploy-preview domain. Without one, those are competing copies.
 *
 * `title` must NOT include the brand: the layout's title template appends
 * " · Knovate" already, and a title that repeats it wastes the ~60 characters
 * Google shows.
 */
export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type },
    twitter: { title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Breadcrumb structured data. Google renders it in place of the raw URL in
 * results, which is worth more than the click-through of a bare link.
 */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/** FAQ structured data, from the same q/a pairs the page renders. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
