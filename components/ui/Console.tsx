import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Line, Tone, runCommand, complete } from '../../lib/commands';
import { HOSTNAME } from './Terminal';
import { usePrefersReducedMotion } from './GridOverlay';

const TONE: Record<Tone, string> = {
  dim: 'text-neon-dim',
  body: 'text-neon-body',
  bright: 'text-neon-bright',
  neon: 'text-neon',
  amber: 'text-amber',
  error: 'text-amber',
};

interface Entry {
  id: number;
  /** Echoed command line, or null for plain output. */
  command?: string;
  lines: Line[];
}

interface ConsoleProps {
  /** Lines printed before the first prompt (the boot banner). */
  banner?: Line[];
  /** Called when a command wants the background shader to surge. */
  onPulse?: (ms: number) => void;
  className?: string;
}

export const Console: React.FC<ConsoleProps> = ({ banner = [], onPulse, className = '' }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [busy, setBusy] = useState(false);

  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => () => timers.current.forEach(t => window.clearTimeout(t)), []);

  // Keep the newest output in view without yanking the whole page around.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const push = useCallback((entry: Omit<Entry, 'id'>) => {
    setEntries(prev => [...prev, { ...entry, id: nextId.current++ }]);
  }, []);

  const submit = useCallback(
    (raw: string) => {
      const input = raw.trim();
      setValue('');
      setHistoryIndex(-1);

      if (!input) {
        push({ command: '', lines: [] });
        return;
      }

      setHistory(prev => (prev[prev.length - 1] === input ? prev : [...prev, input]));

      const result = runCommand(input);

      if (result.clear) {
        setEntries([]);
        return;
      }

      const immediate = result.lines ?? [];
      push({ command: input, lines: immediate });

      if (result.pulseMs && onPulse) onPulse(result.pulseMs);

      const streamed = result.stream ?? [];
      if (streamed.length) {
        if (reducedMotion) {
          setEntries(prev => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last) copy[copy.length - 1] = { ...last, lines: [...last.lines, ...streamed] };
            return copy;
          });
        } else {
          setBusy(true);
          const delay = result.streamDelay ?? 250;
          streamed.forEach((line, i) => {
            const t = window.setTimeout(() => {
              setEntries(prev => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last) copy[copy.length - 1] = { ...last, lines: [...last.lines, line] };
                return copy;
              });
              if (i === streamed.length - 1) setBusy(false);
            }, delay * (i + 1));
            timers.current.push(t);
          });
        }
      }

      if (result.navigate) {
        const t = window.setTimeout(
          () => {
            window.location.hash = result.navigate!;
          },
          streamed.length && !reducedMotion ? (result.streamDelay ?? 250) * streamed.length + 400 : 350
        );
        timers.current.push(t);
      }
    },
    [push, onPulse, reducedMotion]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(value);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const { value: completed, suggestions } = complete(value);
      setValue(completed);
      if (suggestions.length > 1) {
        push({ lines: suggestions.map(s => ({ text: `  ${s}`, tone: 'dim' as Tone })) });
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setValue(history[idx]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(-1);
        setValue('');
      } else {
        setHistoryIndex(idx);
        setValue(history[idx]);
      }
    }
  };

  return (
    <div
      className={`edge bg-void/70 backdrop-blur-sm flex flex-col ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neon-line shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim">
          console — {HOSTNAME}
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-neon">
          {busy ? 'busy' : 'ready'}
        </span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-3 font-mono text-[11px] md:text-xs leading-relaxed min-h-0"
        aria-live="polite"
        aria-atomic="false"
      >
        {banner.map((line, i) => (
          <OutputLine key={`banner-${i}`} line={line} />
        ))}

        {entries.map(entry => (
          <div key={entry.id}>
            {entry.command !== undefined && (
              <p className="whitespace-pre-wrap break-words">
                <span className="text-neon-dim">{HOSTNAME}:~</span>
                <span className="text-amber">$</span>{' '}
                <span className="text-neon-bright">{entry.command}</span>
              </p>
            )}
            {entry.lines.map((line, i) => (
              <OutputLine key={i} line={line} />
            ))}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-neon-line shrink-0">
        <span className="font-mono text-[11px] md:text-xs shrink-0">
          <span className="text-neon-dim">{HOSTNAME}:~</span>
          <span className="text-amber">$</span>
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Console input — try: help"
          placeholder="help"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none font-mono text-[11px] md:text-xs text-neon-bright placeholder:text-neon-dim"
        />
      </div>
    </div>
  );
};

const OutputLine: React.FC<{ line: Line }> = ({ line }) => {
  if (!line.text) return <p className="h-3" aria-hidden="true" />;
  return (
    <p className={`whitespace-pre-wrap break-words ${TONE[line.tone ?? 'body']}`}>{line.text}</p>
  );
};
