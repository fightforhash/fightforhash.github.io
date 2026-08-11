import React from 'react';
import { PROJECTS } from '../constants';
import { Reveal } from './ui/Reveal';
import { TerminalSection, Label } from './ui/Terminal';
import { Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

/** Serial numbers are derived, not decorative: FFH-<id>-<tech count>. */
const serial = (p: Project) =>
  `FFH-${p.id.padStart(3, '0')}-${String(p.techStack.length).padStart(2, '0')}`;

export const Projects = () => (
  <TerminalSection id="projects" command="show inventory" meta={`${PROJECTS.length} entries`}>
    <div className="border-t border-neon-line">
      {PROJECTS.map((project, i) => (
        <InventoryRow key={project.id} project={project} index={i} />
      ))}
    </div>

    <p className="mt-6 font-mono text-[11px] text-neon-dim leading-relaxed max-w-2xl">
      Python / Bash tooling from day-to-day IT ops — inventory workflows, AD provisioning, log
      parsing — is described under{' '}
      <a href="#logs" className="text-neon hover:text-neon-bright underline underline-offset-2">
        show logging
      </a>
      .
    </p>
  </TerminalSection>
);

const InventoryRow = ({ project, index }: { project: Project; index: number }) => (
  <Reveal width="100%" delay={Math.min(index * 0.04, 0.2)}>
    <div className="group border-b border-neon-line py-4 hover:bg-neon/[0.03] transition-colors">
      {/* Line 1 — NAME / DESCR */}
      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
        <div className="flex items-baseline gap-2 shrink-0 md:w-56">
          <Label>name:</Label>
          <span className="font-mono text-sm text-neon-bright group-hover:text-neon transition-colors">
            "{project.title}"
          </span>
        </div>
        <p className="font-mono text-xs text-neon-body leading-relaxed flex-1 max-w-3xl">
          <span className="text-neon-dim uppercase tracking-[0.25em] text-[10px] mr-2">descr:</span>
          {project.description}
        </p>
      </div>

      {/* Line 2 — PID / SN / links */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2.5">
        <div className="flex items-baseline gap-2 shrink-0 md:w-56">
          <Label>sn:</Label>
          <span className="font-mono text-[11px] text-neon-dim tabular-nums">{serial(project)}</span>
          {project.status && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon">
              {project.status}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Label>pid:</Label>
          {project.techStack.map(tech => (
            <span key={tech} className="font-mono text-[11px] text-neon-dim">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 items-center shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neon-dim hover:text-neon transition-colors font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              <Github size={12} /> source
            </a>
          )}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neon-dim hover:text-neon transition-colors font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              <ArrowUpRight size={12} /> visit
            </a>
          )}
        </div>
      </div>
    </div>
  </Reveal>
);
