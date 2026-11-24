export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  course: string;
  /** Optional headshot under /public, e.g. '/images/alumni/aarav.jpg'. Falls back to an initial. */
  photo?: string;
}

export const testimonials: Testimonial[] = [
  { name: 'Aarav Sharma', role: 'Software Engineer @ Fintech', course: 'Full Stack Development',
    quote: 'The mentorship made all the difference. I went from writing my first component to shipping a production app — and landed a job within two months of finishing.' },
  { name: 'Priya Nair', role: 'Frontend Developer', course: 'Front-End Technologies',
    quote: 'Every module ended with a real project. My portfolio did the talking in interviews. Genuinely the most practical program I have taken.' },
  { name: 'Rohan Mehta', role: 'Backend Engineer', course: 'Golang',
    quote: 'Concurrency finally clicked. The way goroutines and channels were taught with hands-on labs was brilliant.' },
  { name: 'Sara Khan', role: 'AI Engineer', course: 'GenAI & Forward Deployed Engineering',
    quote: 'I built and deployed a RAG app as my capstone. That project got me my current role at an AI startup.' },
];

export const partners = ['NovaTech', 'ByteWorks', 'DataForge', 'CloudNine', 'PixelLabs', 'Quantum'];

/** Short one-line alumni quotes shown under the hiring-partner logos on the home page. */
export interface AlumniVoice {
  name: string;
  quote: string;
  photo: string;
}

export const alumniVoices: AlumniVoice[] = [
  { name: 'Sunil', quote: 'This program transformed my career!', photo: '/images/alumni/sunil.png' },
  { name: 'Kavya Maguluri', quote: 'The mentors were exceptional.', photo: '/images/alumni/kavya.png' },
  { name: 'Venkata Ramprasad', quote: 'I landed my dream job thanks to this!', photo: '/images/alumni/venkata.png' },
  { name: 'Hari Kiran', quote: 'Best learning experience ever.', photo: '/images/alumni/hari.png' },
];
