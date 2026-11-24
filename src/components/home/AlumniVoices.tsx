import { alumniVoices } from '@/data/testimonials';
import { Heading } from '@/components/Section';

// Four short alumni quotes with headshots, followed by a motivational quote.
export default function AlumniVoices() {
  return (
    <section className="bg-gradient-to-b from-[#fbf3e8] to-white pb-16 pt-4 md:pb-24">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <Heading className="mb-12 text-center">
          <span aria-hidden className="mr-2">❤️</span>What our <span className="text-gold-dark">students say</span>
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {alumniVoices.map((v) => (
            <figure
              key={v.name}
              className="flex flex-col items-center rounded-2xl border border-[#f3dfbf] bg-white px-6 py-12 text-center shadow-[0_8px_30px_rgba(60,40,10,0.06)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.photo}
                alt={v.name}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-[#f3dfbf] ring-offset-2"
              />
              <blockquote className="mt-8 font-serif text-xl italic leading-snug text-ink">
                &ldquo;{v.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-lg font-semibold text-gold-dark">&ndash; {v.name}</figcaption>
            </figure>
          ))}
        </div>

        <figure className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[#f3dfbf] bg-white px-8 py-10 text-center shadow-[0_8px_30px_rgba(60,40,10,0.06)] md:mt-24">
          <blockquote className="font-serif text-xl italic leading-relaxed text-ink/80 md:text-2xl">
            &ldquo;You don&rsquo;t have to be great to start, but you have to start to be great.&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-lg font-semibold text-gold-dark">&ndash; Zig Ziglar</figcaption>
        </figure>
      </div>
    </section>
  );
}
