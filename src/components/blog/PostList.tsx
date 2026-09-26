'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Post } from '@/data/posts';
import { formatDate } from '@/lib/format';

export function PostCard({ p }: { p: Post }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <span className="w-fit rounded-full bg-sand px-3 py-1 text-xs font-bold text-gold-dark">{p.tag}</span>
      <h3 className="mt-4 font-serif text-xl font-semibold text-ink group-hover:text-gold-dark">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
      <div className="mt-4 text-xs text-muted">{formatDate(p.date)} · {p.readMins} min read</div>
    </Link>
  );
}

/** The grid plus its tag filter. Client-side so filtering needs no page load. */
export default function PostList({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? posts.filter((p) => p.tag === tag) : posts;

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        <button
          onClick={() => setTag(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            tag === null ? 'bg-gold text-white' : 'border border-ink/10 bg-white text-muted hover:text-ink'
          }`}
        >
          All posts <span className="ml-1 opacity-70">{posts.length}</span>
        </button>
        {tags.map((t) => {
          const count = posts.filter((p) => p.tag === t).length;
          return (
            <button
              key={t}
              onClick={() => setTag(t === tag ? null : t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                tag === t ? 'bg-gold text-white' : 'border border-ink/10 bg-white text-muted hover:text-ink'
              }`}
            >
              {t} <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <PostCard key={p.slug} p={p} />)}
      </div>
    </>
  );
}
