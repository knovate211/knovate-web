import { SVGProps } from 'react';

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, ...p,
});

export const UsersIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5" /><path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18.5 14.8c1.7.8 2.8 2.6 3 5.2" /></svg>
);
export const CapIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></svg>
);
export const BriefcaseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18M11 12h2v2h-2z" /></svg>
);
export const StarIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" /></svg>
);
export const LaptopIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></svg>
);
export const BlocksIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="8.5" y="3" width="7" height="7" rx="1" /><rect x="3" y="13" width="7" height="7" rx="1" /><rect x="14" y="13" width="7" height="7" rx="1" /></svg>
);
export const CertIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="4" y="3" width="16" height="13" rx="2" /><circle cx="12" cy="9" r="2.5" /><path d="M10 11.5 9 20l3-1.5 3 1.5-1-8.5" /></svg>
);
export const GrowthIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 20v-4M9 20v-7M14 20v-5M19 20V10" /><path d="M4 11l5-4 4 3 7-6M16 4h4v4" /></svg>
);
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" /></svg>
);
export const CodeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
);
export const DatabaseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></svg>
);
export const CloudIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M7 18h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.5 9 4.5 4.5 0 0 0 7 18z" /></svg>
);
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, strokeWidth: 2, ...p })}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** The Knovate mark: the graduation cap over the amber K (matches /brand/knovate-mark.svg). */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="8 -2 108 112" className={className} aria-hidden>
      <defs>
        <linearGradient id="kn-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e0a85a" /><stop offset="1" stopColor="#c98a3a" /></linearGradient>
        <linearGradient id="kn-b" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#b5701f" /><stop offset=".5" stopColor="#c98a3a" /><stop offset="1" stopColor="#e6b46c" /></linearGradient>
        <linearGradient id="kn-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a5a12" /><stop offset="1" stopColor="#b5701f" /></linearGradient>
      </defs>
      <polygon points="14,14 56,0 98,14 56,28" fill="#2b2620" />
      <polygon points="34,21 56,28 78,21 78,30 56,37 34,30" fill="#2b2620" />
      <line x1="20" y1="16" x2="20" y2="40" stroke="#2b2620" strokeWidth="2.5" />
      <rect x="17" y="38" width="6" height="10" rx="1.5" fill="#2b2620" />
      <polygon points="28,44 56,54 28,80" fill="url(#kn-a)" />
      <polygon points="28,104 28,92 88,42 112,42 40,108 32,108" fill="url(#kn-b)" />
      <polygon points="60,80 72,69 104,108 80,108" fill="url(#kn-c)" />
    </svg>
  );
}

export const BookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14" /></svg>
);
export const ResumeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6 3h9l4 4v14H6z" /><path d="M9 9h6M9 13h6M9 17h3" /><circle cx="17" cy="18" r="2.5" /></svg>
);
export const HandshakeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M2 11l4-4 3 1 3-2 3 1 3-1 4 4-3 3M5 10l5 5c.8.8 2 .8 2.8 0l3.7-3.7M9 8l-2 3 1.5 1.5L12 10" /><path d="M13 15l2 2M11 17l1.5 1.5" /></svg>
);
