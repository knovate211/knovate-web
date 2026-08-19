import Link from 'next/link';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-5 py-28 text-center">
      <div className="font-serif text-6xl font-bold text-gold-dark">404</div>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Button href="/" className="mt-8">Back to home</Button>
    </div>
  );
}
