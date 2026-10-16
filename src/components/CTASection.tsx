import Button from './Button';

export default function CTASection() {
  return (
    <section className="bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-content px-5 text-center">
        <h2 className="font-serif text-3xl font-semibold text-cream md:text-4xl">
          Ready to start your journey?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/70">
          Join thousands of learners building real skills with mentors who care. Talk to us and we&apos;ll help you pick the right track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/enroll" variant="primary">Enroll now</Button>
          <Button href="/courses" variant="outline" className="!border-cream/30 !bg-transparent !text-cream hover:!bg-cream/10">
            Browse courses
          </Button>
        </div>
      </div>
    </section>
  );
}
