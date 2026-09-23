'use client';
import { useState } from 'react';

// Drop the hero photo at public/images/hero-student.png (exported from Figma).
export default function HeroImage({ src = '/images/hero-student.png' }: { src?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Student learning on a laptop"
      onError={() => setOk(false)}
      className="relative z-10 h-full w-full object-contain object-bottom"
    />
  );
}
