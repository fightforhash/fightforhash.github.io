import topology from '/content/automation/topology.txt?raw';

/**
 * The lab topology diagram, shared by the `show cdp neighbors` section and
 * the console command of the same name — one source, two views.
 */
export const TOPOLOGY: string = topology.replace(/\n+$/, '');

export interface CdpNeighbor {
  device: string;
  local: string;
  holdtime: string;
  /** IOS capability codes: R router, S switch, I IGMP, H host. */
  capability: string;
  platform: string;
  port: string;
}

export const CDP_NEIGHBORS: CdpNeighbor[] = [
  { device: 'R1',    local: 'Gig 0/1', holdtime: '142', capability: 'R S I', platform: 'ISR4331',    port: 'Gig 0/1' },
  { device: 'SW2',   local: 'Gig 0/2', holdtime: '167', capability: 'S I',   platform: 'C9200-24P',  port: 'Gig 0/1' },
  { device: 'SW3',   local: 'Gig 0/3', holdtime: '154', capability: 'S I',   platform: 'C9200-24P',  port: 'Gig 0/1' },
  { device: 'PHONE', local: 'Gig 0/3', holdtime: '129', capability: 'H P',   platform: 'CP-8841',    port: 'SW PORT' },
];
