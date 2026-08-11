import React from 'react';
import { PUBLICATIONS } from '../constants';
import { TerminalSection, StatusTable, StatusColumn, Label } from './ui/Terminal';
import { Reveal } from './ui/Reveal';
import { TOPOLOGY, CDP_NEIGHBORS } from '../lib/topology';
import { ArrowUpRight } from 'lucide-react';

const COLUMNS: StatusColumn[] = [
  { key: 'device', label: 'Device ID', width: 'w-24' },
  { key: 'local', label: 'Local Intrfce', width: 'w-32' },
  { key: 'holdtime', label: 'Holdtme', width: 'w-24', hideBelow: 'sm' },
  { key: 'capability', label: 'Capability', width: 'w-28' },
  { key: 'platform', label: 'Platform', width: 'w-32', hideBelow: 'md' },
  { key: 'port', label: 'Port ID', width: 'w-28' },
];

const rows = CDP_NEIGHBORS.map(n => ({
  device: <span className="text-neon-bright">{n.device}</span>,
  local: <span className="text-neon-body">{n.local}</span>,
  holdtime: <span className="text-neon-dim">{n.holdtime}</span>,
  capability: <span className="text-neon-dim">{n.capability}</span>,
  platform: <span className="text-neon-dim">{n.platform}</span>,
  port: <span className="text-neon-body">{n.port}</span>,
}));

export const Topology = () => (
  <>
    <TerminalSection
      id="topology"
      command="show cdp neighbors"
      meta={`${CDP_NEIGHBORS.length} entries`}
    >
      <p className="font-mono text-xs text-neon-body leading-relaxed max-w-3xl mb-5">
        The lab topology I study on — inter-VLAN routing on a layer 3 core, 802.1Q trunks down to
        the access edge, data and voice VLANs separated. Everything I am working through for the
        CCNA hangs off this diagram.
      </p>

      <Reveal width="100%">
        <div className="edge bg-grid-panel/50 overflow-x-auto">
          <pre
            className="font-mono text-[9px] sm:text-[10px] md:text-[11px] leading-[1.35] text-neon glow-sm p-4 md:p-5 w-max"
            aria-label="Lab network topology diagram"
          >
            {TOPOLOGY}
          </pre>
        </div>
      </Reveal>

      <div className="mt-6">
        <Label>cdp neighbor table</Label>
        <div className="rule-flat mt-2 mb-3" />
        <StatusTable columns={COLUMNS} rows={rows} rowKey={(_, i) => CDP_NEIGHBORS[i].device} />
      </div>

      <p className="mt-5 font-mono text-[11px] text-neon-dim">
        <span className="text-amber">R</span> router ·{' '}
        <span className="text-amber">S</span> switch ·{' '}
        <span className="text-amber">I</span> IGMP ·{' '}
        <span className="text-amber">H</span> host
      </p>
    </TerminalSection>

    <Publications />
  </>
);

/* ------------------------------------------------------------------
   show tech-support — surfacing the conference poster that was sitting
   in constants.tsx unrendered.
   ------------------------------------------------------------------ */

const STACK = ['AWS EC2', 'AWS S3', 'Nginx reverse proxy', 'Docker', 'RAG'];

const Publications = () => {
  if (PUBLICATIONS.length === 0) return null;

  return (
    <TerminalSection
      id="publications"
      command="show tech-support"
      meta={`${PUBLICATIONS.length} record`}
      className="bg-grid-panel/40"
    >
      <div className="space-y-5">
        {PUBLICATIONS.map(pub => (
          <Reveal key={pub.id} width="100%">
            <div className="grid md:grid-cols-12 gap-5 items-start">
              {pub.image && (
                <div className="md:col-span-3">
                  <div className="edge overflow-hidden bg-grid-panel aspect-[4/3]">
                    <img
                      src={pub.image}
                      alt={pub.title}
                      loading="lazy"
                      className="object-cover w-full h-full opacity-90"
                    />
                  </div>
                </div>
              )}

              <div className="md:col-span-9">
                <Label>{pub.conference}</Label>
                <h3 className="mt-2 font-mono text-sm text-neon-bright leading-snug max-w-3xl">
                  {pub.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-neon-body leading-relaxed max-w-3xl">
                  {pub.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                  {STACK.map(tag => (
                    <span key={tag} className="font-mono text-[11px] text-neon-dim">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neon-dim hover:text-neon transition-colors"
                >
                  <ArrowUpRight size={12} /> read the poster
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </TerminalSection>
  );
};
