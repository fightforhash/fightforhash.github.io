import React, { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ffh:grid';

/* ------------------------------------------------------------------
   prefers-reduced-motion — shared by the shader and boot sequence.
   ------------------------------------------------------------------ */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return reduced;
}

/* ------------------------------------------------------------------
   GRID: ON/OFF — the low-stimulus escape hatch. Writes a data
   attribute on <html>; index.css strips every glow, the grid and
   the shader when it is "off".
   ------------------------------------------------------------------ */

export function useGridMode(): [boolean, () => void] {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'off') setOn(false);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.grid = on ? 'on' : 'off';
    window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
  }, [on]);

  const toggle = useCallback(() => setOn(v => !v), []);
  return [on, toggle];
}

/**
 * Read-only view of the grid mode for components that must react to it
 * (the shader) without owning the state. Watches the <html> attribute so
 * there is exactly one writer — the Navbar toggle.
 */
export function useGridEnabled(): boolean {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const read = () => setEnabled(document.documentElement.dataset.grid !== 'off');
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-grid'] });
    return () => observer.disconnect();
  }, []);

  return enabled;
}

export const GridToggle: React.FC<{ on: boolean; onToggle: () => void; className?: string }> = ({
  on,
  onToggle,
  className = '',
}) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={on}
    title="Toggle glow effects and background grid"
    className={`font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim hover:text-neon transition-colors ${className}`}
  >
    grid:
    <span className={on ? 'text-neon' : 'text-amber'}>{on ? 'on' : 'off'}</span>
  </button>
);

/* ------------------------------------------------------------------
   The page-wide background: flat grid everywhere, plus a perspective
   floor anchored to the bottom of the viewport. TRON's signature.
   ------------------------------------------------------------------ */

export const GridOverlay: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.14] bg-grid" />
    <div className="absolute inset-x-0 bottom-0 h-[38vh] overflow-hidden">
      <div className="grid-floor absolute inset-0 opacity-60" />
    </div>
  </div>
);
