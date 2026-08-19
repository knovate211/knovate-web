import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import { posts, postBySlug } from '@/data/posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = postBySlug(params.slug);
  if (!p) return { title: 'Post not found' };
  return { title: p.title, description: p.excerpt, openGraph: { title: p.title, description: p.excerpt, type: 'article' } };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  if (!p) notFound();
  return (
    <>
      <Section className="!pb-8">
        <div className="mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm font-semibold text-gold-dark">← All posts</Link>
          <span className="mt-6 block w-fit rounded-full bg-sand px-3 py-1 text-xs font-bold text-gold-dark">{p.tag}</span>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-ink">{p.title}</h1>
          <div className="mt-3 text-sm text-muted">By {p.author} · {new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {p.readMins} min read</div>
        </div>
      </Section>
      <div className="mx-auto max-w-2xl px-5 pb-16">
        <article className="space-y-5">
          {p.body.map((b, i) => {
            if (b.type === 'h2') return <h2 key={i} className="font-serif text-2xl font-semibold text-ink">{b.text}</h2>;
            if (b.type === 'ul') return <ul key={i} className="list-disc space-y-2 pl-6 text-ink/90">{b.items!.map((it) => <li key={it}>{it}</li>)}</ul>;
            return <p key={i} className="text-lg leading-relaxed text-ink/90">{b.text}</p>;
          })}
        </article>
      </div>
      <CTASection />
    </>
  );
}
