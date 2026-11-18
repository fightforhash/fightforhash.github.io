import React from 'react';
import { INTERFACES, Iface } from '../../lib/interfaces';
import { RackUnit, Led, Tape, StatusLed } from './parts';

const GROUP_ORDER = ['networking', 'systems', 'monitoring', 'automation'];

const groups = GROUP_ORDER.map(type => ({
  type,
  vlan: INTERFACES.find(i => i.type === type)?.vlan ?? 0,
  ports: INTERFACES.filter(i => i.type === type),
})).filter(g => g.ports.length > 0);

/** A few ports show traffic; a whole wall of blinking reads as noise. */
const ACTIVE = new Set(['Gi0/1', 'Gi0/6', 'Gi3/1', 'Gi3/4']);

const Port: React.FC<{ iface: Iface; n: number }> = ({ iface, n }) => (
  <li className="flex flex-col items-center gap-1" title={`${iface.port} ${iface.label}`}>
    <Led
      color={iface.learning ? 'amber' : 'green'}
      blink={ACTIVE.has(iface.port) ? (n % 2 ? 'fast' : 'slow') : undefined}
    />
    <span className="jack jack--small" />
    <span className="silk text-[10px] leading-none opacity-70">{n}</span>
  </li>
);

export const SwitchPanel: React.FC<{ start: number }> = ({ start }) => (
  <RackUnit id="skills" start={start} units={3} variant="black" bodyClassName="px-5 md:px-8 py-5">
    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
      <div>
        <span className="silk text-[14px] opacity-70">48-port access switch</span>
        <h2 className="silk text-[28px] leading-none text-[#eef0f2] mt-1">Skills</h2>
      </div>
      <div className="flex gap-5">
        <StatusLed name="sys" />
        <StatusLed name="poe" />
        <StatusLed name="up" />
      </div>
    </div>

    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {groups.map(g => (
        <div key={g.type} className="min-w-0">
          <Tape tilt={-0.6}>
            vlan {g.vlan} {g.type}
          </Tape>
          <ol className="mt-3 flex flex-wrap gap-2.5">
            {g.ports.map((p, i) => (
              <Port key={p.port} iface={p} n={i + 1} />
            ))}
          </ol>
          {/* The port map someone wrote on the panel. */}
          <ol className="mt-3 space-y-0.5 text-[13.5px] leading-snug text-[var(--ink-light)]">
            {g.ports.map((p, i) => (
              <li key={p.port} className="flex gap-2">
                <span className="silk opacity-60 w-4 text-right shrink-0">{i + 1}</span>
                <span>{p.label}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </RackUnit>
);
