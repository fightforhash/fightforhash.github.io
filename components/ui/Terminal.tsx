import React from 'react';
import { Reveal } from './Reveal';

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

/* ------------------------------------------------------------------
   TerminalSection — replaces the hand-repeated section skeleton.
   Section numbering is derived from the index, so inserting a new
   section no longer means renumbering the others by hand.
   ------------------------------------------------------------------ */

interface TerminalSectionProps {
  id: string;
  command: string;
  /** Optional plain-language heading under the command. */
  title?: React.ReactNode;
  /** Short right-aligned status label, e.g. "4 interfaces". */
  meta?: React.ReactNode;
  index?: number;
  children: React.ReactNode;
  className?: string;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({
  id,
  command,
  title,
  meta,
  index,
  children,
  className = '',
}) => (
  <section id={id} className={`py-10 md:py-14 border-t border-neon-line ${className}`}>
    <div className="container mx-auto px-6">
      <Reveal width="100%" delay={0}>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <PromptLine command={command} />
          {(meta || index !== undefined) && (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim shrink-0">
              {meta ?? `sec ${String(index).padStart(2, '0')}`}
            </span>
          )}
        </div>
        <div className="rule mt-3" />
        {title && (
          <h2 className="mt-5 text-lg md:text-xl font-semibold text-neon-bright glow tracking-tight">
            {title}
          </h2>
        )}
      </Reveal>

      <div className="mt-6">{children}</div>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   TerminalWindow — card chrome. Deliberately NOT Win95 buttons;
   an emissive edge plus a tracked-out label reads as TRON UI.
   ------------------------------------------------------------------ */

interface TerminalWindowProps {
  title: React.ReactNode;
  /** cyan = active/shipped, amber = in progress. */
  status?: 'active' | 'progress' | 'none';
  statusLabel?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  status = 'none',
  statusLabel,
  children,
  className = '',
  bodyClassName = '',
}) => {
  const dot =
    status === 'progress' ? 'bg-amber' : status === 'active' ? 'bg-neon' : 'bg-neon-dim';

  return (
    <div className={`edge bg-grid-panel/60 h-full flex flex-col ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neon-line">
        {status !== 'none' && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim truncate">
          {title}
        </span>
        {statusLabel && (
          <span
            className={`ml-auto font-mono text-[10px] uppercase tracking-[0.18em] shrink-0 ${
              status === 'progress' ? 'text-amber' : 'text-neon'
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>
      <div className={`p-4 flex-1 flex flex-col ${bodyClassName}`}>{children}</div>
    </div>
  );
};

/* ------------------------------------------------------------------
   StatusTable — column-aligned output. This is the single biggest
   signal change from the old layout: dense, tabular, aligned.
   ------------------------------------------------------------------ */

export interface StatusColumn {
  key: string;
  label: string;
  /** Tailwind width class, e.g. 'w-40'. */
  width?: string;
  align?: 'left' | 'right';
  /** Hide on narrow viewports. */
  hideBelow?: 'sm' | 'md' | 'lg';
}

interface StatusTableProps {
  columns: StatusColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  rowKey?: (row: Record<string, React.ReactNode>, i: number) => string;
  /** Console output is left-aligned and does not stretch to 1440px. */
  maxWidth?: string;
  className?: string;
}

const hideClass = (b?: 'sm' | 'md' | 'lg') =>
  b === 'sm' ? 'hidden sm:table-cell' : b === 'md' ? 'hidden md:table-cell' : b === 'lg' ? 'hidden lg:table-cell' : '';

export const StatusTable: React.FC<StatusTableProps> = ({
  columns,
  rows,
  rowKey,
  maxWidth = 'max-w-4xl',
  className = '',
}) => (
  <div className={`overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 ${maxWidth} ${className}`}>
    <table className="w-full min-w-[520px] md:min-w-0 border-collapse font-mono text-xs tabular-nums">
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              className={`text-[10px] uppercase tracking-[0.25em] text-neon-dim font-normal pb-2 pr-6 whitespace-nowrap border-b border-neon-line ${
                col.align === 'right' ? 'text-right pr-0' : 'text-left'
              } ${col.width ?? ''} ${hideClass(col.hideBelow)}`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={rowKey ? rowKey(row, i) : i}
            className="border-b border-neon-line/50 last:border-0 hover:bg-neon/[0.03] transition-colors"
          >
            {columns.map(col => (
              <td
                key={col.key}
                className={`py-2 pr-6 align-top ${col.align === 'right' ? 'text-right pr-0' : ''} ${hideClass(
                  col.hideBelow
                )}`}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ------------------------------------------------------------------
   Small shared bits
   ------------------------------------------------------------------ */

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
export const StatusPill: React.FC<{ state: 'connected' | 'notconnect' }> = ({ state }) => (
  <span
    className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
      state === 'connected' ? 'text-neon' : 'text-amber'
    }`}
  >
    <span
      className={`w-1 h-1 rounded-full ${state === 'connected' ? 'bg-neon' : 'bg-amber'}`}
    />
    {state}
  </span>
);
