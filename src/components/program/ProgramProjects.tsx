import { Heading } from '@/components/Section';
import type { ProgramProject } from '@/data/projects';

const SHOWN = 8;

function ProjectCard({ p, n }: { p: ProgramProject; n: number }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_4px_20px_rgba(60,40,10,0.04)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6e6cf] font-serif text-sm font-bold text-gold-dark">
        {String(n).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug text-ink">{p.title}</h3>
        <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
          {p.capstone && <span className="rounded-full bg-gold px-2.5 py-0.5 font-semibold text-white">Capstone</span>}
          {p.from && <span className="rounded-full bg-sand px-2.5 py-0.5 text-muted">{p.from}</span>}
        </div>
      </div>
    </li>
  );
}

// Projects from the program's syllabus. Long lists (Full Stack collects every
// included program's projects) show the first few and fold the rest away.
export default function ProgramProjects({ projects }: { projects: ProgramProject[] }) {
  if (!projects.length) return null;
  const first = projects.slice(0, SHOWN);
  const rest = projects.slice(SHOWN);

  return (
    <section className="bg-[#fbf3e8] py-16 md:py-20">
      <div className="mx-auto max-w-content px-5">
        <Heading className="text-center">
          Projects you&apos;ll <span className="text-gold-dark">build</span>
        </Heading>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          {projects.length} hands-on {projects.length === 1 ? 'project' : 'projects'}, reviewed by mentors, that go straight into your portfolio.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {first.map((p, i) => <ProjectCard key={`${p.from}-${p.title}`} p={p} n={i + 1} />)}
        </ul>
        {rest.length > 0 && (
          <details className="group mt-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-gold/60 px-5 py-2 text-sm font-semibold text-gold-dark hover:bg-gold hover:text-white">
              <span className="group-open:hidden">Show all {projects.length} projects</span>
              <span className="hidden group-open:inline">Show fewer</span>
            </summary>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((p, i) => <ProjectCard key={`${p.from}-${p.title}`} p={p} n={SHOWN + i + 1} />)}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
