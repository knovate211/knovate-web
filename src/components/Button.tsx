import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const styles: Record<string, string> = {
  primary: 'bg-gold hover:bg-gold-dark text-white shadow-sm',
  outline: 'border border-ink/15 bg-white hover:bg-sand text-ink',
  ghost: 'text-ink hover:bg-sand',
};

export default function Button({ href, children, variant = 'primary', className = '', type = 'button', onClick, disabled }: Props) {
  const cls = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-semibold transition-colors ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}
