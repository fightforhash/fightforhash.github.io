import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION_HISTORY, PUBLICATIONS } from '../constants';
import { INTERFACES, CONNECTED_COUNT } from './interfaces';
import { POSTS } from './posts';

/* ------------------------------------------------------------------
   Output model
   ------------------------------------------------------------------ */

export type Tone = 'dim' | 'body' | 'bright' | 'neon' | 'amber' | 'error';

export interface Line {
  text: string;
  tone?: Tone;
}

export interface CommandResult {
  /** Rendered immediately. */
  lines?: Line[];
  /** Appended one at a time (instantly when motion is reduced). */
  stream?: Line[];
  streamDelay?: number;
  clear?: boolean;
  /** Hash to navigate to after the output settles. */
  navigate?: string;
  /** Briefly energise the background shader, in ms. */
  pulseMs?: number;
}

export interface Command {
  name: string;
  aliases?: string[];
  usage?: string;
  help: string;
  hidden?: boolean;
  run: (arg: string) => CommandResult;
}

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

const pad = (s: string, n: number) => (s.length >= n ? s : s + ' '.repeat(n - s.length));
const dim = (text: string): Line => ({ text, tone: 'dim' });
const body = (text: string): Line => ({ text, tone: 'body' });
const bright = (text: string): Line => ({ text, tone: 'bright' });
const blank = (): Line => ({ text: '' });

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/** Parse "Jul 2024 – Nov 2025" / "2025 – Present" into a month count. */
function periodMonths(period: string): number {
  const parts = period.split(/[–—-]/).map(s => s.trim());
  if (parts.length < 2) return 0;

  const toDate = (s: string): Date | null => {
    if (/present/i.test(s)) return new Date();
    const m = /^([A-Za-z]{3})[a-z]*\s+(\d{4})$/.exec(s);
    if (m) return new Date(Number(m[2]), MONTHS[m[1].toLowerCase()] ?? 0);
    const y = /^(\d{4})$/.exec(s);
    if (y) return new Date(Number(y[1]), 0);
    return null;
  };

  const start = toDate(parts[0]);
  const end = toDate(parts[1]);
  if (!start || !end) return 0;
  return Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
}

function humanMonths(total: number): string {
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} year${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} month${m > 1 ? 's' : ''}`);
  return parts.join(', ') || '0 months';
}

const TOTAL_MONTHS = EXPERIENCES.reduce((n, e) => n + periodMonths(e.period), 0);

/** Wrap long prose so console output stays readable on narrow screens. */
function wrap(text: string, width: number, indent = ''): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = '';
  for (const w of words) {
    if (line && (line + ' ' + w).length > width) {
      out.push(indent + line);
      line = w;
    } else {
      line = line ? line + ' ' + w : w;
    }
  }
  if (line) out.push(indent + line);
  return out;
}

/* ------------------------------------------------------------------
   Commands
   ------------------------------------------------------------------ */

export const COMMANDS: Command[] = [
  {
    name: 'help',
    aliases: ['?'],
    help: 'list available commands',
    run: () => ({
      lines: [
        dim('Available commands:'),
        blank(),
        ...COMMANDS.filter(c => !c.hidden).map(c => ({
          text: `  ${pad(c.usage ?? c.name, 26)}${c.help}`,
          tone: 'body' as Tone,
        })),
        blank(),
        dim('Tab completes. Up/Down walks history.'),
      ],
    }),
  },

  {
    name: 'show version',
    help: 'system banner — role, location, uptime, build',
    run: () => ({
      lines: [
        bright(`${PERSONAL_INFO.name} — network portfolio`),
        blank(),
        body(`${pad('role', 12)}${PERSONAL_INFO.title}`),
        body(`${pad('location', 12)}${PERSONAL_INFO.location}`),
        body(`${pad('uptime', 12)}${humanMonths(TOTAL_MONTHS)} of production IT support`),
        body(`${pad('track', 12)}NetDevOps / network engineering`),
        body(`${pad('education', 12)}${EDUCATION_HISTORY[0]?.degree ?? '-'}`),
        { text: `${pad('cert', 12)}CCNA — in progress`, tone: 'amber' },
        dim(`${pad('build', 12)}${__COMMIT_SHA__} (${__BUILD_TIME__})`),
        blank(),
        dim("Type 'help' for commands."),
      ],
    }),
  },

  {
    name: 'show interfaces status',
    aliases: ['show interfaces', 'show int status', 'show int'],
    help: 'skills, as interface status',
    run: () => ({
      lines: [
        dim(`${pad('Port', 8)}${pad('Name', 26)}${pad('Status', 14)}${pad('Vlan', 6)}Type`),
        ...INTERFACES.map(i => ({
          text: `${pad(i.port, 8)}${pad(i.label, 26)}${pad(
            i.learning ? 'notconnect' : 'connected',
            14
          )}${pad(String(i.vlan), 6)}${i.type}`,
          tone: (i.learning ? 'amber' : 'body') as Tone,
        })),
        blank(),
        dim(`${CONNECTED_COUNT}/${INTERFACES.length} connected · notconnect = in study`),
      ],
    }),
  },

  {
    name: 'show inventory',
    help: 'projects',
    run: () => ({
      lines: PROJECTS.flatMap(p => [
        { text: `NAME: "${p.title}"`, tone: 'bright' as Tone },
        ...wrap(p.description, 68, '  ').map(t => body(t)),
        dim(`  PID: ${p.techStack.join(', ')}`),
        dim(`  SN: FFH-${p.id.padStart(3, '0')}${p.status ? `   STATUS: ${p.status}` : ''}`),
        blank(),
      ]),
      navigate: '#projects',
    }),
  },

  {
    name: 'show logging',
    help: 'work history, as log entries',
    run: () => ({
      lines: EXPERIENCES.flatMap(e => [
        { text: `${pad(e.period, 22)}%SYS-5-CONFIG_I: ${e.role}`, tone: 'bright' as Tone },
        dim(`${' '.repeat(22)}${e.company}`),
        ...e.description.flatMap((d, i) =>
          wrap(`${String(i + 1).padStart(3, '0')}  ${d}`, 66, '  ').map(t => body(t))
        ),
        blank(),
      ]),
      navigate: '#logs',
    }),
  },

  {
    name: 'show automation',
    help: 'network automation snippets',
    run: () => ({
      lines: [
        body('Loading automation samples — netmiko, Ansible, GitHub Actions.'),
      ],
      navigate: '#automation',
    }),
  },

  {
    name: 'show tech-support',
    help: 'conference poster and infrastructure write-up',
    run: () => ({
      lines: PUBLICATIONS.flatMap(p => [
        bright(p.title),
        dim(`  ${p.conference}`),
        ...wrap(p.description, 68, '  ').map(t => body(t)),
        { text: `  ${p.link}`, tone: 'neon' as Tone },
        blank(),
      ]),
      navigate: '#automation',
    }),
  },

  {
    name: 'dir flash:/posts/',
    aliases: ['show blog', 'dir', 'ls'],
    usage: 'dir flash:/posts/',
    help: 'list blog posts',
    run: () => {
      if (POSTS.length === 0) {
        return { lines: [dim('Directory of flash:/posts/'), blank(), dim('  no posts indexed')] };
      }
      return {
        lines: [
          dim('Directory of flash:/posts/'),
          blank(),
          ...POSTS.map((p, i) => ({
            text: `  ${pad(String(i + 1), 4)}-rw-  ${pad(p.date, 12)}${pad(p.slug + '.md', 28)}${p.title}`,
            tone: 'body' as Tone,
          })),
          blank(),
          dim(`  ${POSTS.length} file(s) · read one with: cat <slug>`),
        ],
      };
    },
  },

  {
    name: 'cat',
    usage: 'cat <slug>',
    help: 'open a blog post',
    run: (arg: string) => {
      const slug = arg.trim().replace(/\.md$/, '');
      if (!slug) {
        return { lines: [{ text: '% Incomplete command. Usage: cat <slug>', tone: 'error' }] };
      }
      const post = POSTS.find(p => p.slug === slug);
      if (!post) {
        return {
          lines: [
            { text: `% flash:/posts/${slug}.md: No such file or directory`, tone: 'error' },
            dim("  Try 'dir flash:/posts/' for the list."),
          ],
        };
      }
      return { lines: [body(`Opening ${post.slug}.md ...`)], navigate: `#/blog/${post.slug}` };
    },
  },

  {
    name: 'ping',
    usage: 'ping <host>',
    help: 'send 4 echo requests',
    run: (arg: string) => {
      const host = arg.trim() || '8.8.8.8';
      const times = Array.from({ length: 4 }, () => 8 + Math.random() * 22);
      return {
        lines: [body(`PING ${host}: 56 data bytes`)],
        stream: [
          ...times.map((t, i) => ({
            text: `64 bytes from ${host}: icmp_seq=${i} ttl=118 time=${t.toFixed(1)} ms`,
            tone: 'body' as Tone,
          })),
          blank(),
          dim(`--- ${host} ping statistics ---`),
          {
            text: `4 packets transmitted, 4 received, 0.0% packet loss`,
            tone: 'neon' as Tone,
          },
          dim(
            `round-trip min/avg/max = ${Math.min(...times).toFixed(1)}/${(
              times.reduce((a, b) => a + b, 0) / times.length
            ).toFixed(1)}/${Math.max(...times).toFixed(1)} ms`
          ),
        ],
        streamDelay: 320,
        pulseMs: 2200,
      };
    },
  },

  {
    name: 'traceroute',
    usage: 'traceroute career',
    aliases: ['tracert'],
    help: 'trace the path to network engineering',
    run: () => ({
      lines: [
        body('traceroute to network-engineering, 30 hops max'),
        blank(),
        body(` 1  ulchi-law.it-intern       Jul 2020 – Aug 2020   python/mysql automation`),
        body(` 2  uw-madison.cs             Jan 2021 – May 2024   networking, os, databases`),
        body(` 3  hmart.it-support          Jul 2024 – Nov 2025   20+ tickets/wk, AD, POS`),
        { text: ` 4  ccna.study                2025 – present        !H  in progress`, tone: 'amber' },
        dim(` 5  netdevops.target          * * *`),
        blank(),
        dim('  !H = administratively in progress'),
      ],
      navigate: '#logs',
    }),
  },

  {
    name: 'whoami',
    help: 'current user',
    run: () => ({
      lines: [
        bright('thomas'),
        dim(`${PERSONAL_INFO.title} · ${PERSONAL_INFO.location}`),
      ],
    }),
  },

  {
    name: 'contact',
    help: 'jump to the contact form',
    run: () => ({
      lines: [body(`Opening session to ${PERSONAL_INFO.email} ...`)],
      navigate: '#contact',
    }),
  },

  {
    name: 'clear',
    aliases: ['cls'],
    help: 'clear the screen',
    run: () => ({ clear: true }),
  },
];

/* ------------------------------------------------------------------
   Resolution
   ------------------------------------------------------------------ */

const NAMES: Array<{ key: string; command: Command }> = COMMANDS.flatMap(c =>
  [c.name, ...(c.aliases ?? [])].map(key => ({ key, command: c }))
).sort((a, b) => b.key.length - a.key.length);

export const COMPLETIONS: string[] = COMMANDS.filter(c => !c.hidden)
  .map(c => c.name)
  .sort();

export function runCommand(input: string): CommandResult {
  const normalized = input.trim().replace(/\s+/g, ' ');
  if (!normalized) return {};

  const lower = normalized.toLowerCase();

  for (const { key, command } of NAMES) {
    if (lower === key || lower.startsWith(key + ' ')) {
      return command.run(normalized.slice(key.length).trim());
    }
  }

  // IOS points at the first token it could not resolve.
  const firstBad = normalized.split(' ')[0];
  const caretAt = normalized.indexOf(firstBad);

  return {
    lines: [
      { text: `${' '.repeat(caretAt)}^`, tone: 'error' },
      { text: `% Invalid input detected at '^' marker.`, tone: 'error' },
      dim("  Type 'help' for a list of commands."),
    ],
  };
}

/** Longest common prefix completion, IOS-style. */
export function complete(input: string): { value: string; suggestions: string[] } {
  const prefix = input.trim().toLowerCase();
  if (!prefix) return { value: input, suggestions: COMPLETIONS };

  const matches = COMPLETIONS.filter(c => c.startsWith(prefix));
  if (matches.length === 0) return { value: input, suggestions: [] };
  if (matches.length === 1) return { value: matches[0] + ' ', suggestions: [] };

  let common = matches[0];
  for (const m of matches.slice(1)) {
    let i = 0;
    while (i < common.length && i < m.length && common[i] === m[i]) i++;
    common = common.slice(0, i);
  }
  return { value: common, suggestions: matches };
}
