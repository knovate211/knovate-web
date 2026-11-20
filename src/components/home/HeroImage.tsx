'use client';
import { useEffect, useRef, useState } from 'react';

// Drop the hero photo at public/images/hero-student.png (exported from Figma).
export default function HeroImage({ src = '/images/hero-student.png' }: { src?: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  // A server-rendered image can fail before React attaches onError, so check once on mount too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt="Student learning on a laptop"
      onError={() => setOk(false)}
      className="relative z-10 h-full w-full object-contain object-bottom"
    />
  );
}
