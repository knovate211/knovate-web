// Course catalog. `id` matches the backend course-access ids (programModules),
// so an enquiry's `interest` can be mapped to enrollment later.
export interface Course {
  id: string;
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  syllabus: { module: string; topics: string[] }[];
  tags: string[];
  accent: string; // tailwind color token
}

export const courses: Course[] = [
  {
    id: '5',
    slug: 'full-stack',
    title: 'Full Stack Development',
    level: 'Intermediate',
    duration: '6 months',
    tagline: 'Ship end-to-end web apps, from database to deploy.',
    summary:
      'Become a job-ready full-stack engineer. Build real applications with a modern front end, REST/GraphQL APIs, databases and cloud deployment — mentored every step of the way.',
    outcomes: [
      'Build and deploy production-grade full-stack apps',
      'Design REST & GraphQL APIs with authentication',
      'Model relational data and write efficient SQL',
      'Work with Git, CI/CD and cloud hosting',
    ],
    syllabus: [
      { module: 'Frontend Foundations', topics: ['HTML, CSS, responsive design', 'JavaScript & TypeScript', 'React, state & routing'] },
      { module: 'Backend & APIs', topics: ['Node/Go services', 'REST & GraphQL', 'Auth, JWT & security'] },
      { module: 'Data & Deploy', topics: ['PostgreSQL & modeling', 'Docker basics', 'CI/CD & cloud deploy'] },
    ],
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'GenAI'],
    accent: 'gold',
  },
  {
    id: '1',
    slug: 'java-development',
    title: 'Java Development',
    level: 'Beginner',
    duration: '4 months',
    tagline: 'Master Java and object-oriented engineering.',
    summary:
      'A structured path from Java fundamentals to building robust backend applications with Spring, JDBC and clean OOP design.',
    outcomes: ['Write clean, idiomatic Java', 'Understand OOP & data structures', 'Build backend apps with Spring', 'Crack Java coding interviews'],
    syllabus: [
      { module: 'Java Core', topics: ['Syntax, types, control flow', 'OOP: classes, inheritance', 'Collections & generics'] },
      { module: 'Backend with Java', topics: ['JDBC & databases', 'Spring Boot basics', 'REST APIs'] },
    ],
    tags: ['Spring Boot', 'Core Java', 'DSA', 'OOP'],
    accent: 'terracotta',
  },
  {
    id: '2',
    slug: 'frontend',
    title: 'Front-End Technologies',
    level: 'Beginner',
    duration: '3 months',
    tagline: 'Craft beautiful, responsive user interfaces.',
    summary:
      'Learn to build modern, accessible interfaces with HTML, CSS, JavaScript and React — with a strong focus on real-world UI.',
    outcomes: ['Build responsive layouts', 'Master modern JavaScript', 'Develop React apps', 'Apply UI/UX best practices'],
    syllabus: [
      { module: 'Web Basics', topics: ['HTML & semantics', 'CSS & Flexbox/Grid', 'Responsive design'] },
      { module: 'React', topics: ['Components & hooks', 'State management', 'Routing & data'] },
    ],
    tags: ['React', 'JavaScript', 'HTML & CSS', 'Responsive Design'],
    accent: 'sage',
  },
  {
    id: '3',
    slug: 'sql',
    title: 'Mastering SQL',
    level: 'Intermediate',
    duration: '2 months',
    tagline: 'Query, model and reason about data.',
    summary: 'Go from SELECT basics to advanced joins, window functions and query optimisation on real datasets.',
    outcomes: ['Write complex queries confidently', 'Design normalized schemas', 'Optimise slow queries', 'Ace SQL interviews'],
    syllabus: [
      { module: 'SQL Foundations', topics: ['SELECT, WHERE, ORDER', 'Joins & aggregation', 'Subqueries'] },
      { module: 'Advanced SQL', topics: ['Window functions', 'Indexing & performance', 'Transactions'] },
    ],
    tags: ['PostgreSQL', 'Database Design', 'Joins', 'Normalization'],
    accent: 'gold',
  },
  {
    id: '4',
    slug: 'golang',
    title: 'Golang',
    level: 'Intermediate',
    duration: '3 months',
    tagline: 'Build fast, concurrent backend services.',
    summary: 'Learn Go from the ground up and build high-performance, concurrent services and APIs used by modern backends.',
    outcomes: ['Write idiomatic Go', 'Use goroutines & channels', 'Build gRPC/REST services', 'Handle real concurrency'],
    syllabus: [
      { module: 'Go Basics', topics: ['Types, structs, interfaces', 'Error handling', 'Packages & modules'] },
      { module: 'Concurrency & Services', topics: ['Goroutines & channels', 'HTTP & gRPC', 'Testing'] },
    ],
    tags: ['REST APIs', 'Concurrency', 'Microservices', 'Gin'],
    accent: 'sage',
  },
  {
    id: 'genai',
    slug: 'genai',
    title: 'GenAI & Forward Deployed Engineering',
    level: 'Advanced',
    duration: '4 months',
    tagline: 'Build with LLMs and ship AI products.',
    summary: 'Design, build and deploy real applications powered by large language models — RAG, agents, tool use and evaluation.',
    outcomes: ['Build LLM-powered apps', 'Design RAG & agent systems', 'Evaluate & ship AI features', 'Work as a forward-deployed engineer'],
    syllabus: [
      { module: 'LLM Foundations', topics: ['Prompting & context', 'Embeddings & RAG', 'Tool use & agents'] },
      { module: 'Shipping AI', topics: ['Evaluation', 'Guardrails & safety', 'Deployment'] },
    ],
    tags: ['RAG', 'AI Agents', 'LLMs', 'Prompt Engineering', 'LLMOps'],
    accent: 'terracotta',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    level: 'Beginner',
    duration: '3 months',
    tagline: 'Grow brands with data-driven marketing.',
    summary: 'Master modern digital marketing — funnels, paid ads, organic social, email automation, conversion optimisation, analytics and attribution, content and video, and AI-assisted marketing — finishing with a full campaign plan.',
    outcomes: ['Build a marketing funnel', 'Run paid ad campaigns', 'Measure and attribute results', 'Ship a full campaign plan'],
    syllabus: [
      { module: 'Foundations & Channels', topics: ['Funnel & personas', 'Organic social', 'Paid search & social'] },
      { module: 'Convert & Measure', topics: ['Email automation', 'Conversion optimisation', 'GA4, UTMs & attribution'] },
      { module: 'Scale & Prove', topics: ['Content & short-form video', 'AI in marketing', 'Capstone campaign plan'] },
    ],
    tags: ['Performance Marketing', 'GA4', 'Social Media', 'PPC', 'Email Marketing'],
    accent: 'gold',
  },
  {
    id: 'seo',
    slug: 'seo',
    title: 'AI SEO Specialist',
    level: 'Beginner',
    duration: '2 months',
    tagline: 'Get cited by AI search, not just Google.',
    summary: 'Learn how AI answer engines choose their sources, and optimise a real site to be found, understood and cited by ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude — alongside classic search.',
    outcomes: ['Audit what AI says about a brand', 'Structure pages for AI answers', 'Control AI crawlers and llms.txt', 'Earn mentions and measure AI visibility'],
    syllabus: [
      { module: 'AI Search Foundations', topics: ['GEO, AEO & LLM SEO', 'Answer-first content', 'Structured data'] },
      { module: 'Authority & Crawlability', topics: ['AI crawlers & robots.txt', 'E-E-A-T & entities', 'Digital PR'] },
      { module: 'Technical & Measurement', topics: ['AI-assisted technical SEO', 'Tracking AI citations', 'Ethics & limits'] },
    ],
    tags: ['GEO', 'AEO', 'AI SEO', 'LLM SEO', 'AI Search'],
    accent: 'sage',
  },
  {
    id: 'testing',
    slug: 'testing',
    title: 'Software Testing',
    level: 'Beginner',
    duration: '3 months',
    tagline: 'Ship quality with confidence.',
    summary: 'Learn manual and automated testing — from writing test cases to Selenium/API automation and CI integration.',
    outcomes: ['Write effective test cases', 'Automate with Selenium', 'Test APIs', 'Integrate tests in CI'],
    syllabus: [
      { module: 'Testing Foundations', topics: ['Test design', 'Manual testing', 'Bug reporting'] },
      { module: 'Automation', topics: ['Selenium', 'API testing', 'CI integration'] },
    ],
    tags: ['Selenium', 'API Testing', 'Manual Testing', 'Automation', 'QA'],
    accent: 'terracotta',
  },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
