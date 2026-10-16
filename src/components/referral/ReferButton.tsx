'use client';
import { useEffect, useState } from 'react';
import { getReferralConfig, type ReferralConfig } from '@/lib/api';
import ReferDialog from './ReferDialog';

/**
 * The "Refer & earn" button.
 *
 * It renders nothing until the programme is confirmed open, so a paused
 * programme never shows an entry point that would only disappoint. The config
 * is fetched once per mount rather than baked in at build, because the amounts
 * are changed by staff in the admin panel.
 */
export default function ReferButton({
  className = '',
  label = 'Refer & earn',
  defaultTo = '',
}: {
  className?: string;
  label?: string;
  /** Pre-selects what is being shared, e.g. "/courses/java-development". */
  defaultTo?: string;
}) {
  const [config, setConfig] = useState<ReferralConfig | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getReferralConfig().then((c) => setConfig(c.active ? c : null)).catch(() => setConfig(null));
  }, []);

  if (!config) return null;

  return (
    <>
      <button onClick={() => setOpen(true)} className={className || 'text-sm font-semibold text-gold-dark hover:text-gold'}>
        {label}
      </button>
      {open && <ReferDialog config={config} onClose={() => setOpen(false)} defaultTo={defaultTo} />}
    </>
  );
}
