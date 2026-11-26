import FAQ from '@/components/FAQ';
import { Heading } from '@/components/Section';
import { faqLd } from '@/lib/seo';
import { maxScholarship } from '@/data/pricing';

export const homeFaqs = [
  {
    q: 'Why should I choose Knovate?',
    a: 'You learn from mentors who work in the industry, build real projects in every program, get your doubts cleared in live sessions, and get placement support when you are ready to apply. It is practical skills, not just theory, with support at every step.',
  },
  {
    q: 'Is there placement support?',
    a: 'Yes. Alongside your program you get resume reviews, mock interviews, technical practice and introductions to our hiring partners.',
  },
  {
    q: 'Will I receive a certificate?',
    a: 'Yes. Pass the Knovate certification exam and your certificate is issued instantly. Every certificate has a credential ID and a public page on knovate.com, so employers can check it is genuine.',
  },
  {
    q: 'Are the programs beginner-friendly?',
    a: 'Yes. Many tracks start from the basics, and every program page shows its level so you can pick the right starting point. If you are unsure, talk to an advisor and we will help you choose.',
  },
  {
    q: 'Are scholarships available?',
    a: `Yes. Take the Knovate scholarship test and you can get up to ${maxScholarship}% off your program fee, depending on your score.`,
  },
];

// Renders any list of questions (defaults to the home-page set) with matching
// FAQPage structured data. Program pages pass their own questions.
export default function HomeFAQ({ items = homeFaqs }: { items?: { q: string; a: string }[] }) {
  return (
    <section className="bg-[#fbf3e8] py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(items)) }} />
      <div className="mx-auto max-w-content px-5">
        <Heading className="mb-10 text-center">
          Frequently asked <span className="text-gold-dark">questions</span>
        </Heading>
        <FAQ items={items} />
      </div>
    </section>
  );
}
