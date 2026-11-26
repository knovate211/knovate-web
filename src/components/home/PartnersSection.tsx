import { Eyebrow, Heading } from '@/components/Section';
import PartnerMarquee from '@/components/home/PartnerMarquee';

// "Secure placements at top brands": the two-row hiring-partner logo marquee.
export default function PartnersSection() {
  return (
    <section className="bg-[#fbf3e8] pb-16 md:pb-24">
      <div className="mx-auto mb-12 max-w-content px-5 text-center">
        <Eyebrow>Our hiring partners</Eyebrow>
        <Heading>
          Secure placements at <span className="text-gold-dark">top brands</span>
        </Heading>
      </div>
      <PartnerMarquee />
    </section>
  );
}
