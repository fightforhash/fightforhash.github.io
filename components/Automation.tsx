import React, { useState } from 'react';
import { PUBLICATIONS } from '../constants';
import { TerminalSection, TerminalWindow, Label } from './ui/Terminal';
import { LazyMarkdown } from './ui/LazyMarkdown';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight } from 'lucide-react';

/** Snippets live as real files so they stay lintable and copy-pasteable. */
const files = import.meta.glob('/content/automation/*', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface Snippet {
  file: string;
  lang: string;
  label: string;
  blurb: string;
}

const SNIPPETS: Snippet[] = [
  {
    file: '/content/automation/backup_configs.py',
    lang: 'python',
    label: 'backup_configs.py',
    blurb:
      'Parallel running-config pull over SSH with netmiko. Exits non-zero on any failure so CI can gate on it.',
  },
  {
    file: '/content/automation/interfaces.yml',
    lang: 'yaml',
    label: 'interfaces.yml',
    blurb:
      'Declarative access-port baseline — data/voice VLANs, port-security, BPDU guard. Idempotent, saves only on change.',
  },
  {
    file: '/content/automation/network-ci.yml',
    lang: 'yaml',
    label: 'network-ci.yml',
    blurb:
      'Config changes reviewed like code: yamllint + ansible-lint, then a --check --diff dry run against the lab.',
  },
];

export const Automation = () => {
  const [active, setActive] = useState(0);
  const snippet = SNIPPETS[active];
  const source = files[snippet.file] ?? '';

  return (
    <>
      <TerminalSection
        id="automation"
        command="show automation"
        meta={`${SNIPPETS.length} files`}
      >
        <p className="font-mono text-xs text-neon-body leading-relaxed max-w-3xl mb-5">
          Network work that is worth doing twice is worth writing down. These are the patterns I
          build on — device access from Python, declarative interface state in Ansible, and a
          pipeline that lints and dry-runs before anything reaches real gear.
        </p>

        {/* File tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SNIPPETS.map((s, i) => (
            <button
              key={s.file}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`px-3 py-1.5 font-mono text-[11px] transition-colors border ${
                i === active
                  ? 'edge edge-hot text-neon bg-neon/10'
                  : 'border-neon-line text-neon-dim hover:text-neon'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <Reveal width="100%">
          <TerminalWindow title={snippet.label} status="active" statusLabel={snippet.lang}>
            <p className="font-mono text-[11px] text-neon-dim leading-relaxed mb-3">
              {snippet.blurb}
            </p>
            <LazyMarkdown className="prose-wide">
              {'```' + snippet.lang + '\n' + source.trimEnd() + '\n```'}
            </LazyMarkdown>
          </TerminalWindow>
        </Reveal>
      </TerminalSection>

      <Publications />
    </>
  );
};

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
