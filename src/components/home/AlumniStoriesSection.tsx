import Section, { Eyebrow, Heading } from '@/components/Section';
import AlumniCarousel from '@/components/home/AlumniCarousel';
import { testimonials } from '@/data/testimonials';

// "Alumni success hub": the auto-scrolling testimonial carousel. Used on the
// home page and on every program page.
export default function AlumniStoriesSection() {
  return (
    <Section className="bg-[#fbf3e8]">
      <div className="mb-12 text-center">
        <Eyebrow>Loved by learners</Eyebrow>
        <Heading>
          <span className="text-gold-dark">Alumni success</span> hub
        </Heading>
      </div>
      <AlumniCarousel items={testimonials} />
    </Section>
  );
}
