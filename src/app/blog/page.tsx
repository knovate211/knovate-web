import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { Eyebrow, Heading } from '@/components/Section';
import { posts } from '@/data/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Career advice, learning tips and tech guides from the Knovate team.',
};

export default function BlogPage() {
  return (
    <Section>
      <Eyebrow>Blog & Resources</Eyebrow>
      <Heading>Learn, grow, get hired</Heading>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-lg">
            <span className="w-fit rounded-full bg-sand px-3 py-1 text-xs font-bold text-gold-dark">{p.tag}</span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-ink group-hover:text-gold-dark">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
            <div className="mt-4 text-xs text-muted">{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {p.readMins} min read</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
