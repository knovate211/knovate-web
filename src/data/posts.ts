// Blog posts (hardcoded for launch). Content is an array of blocks so pages stay
// simple; swap for MDX later if non-devs need to edit.
//
// Keep the advice concrete and honest: every claim about Knovate here must be
// something the platform actually does (see data/courses.ts and data/syllabus.ts).
// No invented placement figures, salaries or student counts.
export interface Block {
  type: 'p' | 'h2' | 'ul' | 'ol' | 'note' | 'quote';
  text?: string;
  items?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readMins: number;
  tag: string;
  /** Shown on the blog index above the grid. At most one post should set this. */
  featured?: boolean;
  /** Slugs of courses this post relates to; rendered as links on the article. */
  courses?: string[];
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: 'how-to-become-a-full-stack-developer',
    title: 'How to Become a Full-Stack Developer in 2026',
    excerpt:
      'A realistic month-by-month roadmap — what to learn, what to skip, and how to tell whether you are actually ready to apply.',
    date: '2026-08-01',
    author: 'Knovate Team',
    readMins: 9,
    tag: 'Career',
    featured: true,
    courses: ['full-stack', 'frontend', 'java-development'],
    body: [
      { type: 'p', text: 'Most people do not fail at full-stack development because the material is too hard. They fail because the path has no obvious end — there is always one more framework, one more tool, one more course. This roadmap is deliberately finite. It assumes six focused months and no prior experience, and it ends at the point where you are genuinely ready to apply for jobs.' },

      { type: 'h2', text: 'Months 1–2: the front end, properly' },
      { type: 'p', text: 'Learn HTML, CSS and JavaScript before you touch a framework. This is the advice everyone gives and almost nobody follows, because frameworks feel more like real work. But every React bug you will spend a whole evening on later is, underneath, a JavaScript bug — a misunderstood closure, a stale reference, an async call that resolved after the component was gone.' },
      { type: 'p', text: 'Concretely, you should be able to build a responsive page from a design without copying a template, centre things in CSS without guessing, and explain what happens when you type a URL into a browser. Flexbox and Grid are worth a week on their own; layout is the single most common thing junior developers get asked to do.' },
      { type: 'note', text: 'A good checkpoint: rebuild a site you use every day from scratch, without looking at its code. If you cannot, you are not ready for React yet — and that is fine.' },

      { type: 'h2', text: 'Months 3–4: one framework, one backend language' },
      { type: 'p', text: 'Now add React. Learn state, props, hooks and routing, and resist adding a state management library until you have felt the pain that one solves. Then pick exactly one backend language and stay with it. Java with Spring Boot is the safest choice for the Indian job market; Node keeps you in one language; Go is smaller and pays well but has fewer junior openings.' },
      { type: 'p', text: 'Whichever you pick, the concepts transfer: how an HTTP request becomes a response, how to design a REST endpoint, how authentication actually works, and why you never store a password as plain text. Learn those once and the next language is a syntax change.' },
      { type: 'ul', items: [
        'Build a REST API with real routes, not just a hello-world endpoint',
        'Add login with hashed passwords and tokens, and understand every line of it',
        'Connect to a real database instead of an in-memory array',
        'Write at least a few tests, so you know what a test is when an interviewer asks',
      ] },

      { type: 'h2', text: 'Month 5: databases and deployment' },
      { type: 'p', text: 'SQL is the most undervalued skill on this list. It is also the one that shows up in almost every interview, because it is easy to test and hard to fake. Learn joins until they are boring, understand what an index does to a query, and know why a transaction exists.' },
      { type: 'p', text: 'Then deploy something. A project running on a real URL, with a real database behind it, teaches you about environment variables, build steps, CORS and logs — the unglamorous knowledge that separates someone who has shipped from someone who has only ever run npm start.' },

      { type: 'h2', text: 'Month 6: proof, not certificates' },
      { type: 'p', text: 'Hiring managers skim. What survives a ten-second skim is a live link and a clear README. Two finished, deployed projects with clean code beat six half-built tutorial clones, and beat any certificate you can name.' },
      { type: 'p', text: 'Pick projects that require decisions: something with authentication, something with a non-trivial data model, ideally something a real person would use. "Todo app" is fine as practice and invisible on a CV. A booking system for your friend\'s salon is not.' },

      { type: 'h2', text: 'What to skip' },
      { type: 'ul', items: [
        'Learning two frameworks at once, in the hope of doubling your options',
        'Microservices, Kubernetes and system design at this stage — these are second-job problems',
        'Reading about a technology you have not yet used; it will not stick',
        'Collecting certificates instead of shipping projects',
      ] },

      { type: 'h2', text: 'How to know you are ready' },
      { type: 'p', text: 'You are ready to apply when you can do three things: build a small full-stack feature end to end without a tutorial open, read an unfamiliar codebase and find where a change belongs, and explain a decision you made in your own project and what you would do differently. Nobody expects a junior developer to know everything. They expect you to be able to make progress without being carried.' },
      { type: 'p', text: 'If you would rather not assemble this path alone, our Full Stack Development track covers exactly this sequence with mentors, projects and reviews along the way.' },
    ],
  },

  {
    slug: 'why-hands-on-practice-beats-tutorials',
    title: 'Why Hands-On Practice Beats Passive Tutorials',
    excerpt:
      'Tutorial hell is not a motivation problem — it is a feedback problem. Here is what to do instead, starting today.',
    date: '2026-07-18',
    author: 'Knovate Team',
    readMins: 6,
    tag: 'Learning',
    courses: ['java-development', 'sql'],
    body: [
      { type: 'p', text: 'You can watch a hundred hours of tutorials and still freeze in front of an empty editor. Almost every learner hits this, and almost every one of them concludes they are not smart enough. They are wrong about the cause.' },

      { type: 'h2', text: 'Why watching feels like learning' },
      { type: 'p', text: 'Following a tutorial creates fluency — the material is familiar, the instructor is clear, nothing is confusing. Your brain reads that comfort as competence. But recognising a solution is a completely different skill from producing one, and only the second one gets you hired.' },
      { type: 'p', text: 'This is why the gap appears the moment the video stops. The tutorial gave you the decisions already made. Real work is mostly deciding.' },

      { type: 'h2', text: 'Retrieval is the whole trick' },
      { type: 'p', text: 'Decades of learning research keep landing on the same finding: pulling information out of your head builds durable memory far better than putting it in again. Re-reading notes feels productive and does almost nothing. Closing the notes and trying to reconstruct the idea feels awful and works.' },
      { type: 'p', text: 'For programming, retrieval has a convenient form — write the code without help and see whether it runs.' },

      { type: 'h2', text: 'A practice loop that works' },
      { type: 'ol', items: [
        'Watch or read one concept. One, not a playlist.',
        'Close everything and rebuild the example from memory. You will get stuck; that is the point.',
        'Only after getting stuck, look up the specific thing you missed.',
        'Change the problem. Different input, extra rule, one more feature. This is where understanding forms.',
        'Come back to it three days later and do it again, cold.',
      ] },

      { type: 'h2', text: 'Struggling productively' },
      { type: 'p', text: 'There is a difference between useful struggle and being stuck. Useful struggle is not knowing the answer but knowing what you are trying. Being stuck is staring at an error with no next move. Give yourself a timebox — twenty minutes is a good default — then look it up, and write down what the gap was.' },
      { type: 'note', text: 'Keep a "things that caught me" file. Reviewing that file before an interview is more useful than re-reading any textbook, because it is a record of your actual gaps, not generic ones.' },

      { type: 'h2', text: 'How our courses are built around this' },
      { type: 'p', text: 'Every Knovate module ends with practice you cannot passively watch: coding problems graded automatically in the browser, module quizzes, and assignments written in a real editor. When your code fails a test case, you get the one thing a video cannot give you — immediate, specific feedback while the concept is still fresh.' },
    ],
  },

  {
    slug: 'landing-your-first-tech-job',
    title: 'Landing Your First Tech Job: What Actually Works',
    excerpt:
      'What a hiring manager sees in the first ten seconds, why most fresher CVs fail, and how to build proof instead of claims.',
    date: '2026-07-02',
    author: 'Knovate Team',
    readMins: 8,
    tag: 'Career',
    courses: ['full-stack', 'testing'],
    body: [
      { type: 'p', text: 'Getting a first tech role is less about credentials and more about proof. The hard part is that most advice tells you what to have — a portfolio, good projects, strong fundamentals — without telling you what those actually look like from the other side of the table.' },

      { type: 'h2', text: 'The first ten seconds' },
      { type: 'p', text: 'A fresher opening gets a lot of applications, and the first pass is fast. What a reviewer is looking for is something concrete to hold on to: a project with a live link, a GitHub profile with real commits, a specific stack that matches what the team uses.' },
      { type: 'p', text: 'What loses that ten seconds: a list of twenty technologies with no evidence behind any of them, "passionate self-motivated team player" as the opening line, and a CV that mentions no project a stranger can look at.' },

      { type: 'h2', text: 'Two good projects beat six weak ones' },
      { type: 'p', text: 'A strong fresher project has three properties. It is deployed, so someone can click it. It required decisions, so you have something to talk about. And it is finished — including the boring parts like error states, empty states and a README that explains how to run it.' },
      { type: 'ul', items: [
        'A live URL at the top of the README, before anything else',
        'A short paragraph on what problem it solves and who for',
        'One honest section on what you would do differently, which interviewers love',
        'Commits spread over time, not a single "initial commit" containing everything',
      ] },

      { type: 'h2', text: 'The CV, in plain terms' },
      { type: 'p', text: 'One page. Projects above education if you have no work experience. For every project, three lines: what it does, what you built it with, and one thing that was hard. Skills listed only if you would be comfortable being asked about them in the next hour.' },
      { type: 'p', text: 'Tailor the top third to the job posting. Not the whole CV — just make sure the technologies they named appear where a skimming reader will see them, assuming you honestly have them.' },

      { type: 'h2', text: 'Preparing for the interview you will actually get' },
      { type: 'p', text: 'Most fresher interviews are more predictable than people fear. Expect a coding round on arrays, strings and hash maps; some SQL; questions about your own projects; and a conversation about fundamentals in your main language.' },
      { type: 'ol', items: [
        'Practise coding problems by writing code, not by reading solutions',
        'Be able to walk through your own project file by file, explaining why you structured it that way',
        'Prepare the three questions you will be asked about your stack, and answer them out loud',
        'Do at least one mock interview with another person — talking while thinking is its own skill',
      ] },

      { type: 'h2', text: 'Applying without a referral' },
      { type: 'p', text: 'Volume alone rarely works. A focused approach does better: fewer applications, each one where you can name why you fit, sent soon after the posting appears. Where you can, reach a human — a short, specific message to someone on the team beats a hundred anonymous submissions.' },
      { type: 'p', text: 'And keep going after rejections that arrive with no feedback. Most of them are about headcount, timing or a stronger match, not about you being unqualified.' },

      { type: 'h2', text: 'Where we help' },
      { type: 'p', text: 'Knovate learners get placement support built into their track: resume review, mock interviews, technical practice and introductions to our hiring partners. The work still has to be yours — but you do not have to guess at what good looks like.' },
    ],
  },

  {
    slug: 'sql-interview-questions-freshers',
    title: 'The SQL Every Fresher Interview Actually Tests',
    excerpt:
      'Joins, GROUP BY, subqueries and window functions — the small set of SQL that shows up again and again, with the traps.',
    date: '2026-08-20',
    author: 'Knovate Team',
    readMins: 8,
    tag: 'Interview Prep',
    courses: ['sql'],
    body: [
      { type: 'p', text: 'SQL is the most reliable scoring opportunity in a fresher interview. The syntax is small, the question bank is remarkably stable across companies, and unlike system design there is a right answer you can practise towards. Here is what keeps coming up.' },

      { type: 'h2', text: '1. Joins, and the one everyone gets wrong' },
      { type: 'p', text: 'You will be asked the difference between INNER, LEFT, RIGHT and FULL joins. The definitions are easy; the follow-up is where people fall down: "what happens to rows with no match?" A LEFT JOIN keeps every row from the left table and fills the missing right-hand columns with NULL.' },
      { type: 'p', text: 'The classic trap is putting a condition on the right table in the WHERE clause instead of the ON clause. Doing that throws away exactly the NULL rows your LEFT JOIN was there to keep, quietly turning it into an inner join.' },

      { type: 'h2', text: '2. GROUP BY, HAVING and the aggregate rule' },
      { type: 'p', text: 'Know that WHERE filters rows before grouping and HAVING filters groups after. Expect "find customers with more than three orders" in some form, and expect a follow-up asking why a non-aggregated column cannot appear in the SELECT list unless it is in the GROUP BY.' },
      { type: 'note', text: 'COUNT(*) counts rows; COUNT(column) skips NULLs. That distinction is a favourite one-line question, and it changes answers in real reports.' },

      { type: 'h2', text: '3. NULL behaves differently from everything else' },
      { type: 'p', text: 'NULL is not equal to anything, including itself. That is why you write IS NULL rather than = NULL, why NOT IN with a NULL in the list returns no rows at all, and why aggregates skip NULLs silently. A surprising number of candidates lose an otherwise perfect answer here.' },

      { type: 'h2', text: '4. Subqueries versus joins' },
      { type: 'p', text: 'Be able to write the same query both ways, and to say when each reads better. Know what a correlated subquery is — one that references the outer query and therefore runs per row — and why that can be slow.' },

      { type: 'h2', text: '5. The second-highest salary question' },
      { type: 'p', text: 'It is asked so often it is almost a tradition. Be ready with two solutions: one using a subquery with MAX, and one using a window function such as DENSE_RANK. Then be ready for the real question behind it: what should happen when two people earn the same salary? That is where RANK, DENSE_RANK and ROW_NUMBER differ, and where a thoughtful answer stands out.' },

      { type: 'h2', text: '6. Enough about indexes to be credible' },
      { type: 'p', text: 'You are not expected to tune a database. You are expected to know that an index speeds up reads and costs you on writes, that it helps filtering and sorting on the indexed columns, and that wrapping a column in a function in your WHERE clause usually stops the index being used.' },

      { type: 'h2', text: 'How to practise' },
      { type: 'ul', items: [
        'Write queries against a real database, not on paper — being wrong quickly is the point',
        'Build a small schema of your own with users, orders and products, then ask questions of it',
        'For each query, predict the row count before you run it',
        'Say your reasoning out loud; interviews are partly a talking exercise',
      ] },
      { type: 'p', text: 'Our Mastering SQL track works through exactly this ground — from schema design and joins through aggregation, subqueries, transactions and normalisation — with practice problems at every module.' },
    ],
  },

  {
    slug: 'learn-genai-as-a-developer',
    title: 'Learning GenAI as a Developer: What Is Worth Your Time',
    excerpt:
      'You do not need a machine learning PhD to build with LLMs. Here is the shortlist that matters, and the hype you can skip.',
    date: '2026-09-05',
    author: 'Knovate Team',
    readMins: 9,
    tag: 'AI',
    courses: ['genai'],
    body: [
      { type: 'p', text: 'Two things are true at once: generative AI has genuinely changed what software can do, and most of what is written about it is noise. If you are a developer wondering where to spend your study time, this is the short version.' },

      { type: 'h2', text: 'You are not becoming a researcher' },
      { type: 'p', text: 'There is a real difference between training models and building with them. Training is research work: mathematics, enormous datasets, expensive hardware. Building with them is software engineering — APIs, data pipelines, evaluation, cost and latency. The second is where nearly all the jobs are, and it is reachable from where you already stand as a developer.' },
      { type: 'p', text: 'You do need working Python, comfort with APIs and asynchronous code, and enough machine learning vocabulary to follow a conversation. You do not need to derive backpropagation.' },

      { type: 'h2', text: 'The concepts that actually come up' },
      { type: 'ul', items: [
        'Tokens and the context window — why a model "forgets", and why your bill scales the way it does',
        'Embeddings and vector search — turning text into numbers you can compare for similarity',
        'Retrieval-augmented generation (RAG) — grounding answers in your own documents',
        'Tool calling and agents — letting a model trigger real actions, safely',
        'Evaluation — deciding whether a change made your system better, rather than guessing',
      ] },

      { type: 'h2', text: 'RAG is the workhorse' },
      { type: 'p', text: 'Most useful AI products in companies today are some form of retrieval: take a question, find the relevant pieces of your own content, and hand those to the model along with the question. It is how you get answers grounded in your policies, your documentation, your data.' },
      { type: 'p', text: 'It also has real engineering in it, which is why it is good to learn. How you split documents changes the answers. Retrieval quality matters more than the model choice. And when the output is wrong, the cause is usually that the right chunk was never retrieved — a search problem, not a model problem.' },

      { type: 'h2', text: 'Prompting is a skill, not a career' },
      { type: 'p', text: 'Clear instructions, examples, and asking for structured output will take you most of the way. Learn it well, then stop — prompting is a component of the job, not the job itself.' },

      { type: 'h2', text: 'What to skip for now' },
      { type: 'ol', items: [
        'Fine-tuning. It is the third thing to reach for, after better prompting and better retrieval, and it is often the wrong tool.',
        'Chasing benchmark news. Models change monthly; the architecture around them changes slowly.',
        'Framework tourism. Learn what the framework is doing underneath, or you will be helpless when it breaks.',
      ] },

      { type: 'h2', text: 'The part nobody teaches: making it production-ready' },
      { type: 'p', text: 'A demo that works once is easy. What makes you employable is everything after: streaming responses so the interface feels alive, handling rate limits and failures, keeping token costs predictable, tracing what the system did when a user complains, and having an evaluation set so you can tell whether a change helped.' },
      { type: 'note', text: 'Treat model output as untrusted input. If it can trigger an action or reach a database, it needs the same scepticism you would apply to anything a user typed.' },

      { type: 'h2', text: 'Build these three things' },
      { type: 'p', text: 'A document question-answering system over your own files. An assistant that uses tools to do something real. And something multimodal — voice or images. Those three cover most of the patterns you will meet at work, and they make far better interview material than a chatbot wrapper.' },
      { type: 'p', text: 'That sequence is the backbone of our GenAI & Forward Deployed Engineering track, which runs from Python and ML foundations through RAG, agents, fine-tuning, production serving and LLMOps.' },
    ],
  },

  {
    slug: 'manual-testing-to-automation-career',
    title: 'From Manual Testing to Automation: A Practical Path',
    excerpt:
      'Automation is not the end of manual testing — it is a second skill on top of it. How to make the move without starting over.',
    date: '2026-08-12',
    author: 'Knovate Team',
    readMins: 7,
    tag: 'Career',
    courses: ['testing'],
    body: [
      { type: 'p', text: 'If you are testing software manually and reading that automation is taking over, the honest picture is less dramatic and more encouraging: the testers who do best are the ones who kept their testing judgement and added code to it.' },

      { type: 'h2', text: 'What manual testing gives you that developers lack' },
      { type: 'p', text: 'Knowing how to write a test case, how to find the boundary that breaks something, how to reproduce a bug precisely, and how to judge severity against priority — none of that is obsolete. Automation executes checks; it does not decide what is worth checking. That decision is the part of the job with judgement in it, and it is yours already.' },

      { type: 'h2', text: 'The order to learn things in' },
      { type: 'ol', items: [
        'Enough programming to be dangerous — one language, usually Java or Python, up to functions, collections and classes',
        'API testing, because it is closer to your current work than UI automation and pays off immediately',
        'SQL, so you can verify what actually landed in the database instead of trusting the screen',
        'A UI automation tool such as Selenium, starting with locators and waits',
        'A test framework and a build tool, so your tests are a suite rather than a pile of scripts',
        'CI, so the suite runs without you',
      ] },
      { type: 'note', text: 'Most people skip straight to Selenium and struggle, because the hard part of UI automation is programming, not the tool. API testing first is a gentler on-ramp and more of what teams need day to day.' },

      { type: 'h2', text: 'The flaky test problem' },
      { type: 'p', text: 'The difference between someone who has written automation and someone who has maintained it is flakiness. A suite that fails at random gets ignored, and an ignored suite is worse than none at all. Most of it comes from timing — waiting a fixed number of seconds rather than waiting for a condition — and from tests that depend on data left behind by other tests.' },
      { type: 'p', text: 'Being able to talk about that in an interview, with an example of one you fixed, signals experience more than any tool list.' },

      { type: 'h2', text: 'What not to automate' },
      { type: 'ul', items: [
        'Screens that are still changing every week — you will maintain more than you gain',
        'Tests that run once',
        'Anything requiring a human judgement about how something looks or feels',
        'Complicated end-to-end journeys, when the same risk can be covered at the API level',
      ] },

      { type: 'h2', text: 'Proving it without a job that lets you' },
      { type: 'p', text: 'This is the common blocker: your current role is manual, so where does the experience come from? Build a small framework against a public demo site or an open API, put it on GitHub with a README, and run it in CI so there is a green badge and a history. That artefact is what lets you apply for automation roles honestly.' },
      { type: 'p', text: 'Our Software Testing track follows this exact sequence — manual foundations, test design, defect management, API and database testing, Selenium, frameworks, CI/CD and capstone projects.' },
    ],
  },

  {
    slug: 'choosing-your-first-programming-language',
    title: 'Which Programming Language Should You Learn First?',
    excerpt:
      'Java, JavaScript, Python or Go — an honest comparison for the Indian job market, and why the choice matters less than you think.',
    date: '2026-09-18',
    author: 'Knovate Team',
    readMins: 7,
    tag: 'Learning',
    courses: ['java-development', 'frontend', 'golang'],
    body: [
      { type: 'p', text: 'This question stops more beginners than any other, and it deserves an unsatisfying answer first: the language matters far less than finishing something in it. Loops, functions, data structures and debugging transfer almost entirely. Your second language will take a fraction of the time your first one does.' },
      { type: 'p', text: 'That said, the first choice does affect how quickly you can get hired, so here is the honest comparison.' },

      { type: 'h2', text: 'Java — the safest choice for campus and service hiring' },
      { type: 'p', text: 'Java has the deepest pool of fresher openings in India, particularly at the large service companies, and it is the language most campus assessments assume. It is strict, which is mildly painful early and genuinely useful later: the compiler catches mistakes that a looser language would let you ship.' },
      { type: 'p', text: 'Learning it also teaches object-oriented design properly, which shows up in interviews well beyond Java itself. Spring Boot then opens backend roles. Choose it if you want the widest set of doors and do not mind more ceremony.' },

      { type: 'h2', text: 'JavaScript — the fastest route to something visible' },
      { type: 'p', text: 'JavaScript runs in every browser, so your first day ends with something you can show someone. That feedback loop matters more for motivation than people admit. It also takes you both front end and back end with one language, via React and Node.' },
      { type: 'p', text: 'The trade-off is that it forgives mistakes until runtime, and the ecosystem moves fast enough to be disorienting. Choose it if you want to build interfaces, or if you need momentum more than rigour.' },

      { type: 'h2', text: 'Python — gentlest syntax, strongest in data and AI' },
      { type: 'p', text: 'Python reads almost like English and is the default language of data, machine learning and anything AI-adjacent. If your goal is data analysis, automation or GenAI work, start here.' },
      { type: 'p', text: 'Its weakness for a fresher is that pure Python web roles are thinner on the ground than Java or JavaScript ones, so it is often the better second language than first — unless data is the goal itself.' },

      { type: 'h2', text: 'Go — small, modern, and not a first language' },
      { type: 'p', text: 'Go is a genuinely good language: tiny, fast, with concurrency built in, and it pays well. But fresher openings are comparatively rare, because teams using Go often want engineers who already know what a race condition is. It is an excellent second language and a risky first one.' },

      { type: 'h2', text: 'A simple way to decide' },
      { type: 'ul', items: [
        'Want the most fresher openings, especially at service companies → Java',
        'Want to build things people can see, quickly → JavaScript',
        'Want data, analytics or AI work → Python',
        'Already know a language and want backend depth → Go',
      ] },

      { type: 'h2', text: 'Then commit for six months' },
      { type: 'p', text: 'The worst outcome is not picking the wrong language — it is switching every few weeks and staying a beginner in four of them. Pick one, get through the fundamentals, build two projects you can show, and only then consider a second. The second will be easy, because by then you will have learned the thing that actually transfers: how to think like a programmer.' },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

/** Newest first, so the blog index and "more posts" never depend on array order. */
export const postsByDate = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const allTags = () => Array.from(new Set(posts.map((p) => p.tag))).sort();

/** Up to `limit` other posts, preferring the same tag. */
export const relatedPosts = (slug: string, limit = 3) => {
  const current = postBySlug(slug);
  if (!current) return [];
  return postsByDate()
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.tag === current.tag) - Number(a.tag === current.tag))
    .slice(0, limit);
};
