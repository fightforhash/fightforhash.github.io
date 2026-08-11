import { SKILLS } from '../constants';

/**
 * Skills modelled as switch interfaces. Shared by the Skills section and
 * the `show interfaces status` console command so both render the exact
 * same data — the console is a second view, never a separate source.
 */
export interface Iface {
  port: string;
  label: string;
  /** Still studying — rendered as `notconnect` in amber. */
  learning: boolean;
  vlan: number;
  type: string;
}

const GROUPS: Array<{ key: keyof typeof SKILLS; vlan: number; type: string }> = [
  { key: 'networking', vlan: 10, type: 'networking' },
  { key: 'systems', vlan: 20, type: 'systems' },
  { key: 'monitoring', vlan: 30, type: 'monitoring' },
  { key: 'scripting', vlan: 40, type: 'automation' },
];

const isLearning = (skill: string) => /in progress/i.test(skill);

export const INTERFACES: Iface[] = GROUPS.flatMap((group, g) =>
  SKILLS[group.key].map((skill, i) => ({
    port: `Gi${g}/${i + 1}`,
    label: skill.replace(/\s*—?\s*in progress/i, ''),
    learning: isLearning(skill),
    vlan: group.vlan,
    type: group.type,
  }))
);

export const CONNECTED_COUNT = INTERFACES.filter(i => !i.learning).length;
