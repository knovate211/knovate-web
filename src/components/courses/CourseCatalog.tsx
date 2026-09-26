'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { catalog, categoryTabs, durationBuckets, CatalogCourse, Level } from '@/data/catalog';
import { priceFor, inr } from '@/data/pricing';
import HeroImage from '@/components/home/HeroImage';
import { BlocksIcon, BriefcaseIcon, CapIcon, CloudIcon, CodeIcon, GrowthIcon, LaptopIcon, UsersIcon } from '@/components/home/Icons';

const tabIcon: Record<string, typeof CodeIcon> = { laptop: LaptopIcon, brain: BlocksIcon, cloud: CloudIcon, pen: BriefcaseIcon, users: UsersIcon };
const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function Check({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-[14px] text-ink/80">
      <span className="flex items-center gap-3">
        <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 cursor-pointer rounded border-ink/25 accent-gold" />
        {label}
      </span>
      <span className="text-[12px] text-muted">{count}</span>
    </label>
  );
}

function Card({ c }: { c: CatalogCourse }) {
  const [fav, setFav] = useState(false);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-ink/5 bg-white shadow-[0_4px_20px_rgba(60,40,10,0.05)] transition-shadow hover:shadow-lg">
      <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${c.thumb}`}>
        {c.popular && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-gold px-2 py-1 text-[11px] font-medium text-white">✦ Most Popular</span>
        )}
        <button onClick={() => setFav((f) => !f)} aria-label="Save course" className="absolute right-2.5 top-2.5 text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
        </button>
        {c.image ? (
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-md">
            <Image src={c.image} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          </span>
        ) : (
          <span className="flex h-16 min-w-16 items-center justify-center rounded-2xl bg-white/90 px-3 text-2xl font-bold text-ink shadow-md">{c.logo}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] text-ink/70"><span className="text-gold-dark">▣</span>{c.category}</p>
        <h3 className="mt-2 text-[14px] font-medium leading-snug text-ink">{c.title}</h3>
        <p className="mt-2 text-[12px] text-muted">{c.level} • {c.duration}</p>
        {priceFor(c.id) && (
          <p className="mt-1.5 text-[13px] text-ink">
            <span className="text-[11px] text-muted">From </span>
            <span className="font-semibold">{inr(priceFor(c.id)!.selfPaced)}</span>
          </p>
        )}
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted">{c.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {c.tags.map((t) => (
            <span key={t} className="rounded bg-sand px-1.5 py-0.5 text-[10px] text-ink/70">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Link href={`/courses/${c.slug}`} className="whitespace-nowrap rounded-full border border-gold/60 px-2.5 py-1 text-[11px] font-medium text-gold-dark hover:bg-gold hover:text-white">
            View course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CourseCatalog() {
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [tab, setTab] = useState<number | null>(null);
  const [lv, setLv] = useState<Level[]>([]);
  const [dur, setDur] = useState<number[]>([]);
  const [sort, setSort] = useState('popular');

  const base = useMemo(() => catalog.filter((c) =>
    (tab === null || categoryTabs[tab].label === c.category) &&
    (!query || c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()) || c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
  ), [tab, query]);

  const results = useMemo(() => {
    const r = base.filter((c) =>
      (!lv.length || lv.includes(c.level)) &&
      (!dur.length || dur.some((i) => durationBuckets[i].test(c.months))));
    if (sort === 'short') r.sort((a, b) => a.months - b.months);
    else if (sort === 'long') r.sort((a, b) => b.months - a.months);
    else if (sort === 'price') r.sort((a, b) => (priceFor(a.id)?.selfPaced ?? 0) - (priceFor(b.id)?.selfPaced ?? 0));
    else r.sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
    return r;
  }, [base, lv, dur, sort]);

  return <CatalogBody {...{ query, draft, setDraft, setQuery, tab, setTab, lv, setLv, dur, setDur, sort, setSort, base, results }} />;
}

type BodyProps = {
  query: string; draft: string; setDraft: (v: string) => void; setQuery: (v: string) => void;
  tab: number | null; setTab: (v: number | null) => void;
  lv: Level[]; setLv: (v: Level[]) => void; dur: number[]; setDur: (v: number[]) => void;
  sort: string; setSort: (v: string) => void; base: CatalogCourse[]; results: CatalogCourse[];
};

function CatalogBody(p: BodyProps) {
  const tabCount = (i: number) => catalog.filter((c) => categoryTabs[i].label === c.category).length;
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7efe2] to-[#faf6ef]">
        <div className="mx-auto grid max-w-[1360px] items-center gap-8 px-5 md:px-10 lg:grid-cols-2">
          <div className="py-12">
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-gold-dark">Our courses</p>
            <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-[50px]">
              Learn in-demand skills<br />and build your future.
            </h1>
            <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-muted">
              Explore our curated courses, designed by industry experts to help you grow, get hired, and achieve your goals.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); p.setQuery(p.draft.trim()); }} className="mt-7 flex max-w-[612px] gap-0.5">
              <label className="flex flex-1 items-center gap-3 rounded-l-lg border border-ink/10 bg-white px-4 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-ink/70"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
                <input value={p.draft} onChange={(e) => { p.setDraft(e.target.value); if (!e.target.value) p.setQuery(''); }} placeholder="Search for a course (e.g. Python, Data Science, OS...)" className="w-full bg-transparent py-3.5 text-[14px] text-ink outline-none placeholder:text-muted" />
              </label>
              <button className="rounded-r-lg bg-gold px-7 text-[15px] font-semibold text-white shadow-sm hover:bg-gold-dark">Search</button>
            </form>
          </div>
          <HeroArt />
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10">
        {/* Category tabs */}
        <div className="-mx-1 flex gap-5 overflow-x-auto px-1 pt-6 pb-2">
          <button onClick={() => p.setTab(null)} className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium ${p.tab === null ? 'bg-gold text-white shadow-md' : 'border border-ink/10 bg-white text-ink'}`}>
            <CodeIcon width={20} height={20} /> All Courses
            <span className={`rounded-full px-2 py-0.5 text-[12px] ${p.tab === null ? 'bg-white/20' : ''}`}>{catalog.length}</span>
          </button>
          {categoryTabs.map((t, i) => {
            const Icon = tabIcon[t.icon];
            const active = p.tab === i;
            return (
              <button key={t.label} onClick={() => p.setTab(active ? null : i)} className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-[14px] ${active ? 'bg-gold text-white shadow-md' : 'border border-ink/10 bg-white text-ink/85 hover:border-gold/40'}`}>
                <Icon width={20} height={20} /> {t.label}
                <span className="ml-4 text-[12px]">{tabCount(i)}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[265px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-xl border border-ink/5 bg-[#f7f1e8] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-ink">Filters</h2>
              <button onClick={() => { p.setLv([]); p.setDur([]); }} className="text-[12px] text-gold-dark hover:underline">Clear all</button>
            </div>
            <FilterGroup title="Level">
              {levels.map((l) => <Check key={l} label={l} count={p.base.filter((c) => c.level === l).length} checked={p.lv.includes(l)} onChange={() => p.setLv(toggle(p.lv, l))} />)}
            </FilterGroup>
            <FilterGroup title="Duration" last>
              {durationBuckets.map((d, i) => <Check key={d.label} label={d.label} count={p.base.filter((c) => d.test(c.months)).length} checked={p.dur.includes(i)} onChange={() => p.setDur(toggle(p.dur, i))} />)}
            </FilterGroup>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[13px] text-ink/80">{p.results.length} courses</p>
              <label className="flex items-center gap-3 text-[12px] text-muted">
                Sort by
                <select value={p.sort} onChange={(e) => p.setSort(e.target.value)} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-[12px] text-ink">
                  <option value="popular">Most Popular</option>
                  <option value="short">Duration: Shortest first</option>
                  <option value="long">Duration: Longest first</option>
                  <option value="price">Price: Low to high</option>
                </select>
              </label>
            </div>
            {p.results.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {p.results.map((c) => <Card key={c.slug} c={c} />)}
              </div>
            ) : (
              <p className="rounded-xl bg-white p-10 text-center text-muted">No courses match these filters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`py-5 ${last ? '' : 'border-b border-ink/10'}`}>
      <h3 className="mb-2 text-[14px] font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Float({ Icon, a, b, className }: { Icon: typeof CapIcon; a: string; b: string; className: string }) {
  return (
    <div className={`absolute z-20 flex items-center gap-3 rounded-xl bg-white/90 px-3.5 py-3 shadow-[0_8px_30px_rgba(60,40,10,0.08)] ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6e6cf] text-gold-dark"><Icon width={20} height={20} /></span>
      <p className="text-[13px] leading-tight text-ink/80">{a}<br />{b}</p>
    </div>
  );
}

function HeroArt() {
  return (
    <div className="relative hidden h-[312px] lg:block">
      <div className="absolute bottom-0 left-[22%] h-[300px] w-[420px] rounded-t-full bg-[#f3dfbf]/70" />
      <p className="absolute left-[12%] top-[45%] z-20 -rotate-12 font-serif text-[15px] italic leading-snug text-ink/80">Your<br />next chapter<br />starts here</p>
      <svg className="absolute left-[24%] top-[74%] z-20 h-10 w-10 text-gold" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M8 4l8 6M4 18h12M8 32l8-6" /></svg>
      <div className="absolute inset-y-0 left-[25%] right-0"><HeroImage src="/images/courses-hero.png" /></div>
      <Float Icon={CapIcon} a="Learn" b="at your pace" className="left-[16%] top-[14%]" />
      <Float Icon={GrowthIcon} a="Build" b="real projects" className="right-[6%] top-[12%]" />
      <Float Icon={BriefcaseIcon} a="Get job" b="ready" className="right-[1%] top-[45%]" />
    </div>
  );
}
