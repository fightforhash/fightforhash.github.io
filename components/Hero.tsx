import React, { useMemo, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { INTERFACES, CONNECTED_COUNT } from '../lib/interfaces';
import { runCommand } from '../lib/commands';
import { Console } from './ui/Console';
import { BootSequence } from './ui/BootSequence';
import { ShaderField } from './ui/ShaderField';
import { Label } from './ui/Terminal';
import { Terminal as TerminalIcon } from 'lucide-react';

const BOOT_LINES = [
  'System Bootstrap, Version 2026.08',
  `Detecting interfaces ........... ${INTERFACES.length} found`,
  `Line protocol .................. ${CONNECTED_COUNT} up, ${INTERFACES.length - CONNECTED_COUNT} in study`,
  'Loading profile ................ OK',
  '%SYS-5-RESTART: System restarted — console ready',
];

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [booted, setBooted] = useState(false);
  const [pulseUntil, setPulseUntil] = useState<number | undefined>(undefined);
  const [mobileConsole, setMobileConsole] = useState(false);

  /** The console opens on the same banner the `show version` command prints. */
  const banner = useMemo(() => runCommand('show version').lines ?? [], []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[88vh] flex items-center overflow-hidden pt-24 pb-10"
    >
      <ShaderField containerRef={sectionRef} pulseUntil={pulseUntil} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Identity readout — data, not a billboard */}
          <div className="lg:col-span-4">
            <Label>system</Label>
            <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-neon-bright glow">
              {PERSONAL_INFO.name}
            </h1>

            <div className="rule mt-4 mb-4" />

            <dl className="font-mono text-[11px] md:text-xs space-y-1.5">
              <Row term="role" value="IT Support Specialist" />
              <Row term="location" value={PERSONAL_INFO.location} />
              <Row term="track" value="NetDevOps / network engineering" />
              <Row term="cert" value="CCNA — in progress" tone="amber" />
              <Row term="interfaces" value={`${CONNECTED_COUNT}/${INTERFACES.length} connected`} />
              <Row term="status" value="available for work" tone="neon" />
            </dl>

            <p className="mt-5 font-mono text-[11px] text-neon-body leading-relaxed max-w-sm">
              Keeping infrastructure online, resolving incidents fast, and automating the
              repetitive.
            </p>

            <BootSequence lines={BOOT_LINES} onDone={() => setBooted(true)} className="mt-5" />
          </div>

          {/* The console */}
          <div className="lg:col-span-8">
            {/* Desktop / tablet: always live */}
            <Console
              banner={booted ? banner : []}
              onPulse={ms => setPulseUntil(Date.now() + ms)}
              className="hidden md:flex h-[440px]"
            />

            {/* Mobile: opt-in, so the virtual keyboard does not hijack the page */}
            <div className="md:hidden">
              {mobileConsole ? (
                <Console
                  banner={banner}
                  onPulse={ms => setPulseUntil(Date.now() + ms)}
                  className="flex h-[380px]"
                />
              ) : (
                <div className="edge bg-void/70 p-4">
                  {/* The readout above already carries `show version`, so the
                      collapsed state advertises the console instead of repeating it. */}
                  <p className="font-mono text-[11px] text-neon-dim leading-relaxed">
                    Interactive console. Try{' '}
                    <span className="text-neon">show interfaces status</span>,{' '}
                    <span className="text-neon">show inventory</span>,{' '}
                    <span className="text-neon">ping 8.8.8.8</span>, or{' '}
                    <span className="text-neon">traceroute career</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMobileConsole(true)}
                    className="edge edge-hot mt-4 w-full py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-neon flex items-center justify-center gap-2"
                  >
                    <TerminalIcon size={13} /> open console
                  </button>
                </div>
              )}
            </div>

            <p className="mt-3 font-mono text-[10px] text-neon-dim tracking-[0.15em] hidden md:block">
              try: <span className="text-neon">help</span> ·{' '}
              <span className="text-neon">show interfaces status</span> ·{' '}
              <span className="text-neon">ping 8.8.8.8</span> ·{' '}
              <span className="text-neon">traceroute career</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Row = ({
  term,
  value,
  tone = 'body',
}: {
  term: string;
  value: string;
  tone?: 'body' | 'neon' | 'amber';
}) => (
  <div className="flex gap-3">
    <dt className="text-neon-dim w-24 shrink-0">{term}</dt>
    <dd className={tone === 'neon' ? 'text-neon' : tone === 'amber' ? 'text-amber' : 'text-neon-body'}>
      {value}
    </dd>
  </div>
);
