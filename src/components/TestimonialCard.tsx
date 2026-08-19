import { Testimonial } from '@/data/testimonials';

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6">
      <blockquote className="flex-1 text-ink/90">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand font-serif font-bold text-gold-dark">
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{t.name}</div>
          <div className="text-xs text-muted">{t.role} · {t.course}</div>
        </div>
      </figcaption>
    </figure>
  );
}
