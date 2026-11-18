import React from 'react';
import { PatchPanel } from './PatchPanel';
import { Nameplate } from './Nameplate';
import { KvmDrawer } from './KvmDrawer';
import { SwitchPanel } from './SwitchPanel';
import { ConsoleServer } from './ConsoleServer';
import { Appliances, projectsHeight } from './Appliances';
import { LogScreen } from './LogScreen';
import { PosterBoard } from './PosterBoard';
import { TapeLibrary } from './TapeLibrary';
import { Pdu } from './Pdu';
import { RackUnit } from './parts';

/* Heights in U. Positions are derived, so the ear labels always match. */
const LAYOUT = [
  ['patch', 1],
  ['nameplate', 3],
  ['kvm', 3],
  ['switch', 3],
  ['console', 4],
  ['projects', projectsHeight],
  ['logs', 5],
  ['poster', 4],
  ['tapes', 3],
  ['pdu', 4],
] as const;

const positions: Record<string, number> = {};
LAYOUT.reduce((u, [key, h]) => {
  positions[key] = u;
  return u + h;
}, 1);

export const RACK_HEIGHT = LAYOUT.reduce((n, [, h]) => n + h, 0);

/** A blank filler panel: real racks have them between gear. */
const Blank: React.FC<{ at: number }> = ({ at }) => (
  <RackUnit start={at} units={1} as="div" variant="black" bodyClassName="flex items-center px-6">
    <span className="vents h-[10px] w-full max-w-[420px] opacity-60" aria-hidden="true" />
  </RackUnit>
);

export const RackShell: React.FC<{ onHome: boolean; children: React.ReactNode; footer: React.ReactNode }> = ({
  onHome,
  children,
  footer,
}) => (
  <div className="px-2 md:px-6 py-4 md:py-8">
    <div className="rack">
      <PatchPanel start={1} onHome={onHome} />
      {children}
    </div>
    {footer}
  </div>
);

export const RackHome: React.FC<{ footer: React.ReactNode }> = ({ footer }) => (
  <RackShell onHome footer={footer}>
    <Nameplate start={positions.nameplate} />
    <KvmDrawer start={positions.kvm} />
    <SwitchPanel start={positions.switch} />
    <ConsoleServer start={positions.console} />
    <Appliances start={positions.projects} />
    <LogScreen start={positions.logs} />
    <PosterBoard start={positions.poster} />
    <TapeLibrary start={positions.tapes} />
    <Pdu start={positions.pdu} />
    <Blank at={RACK_HEIGHT + 1} />
  </RackShell>
);
