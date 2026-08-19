export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  course: string;
}

export const testimonials: Testimonial[] = [
  { name: 'Aarav Sharma', role: 'Software Engineer @ Fintech', course: 'Full Stack Development',
    quote: 'The mentorship made all the difference. I went from writing my first component to shipping a production app — and landed a job within two months of finishing.' },
  { name: 'Priya Nair', role: 'Frontend Developer', course: 'Front-End Technologies',
    quote: 'Every module ended with a real project. My portfolio did the talking in interviews. Genuinely the most practical course I have taken.' },
  { name: 'Rohan Mehta', role: 'Backend Engineer', course: 'Golang',
    quote: 'Concurrency finally clicked. The way goroutines and channels were taught with hands-on labs was brilliant.' },
  { name: 'Sara Khan', role: 'AI Engineer', course: 'GenAI & Forward Deployed Engineering',
    quote: 'I built and deployed a RAG app as my capstone. That project got me my current role at an AI startup.' },
];

export const partners = ['NovaTech', 'ByteWorks', 'DataForge', 'CloudNine', 'PixelLabs', 'Quantum'];
