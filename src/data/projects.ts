// Projects shown on a program page, read straight out of that program's
// syllabus (data/syllabus.ts) so the page never lists a project the program
// doesn't actually teach.
import { syllabus } from './syllabus';
import { courses } from './courses';

export interface ProgramProject {
  title: string;
  capstone: boolean;
  /** For bundles: which included program the project comes from. */
  from?: string;
}

// "Project 3: Library Management System", "Capstone: LMS Backend",
// "Final Capstone Project", "The Capstone Campaign Plan".
const MAJOR = /^project \d+\s*:|capstone/i;
// "Todo App Project", "HTML Mini Project" — used only when a program has no major projects.
const MINI = /project$/i;
const NOT_A_PROJECT = /project structure/i;

function projectsOf(slug: string): ProgramProject[] {
  const lessons = (syllabus[slug] ?? []).flatMap((m) => m.lessons).filter((l) => !NOT_A_PROJECT.test(l));
  const major = lessons.filter((l) => MAJOR.test(l));
  const picked = major.length ? major : lessons.filter((l) => MINI.test(l));
  return picked.map((l) => ({
    title: l.replace(/^project \d+\s*:\s*/i, '').replace(/^capstone\s*:\s*/i, ''),
    capstone: /capstone/i.test(l),
  }));
}

/** Projects for a program; a bundle (Full Stack) collects them from the programs it includes. */
export function programProjects(slug: string): ProgramProject[] {
  if (slug !== 'full-stack') return projectsOf(slug);
  return (syllabus['full-stack'] ?? []).flatMap((m) => {
    const included = courses.find((c) => c.title === m.module);
    return included ? projectsOf(included.slug).map((p) => ({ ...p, from: included.title })) : [];
  });
}
