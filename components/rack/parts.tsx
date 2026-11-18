import React from 'react';

/* ------------------------------------------------------------------
   Shared rack hardware: a mounted unit, LEDs, label-maker tape.
   ------------------------------------------------------------------ */

interface RackUnitProps {
  /** Section anchor — matches the ids the console `navigate`s to. */
  id?: string;
  /** First rack position (U number) this device occupies. */
  start: number;
  /** Height in rack units. */
  units: number;
  variant?: 'aluminum' | 'black';
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  as?: 'section' | 'div' | 'header' | 'footer' | 'nav';
  ariaLabel?: string;
}

const uLabel = (start: number, units: number) =>
  units === 1 ? `U${start}` : `U${start}–${start + units - 1}`;

const Ear: React.FC<{ label: string; single?: boolean }> = ({ label, single }) => (
  <div className="ear" aria-hidden="true">
    {single ? (
      <span className="screw top-1/2 -mt-[6.5px]" />
    ) : (
      <>
        <span className="screw screw--top" />
        <span className="ear__u">{label}</span>
        <span className="screw screw--bottom" />
      </>
    )}
  </div>
);

export const RackUnit: React.FC<RackUnitProps> = ({
  id,
  start,
  units,
  variant = 'aluminum',
  className = '',
  bodyClassName = '',
  children,
  as: Tag = 'section',
  ariaLabel,
}) => {
  const label = uLabel(start, units);
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`unit ${className}`}
      style={{ ['--units' as string]: units } as React.CSSProperties}
    >
      <Ear label={label} single={units === 1} />
      <div className={`plate ${variant === 'black' ? 'plate--black' : ''} min-w-0 ${bodyClassName}`}>
        {children}
      </div>
      <Ear label={label} single={units === 1} />
    </Tag>
  );
};

export type LedColor = 'green' | 'amber' | 'off';

export const Led: React.FC<{ color?: LedColor; blink?: 'slow' | 'fast'; title?: string }> = ({
  color = 'green',
  blink,
  title,
}) => (
  <span
    title={title}
    aria-hidden={title ? undefined : true}
    className={`led ${color !== 'off' ? `led--${color}` : ''} ${
      blink === 'slow' ? 'led--blink' : blink === 'fast' ? 'led--blink-fast' : ''
    }`}
  />
);

/** A strip of label-maker tape. Slight tilt: nobody sticks these on straight. */
export const Tape: React.FC<{ children: React.ReactNode; tilt?: number; className?: string }> = ({
  children,
  tilt = 0,
  className = '',
}) => (
  <span className={`tape ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
    {children}
  </span>
);

/** LED with its silkscreened name underneath, like a front-panel status block. */
export const StatusLed: React.FC<{ name: string; color?: LedColor; blink?: 'slow' | 'fast' }> = ({
  name,
  color = 'green',
  blink,
}) => (
  <span className="inline-flex flex-col items-center gap-1">
    <Led color={color} blink={blink} />
    <span className="silk text-[11px] leading-none opacity-80">{name}</span>
  </span>
);
