import React from 'react';
import { INTERFACES, CONNECTED_COUNT } from '../lib/interfaces';
import { TerminalSection, StatusTable, StatusPill, StatusColumn } from './ui/Terminal';

const COLUMNS: StatusColumn[] = [
  { key: 'port', label: 'Port', width: 'w-20' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status', width: 'w-36' },
  { key: 'vlan', label: 'Vlan', width: 'w-16', hideBelow: 'sm' },
  { key: 'type', label: 'Type', width: 'w-32', hideBelow: 'md' },
];

const rows = INTERFACES.map(iface => ({
  port: <span className="text-neon-dim">{iface.port}</span>,
  name: <span className={iface.learning ? 'text-amber' : 'text-neon-bright'}>{iface.label}</span>,
  status: <StatusPill state={iface.learning ? 'notconnect' : 'connected'} />,
  vlan: <span className="text-neon-dim">{iface.vlan}</span>,
  type: <span className="text-neon-dim uppercase text-[10px] tracking-[0.18em]">{iface.type}</span>,
}));

export const Skills = () => (
  <TerminalSection
    id="skills"
    command="show interfaces status"
    meta={`${CONNECTED_COUNT}/${INTERFACES.length} connected`}
    className="bg-grid-panel/40"
  >
    <StatusTable columns={COLUMNS} rows={rows} rowKey={(_, i) => INTERFACES[i].port} />

    <p className="mt-5 font-mono text-[11px] text-neon-dim">
      <span className="text-amber">notconnect</span> = in study, not yet certified.
    </p>
  </TerminalSection>
);
