// Blog posts (hardcoded for launch). Content is an array of blocks so pages stay
// simple; swap for MDX later if non-devs need to edit.
export interface Block { type: 'p' | 'h2' | 'ul'; text?: string; items?: string[] }
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readMins: number;
  tag: string;
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: 'how-to-become-a-full-stack-developer',
    title: 'How to Become a Full-Stack Developer in 2026',
    excerpt: 'A realistic, step-by-step roadmap — from your first HTML page to shipping a production app.',
    date: '2026-08-01', author: 'Knovate Team', readMins: 7, tag: 'Career',
    body: [
      { type: 'p', text: 'Full-stack development is one of the most in-demand skills in tech — but the path can feel overwhelming. Here is how to approach it without burning out.' },
      { type: 'h2', text: '1. Start with the front end' },
      { type: 'p', text: 'Learn HTML, CSS and JavaScript deeply before touching a framework. These fundamentals never go out of date.' },
      { type: 'h2', text: '2. Add a framework and a backend' },
      { type: 'ul', items: ['Pick React for the UI', 'Learn a backend language (Node or Go)', 'Understand REST and databases'] },
      { type: 'h2', text: '3. Build and ship real projects' },
      { type: 'p', text: 'Nothing beats shipping. A single deployed project teaches more than a dozen tutorials — and it is what gets you hired.' },
    ],
  },
  {
    slug: 'why-hands-on-practice-beats-tutorials',
    title: 'Why Hands-On Practice Beats Passive Tutorials',
    excerpt: 'The tutorial trap is real. Here is how deliberate practice rewires the way you learn to code.',
    date: '2026-07-18', author: 'Knovate Team', readMins: 5, tag: 'Learning',
    body: [
      { type: 'p', text: 'You can watch a hundred hours of tutorials and still freeze in front of a blank editor. The fix is deliberate, hands-on practice.' },
      { type: 'h2', text: 'Learning by doing' },
      { type: 'p', text: 'Every Knovate track pairs concepts with auto-graded coding problems, so you practise the moment you learn.' },
    ],
  },
  {
    slug: 'landing-your-first-tech-job',
    title: 'Landing Your First Tech Job: What Actually Works',
    excerpt: 'Portfolios, projects and interview prep — the moves that move the needle for first-time job seekers.',
    date: '2026-07-02', author: 'Knovate Team', readMins: 6, tag: 'Career',
    body: [
      { type: 'p', text: 'Getting your first tech role is less about certificates and more about proof. Here is what hiring managers actually look for.' },
      { type: 'h2', text: 'Show, do not tell' },
      { type: 'ul', items: ['A deployed project with a live link', 'Clean, readable code on GitHub', 'The ability to explain your decisions'] },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
