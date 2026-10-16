import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import PostList from '@/components/blog/PostList';
import { formatDate } from '@/lib/format';
import { allTags, postsByDate } from '@/data/posts';

export const metadata: Metadata = pageMeta({
  title: 'Coding Careers, Interview Prep & Learning Guides',
  description:
    'Practical guides on learning to code and getting hired: developer roadmaps, SQL interview questions, GenAI for engineers and moving into test automation.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = postsByDate();
  // One post is highlighted above the grid; it still appears in the grid below
  // so the tag filter never hides it.
  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <Section>
      <Eyebrow>Blog & Resources</Eyebrow>
      <Heading as="h1">Learn, grow, get hired</Heading>
      <p className="mt-3 max-w-2xl text-muted">
        Practical writing from the Knovate team — roadmaps, interview preparation and honest advice
        about building a career in tech. No hype, no shortcuts that do not exist.
      </p>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-10 grid gap-6 rounded-2xl border border-ink/10 bg-gradient-to-br from-sand to-cream p-8 transition-shadow hover:shadow-lg md:grid-cols-[2fr_1fr] md:items-center"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">Featured</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">{featured.tag}</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-ink group-hover:text-gold-dark md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{featured.excerpt}</p>
            <div className="mt-4 text-xs text-muted">
              {formatDate(featured.date)} · {featured.readMins} min read
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-gold px-5 py-2.5 font-semibold text-white md:justify-self-end">
            Read the guide →
          </span>
        </Link>
      )}

      <PostList posts={posts} tags={allTags()} />
    </Section>
  );
}
