import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import { PostCard } from '@/components/blog/PostList';
import { formatDate } from '@/lib/format';
import { posts, postBySlug, relatedPosts } from '@/data/posts';
import { courseBySlug } from '@/data/courses';
import { pageMeta, breadcrumbLd, SITE_URL } from '@/lib/seo';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = postBySlug(params.slug);
  if (!p) return { title: 'Post not found' };
  return {
    ...pageMeta({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, type: 'article' }),
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      type: 'article',
      publishedTime: p.date,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  if (!p) notFound();

  // Section headings double as the contents list, so it never drifts from the body.
  const headings = p.body.filter((b) => b.type === 'h2').map((b) => b.text!);
  const related = relatedPosts(p.slug);
  const linkedCourses = (p.courses ?? []).map(courseBySlug).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.date,
    url: `${SITE_URL}/blog/${p.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${p.slug}` },
    author: { '@type': 'Organization', name: p.author },
    publisher: { '@type': 'Organization', name: 'Knovate' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: p.title, path: `/blog/${p.slug}` },
        ])),
      }} />

      <Section className="bg-gradient-to-b from-sand to-cream !pb-10">
        <div className="mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm font-semibold text-gold-dark">← All posts</Link>
          <span className="mt-6 block w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-gold-dark">{p.tag}</span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted">{p.excerpt}</p>
          <div className="mt-5 text-sm text-muted">
            By {p.author} · {formatDate(p.date)} · {p.readMins} min read
          </div>
        </div>
      </Section>

      <div className="mx-auto max-w-2xl px-5 py-12">
        {headings.length > 2 && (
          <nav aria-label="On this page" className="mb-10 rounded-xl border border-ink/10 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">On this page</p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {headings.map((h, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="text-ink/80 hover:text-gold-dark">{h}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article className="space-y-5">
          {p.body.map((b, i) => {
            switch (b.type) {
              case 'h2': {
                const index = headings.indexOf(b.text!);
                return (
                  <h2
                    key={i}
                    id={`section-${index}`}
                    className="scroll-mt-24 pt-4 font-serif text-2xl font-semibold text-ink"
                  >
                    {b.text}
                  </h2>
                );
              }
              case 'ul':
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-ink/90">
                    {b.items!.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                );
              case 'ol':
                return (
                  <ol key={i} className="list-decimal space-y-2 pl-6 text-lg leading-relaxed text-ink/90">
                    {b.items!.map((it) => <li key={it}>{it}</li>)}
                  </ol>
                );
              case 'note':
                return (
                  <aside key={i} className="rounded-xl border-l-4 border-gold bg-sand/60 p-5 text-ink/90">
                    {b.text}
                  </aside>
                );
              case 'quote':
                return (
                  <blockquote key={i} className="border-l-4 border-ink/15 pl-5 font-serif text-xl italic text-ink/80">
                    {b.text}
                  </blockquote>
                );
              default:
                return <p key={i} className="text-lg leading-relaxed text-ink/90">{b.text}</p>;
            }
          })}
        </article>

        {linkedCourses.length > 0 && (
          <aside className="mt-12 rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Courses related to this article</h2>
            <ul className="mt-4 space-y-3">
              {linkedCourses.map((c) => (
                <li key={c!.slug}>
                  <Link href={`/courses/${c!.slug}`} className="group flex items-baseline justify-between gap-4">
                    <span className="font-semibold text-ink group-hover:text-gold-dark">{c!.title}</span>
                    <span className="shrink-0 text-sm text-muted">{c!.level} · {c!.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <Section className="bg-sand/50 !py-14">
          <h2 className="font-serif text-2xl font-semibold text-ink">Keep reading</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => <PostCard key={r.slug} p={r} />)}
          </div>
        </Section>
      )}

      <CTASection />
    </>
  );
}
