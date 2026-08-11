import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './GridOverlay';

interface BootSequenceProps {
  lines: string[];
  onDone?: () => void;
  /** ms between lines */
  interval?: number;
  className?: string;
}

/**
 * Boot output appears line by line, the way real gear posts. When motion
 * is reduced the whole banner renders at once — no waiting, no animation.
 */
export const BootSequence: React.FC<BootSequenceProps> = ({
  lines,
  onDone,
  interval = 120,
  className = '',
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setShown(lines.length);
      onDone?.();
      return;
    }

    setShown(0);
    const timers = lines.map((_, i) =>
      window.setTimeout(() => {
        setShown(i + 1);
        if (i === lines.length - 1) onDone?.();
      }, interval * (i + 1))
    );

    return () => timers.forEach(t => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, interval, lines.length]);

  return (
    <div className={`font-mono text-[11px] leading-relaxed ${className}`} aria-hidden="true">
      {lines.slice(0, shown).map((line, i) => (
        <p key={i} className={i === lines.length - 1 ? 'text-neon' : 'text-neon-dim'}>
          {line}
        </p>
      ))}
    </div>
  );
};
