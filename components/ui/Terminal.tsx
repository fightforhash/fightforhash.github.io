import React from 'react';

export const HOSTNAME = 'thomas@fightforhash';

/* ------------------------------------------------------------------
   PromptLine — the CLI prompt that heads every section.
   ------------------------------------------------------------------ */

interface PromptLineProps {
  command: string;
  /** Show a blinking caret after the command (Hero uses this). */
  caret?: boolean;
  className?: string;
}

export const PromptLine: React.FC<PromptLineProps> = ({ command, caret = false, className = '' }) => (
  <p className={`font-mono text-xs md:text-sm break-words ${className}`}>
    <span className="text-neon-dim">{HOSTNAME}</span>
    <span className="text-neon-dim">:~</span>
    <span className="text-amber">$</span>{' '}
    <span className={`text-neon glow-sm ${caret ? 'caret' : ''}`}>{command}</span>
  </p>
);

/** Uppercase, tracked-out micro label — the TRON data-readout voice. */
export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span className={`font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim ${className}`}>
    {children}
  </span>
);

/** Interface-status pill: connected (cyan) / notconnect (amber). */
