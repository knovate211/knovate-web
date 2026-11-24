'use client';

import { useState } from 'react';
import { Heading } from '@/components/Section';

const reasons = [
  { t: 'Live Interactive Sessions', img: 'live-sessions.png',
    d: 'Learn concepts, practice questions and get your doubts cleared instantly in the live classes.' },
  { t: 'Career-Defining Projects', img: 'projects.png',
    d: 'Build real, portfolio-ready projects that show recruiters what you can actually do.' },
  { t: 'Learning Activities', img: 'learning-activities.png',
    d: 'Quizzes, assignments and hands-on exercises after every module to lock in what you learn.' },
  { t: 'Doubt Buster Sessions', img: 'doubt-sessions.png',
    d: 'Stuck on something? Dedicated doubt sessions with mentors get you moving again, fast.' },
  { t: 'Community Access', img: 'community.png',
    d: 'Join a community of learners and alumni to share ideas, collaborate and grow together.' },
  { t: 'AI-Enhanced LMS', img: 'ai-lms.png',
    d: 'A smart learning platform with AI help to explain concepts and keep track of your progress.' },
  { t: 'Industry-Recognized Certification', img: 'certification.png',
    d: 'Earn a certificate you can share on LinkedIn, and that anyone can verify online.' },
  { t: 'Dedicated Career Support', img: 'career-support.png',
    d: 'Resume reviews, mock interviews and introductions to our hiring partners.' },
];

function FlipCard({ t, img, d }: (typeof reasons)[number]) {
  const [flipped, setFlipped] = useState(false);
  const face = 'absolute inset-0 flex flex-col items-center justify-center rounded-2xl [backface-visibility:hidden]';

  return (
    <button
      type="button"
      // Mouse users flip by hovering (CSS below); clicks only toggle on touch
      // screens, so a click on desktop doesn't leave the card stuck flipped.
      onClick={() => {
        if (!window.matchMedia('(hover: hover)').matches) setFlipped((f) => !f);
      }}
      aria-pressed={flipped}
      aria-label={`${t}: ${d}`}
      className="group aspect-[4/5] w-full rounded-2xl text-center [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:aspect-square"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className={`${face} bg-gradient-to-br from-white to-[#fbeedd] p-3 shadow-[0_8px_30px_rgba(60,40,10,0.06)] transition-shadow md:p-6`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/why/${img}`} alt="" loading="lazy" className="aspect-[340/212] w-full rounded-xl object-cover" />
          <h3 className="mt-4 text-[14px] font-semibold leading-snug text-ink md:mt-6 md:text-[17px]">{t}</h3>
        </div>

        {/* Back */}
        <div className={`${face} bg-[#a8661b] p-4 text-white shadow-[0_8px_30px_rgba(60,40,10,0.12)] [transform:rotateY(180deg)] md:p-8`}>
          <h3 className="text-[14px] font-semibold md:text-[17px]">{t}</h3>
          <p className="mt-3 text-[12px] leading-relaxed text-white/95 md:text-[15px]">{d}</p>
        </div>
      </div>
    </button>
  );
}

// Eight reasons to pick Knovate. Each card flips to show a short description:
// on hover with a mouse, on tap on touch screens, and on keyboard focus. Images live in /public/images/why.
export default function WhyChooseUs() {
  return (
    <section className="bg-[#fbf3e8] py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <Heading className="mb-3 text-center">
          Why <span className="text-gold-dark">choose us?</span>
        </Heading>
        <p className="mb-10 text-center text-sm text-muted">Hover over or tap a card to learn more.</p>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {reasons.map((r) => <FlipCard key={r.t} {...r} />)}
        </div>
      </div>
    </section>
  );
}
