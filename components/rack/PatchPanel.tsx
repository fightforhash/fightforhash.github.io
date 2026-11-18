import React, { useEffect, useState } from 'react';
import { Led, Tape } from './parts';
import { usePrefersReducedMotion } from '../ui/GridOverlay';

/** Front-panel ports = site sections. Ids match the console's `navigate` targets. */
export const PORTS: Array<{ id: string; label: string }> = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'topology', label: 'lab' },
  { id: 'projects', label: 'projects' },
  { id: 'logs', label: 'logs' },
  { id: 'blog', label: 'writing' },
  { id: 'contact', label: 'contact' },
];

/** A 12-port panel; the last five are unpatched, as on any real rack. */
const TOTAL_PORTS = 12;

const goTo = (id: string, onHome: boolean, reduced: boolean) => {
  if (!onHome) {
    window.location.hash = `#${id}`;
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
};

/** Which section is on screen, for the port that stays patched. */
function useCurrentSection(enabled: boolean): string | null {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const els = PORTS.map(p => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return current;
}

export const PatchPanel: React.FC<{ start: number; onHome: boolean }> = ({ start, onHome }) => {
  const reduced = usePrefersReducedMotion();
  // Power-on self test: LEDs come up left to right, once.
  const [posted, setPosted] = useState(0);
  const [plugAnim, setPlugAnim] = useState<{ id: string; n: number } | null>(null);
  const current = useCurrentSection(onHome);

  useEffect(() => {
    if (reduced) {
      setPosted(TOTAL_PORTS + 1);
      return;
    }
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setPosted(i);
      if (i > TOTAL_PORTS) window.clearInterval(t);
    }, 70);
    return () => window.clearInterval(t);
  }, [reduced]);

  const booting = posted <= TOTAL_PORTS;

  return (
    <nav aria-label="Sections" className="sticky top-0 z-30">
      <div className="unit" style={{ ['--units' as string]: 1 } as React.CSSProperties}>
        <div className="ear" aria-hidden="true">
          <span className="screw screw--top" />
          <span className="ear__u">U{start}</span>
          <span className="screw screw--bottom" />
        </div>

        <div className="plate plate--black px-3 md:px-5 py-2 flex items-center gap-4 min-w-0">
          <div className="hidden lg:flex flex-col shrink-0 pr-2 border-r border-white/10">
            <span className="silk text-[15px] leading-none text-[#e6e9ec]">patch panel</span>
            <span className="silk text-[11px] leading-tight opacity-60">cat6, 12-port</span>
          </div>

          <ol className="flex flex-wrap gap-x-2 gap-y-2 md:gap-x-3 flex-1 min-w-0">
            {Array.from({ length: TOTAL_PORTS }, (_, i) => {
              const port = PORTS[i];
              const lit = booting ? i < posted : !!port;
              const ledColor = booting ? (lit ? 'amber' : 'off') : port ? 'green' : 'off';
              const patched = !!port && (current === port.id || plugAnim?.id === port.id);

              const jack = (
                <span className="relative block jack">
                  {patched && <span className="boot" />}
                  {patched && plugAnim?.id === port?.id && (
                    <svg
                      key={plugAnim.n}
                      className="absolute left-1/2 top-full -translate-x-1/2 overflow-visible pointer-events-none"
                      width="20"
                      height="36"
                      viewBox="0 0 20 36"
                      aria-hidden="true"
                    >
                      <path
                        className="cable-drop"
                        d="M10 0 C 10 14, 16 20, 12 36"
                        fill="none"
                        stroke="var(--cable)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              );

              return (
                <li key={i} className="flex flex-col items-center gap-1">
                  <span className="flex items-center gap-1">
                    <span className="silk text-[10px] leading-none opacity-60 w-3 text-right">{i + 1}</span>
                    <Led color={ledColor} />
                  </span>
                  {port ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPlugAnim({ id: port.id, n: Date.now() });
                        goTo(port.id, onHome, reduced);
                      }}
                      aria-current={current === port.id ? 'true' : undefined}
                      className="flex flex-col items-center gap-1 rounded-sm"
                    >
                      {jack}
                      <Tape tilt={i % 2 ? -1 : 0.8} className="text-[12px]">
                        {port.label}
                      </Tape>
                    </button>
                  ) : (
                    <span className="flex flex-col items-center gap-1 opacity-70" aria-hidden="true">
                      {jack}
                      <span className="h-[17px]" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="ear" aria-hidden="true">
          <span className="screw screw--top" />
          <span className="ear__u">U{start}</span>
          <span className="screw screw--bottom" />
        </div>
      </div>
    </nav>
  );
};
