import React from 'react';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import { RackUnit, Led, Tape } from './parts';

/** Featured projects get a 2U chassis with a screen; the rest are 1U boxes. */
export const projectUnits = (p: Project) => (p.featured ? 2 : 1);

const Appliance: React.FC<{ project: Project; start: number; index: number }> = ({ project, start, index }) => {
  const live = !!project.projectUrl;
  const black = index % 2 === 1;

  return (
    <RackUnit
      start={start}
      units={projectUnits(project)}
      variant={black ? 'black' : 'aluminum'}
      as="div"
      bodyClassName="px-5 md:px-8 py-4"
    >
      <article
        className="grid gap-4 md:gap-6 items-center md:grid-cols-[180px_minmax(0,1fr)_190px]"
      >
        {/* Front of the box: a status screen; the 1U boxes keep two drive bays under it. */}
        {project.featured ? (
          <div className="hidden md:block bg-[#1b1d20] p-[6px] rounded-[2px]">
            <div className="aspect-[16/10] overflow-hidden bg-black">
              <img src={project.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-[140px]">
            <div className="bg-[#1b1d20] p-[5px] rounded-[2px]">
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <img src={project.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1.5" aria-hidden="true">
              <span className="bay h-[9px] rounded-[1px]" />
              <span className="bay h-[9px] rounded-[1px]" />
            </div>
          </div>
        )}

        <div className="min-w-0">
          <h3
            className={`silk leading-none ${project.featured ? 'text-[26px]' : 'text-[21px]'} ${
              black ? 'text-[#eef0f2]' : 'text-[var(--ink)]'
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`mt-2 max-w-[70ch] text-[14.5px] leading-[1.55] ${
              black ? 'text-[var(--ink-light)]' : 'text-[var(--ink)]'
            }`}
          >
            {project.description}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.map((t, i) => (
              <li key={t}>
                <Tape tilt={(i % 3) - 1} className="text-[12px]">
                  {t}
                </Tape>
              </li>
            ))}
          </ul>
        </div>

        {/* Fixed-width column so every box lines up, one button or two. */}
        <div className="flex md:flex-col items-center md:items-end gap-3">
          <span className={`silk flex items-center gap-2 text-[14px] ${black ? '' : 'text-[var(--ink)]'}`}>
            <Led color="green" blink={live ? 'slow' : undefined} />
            {live ? 'live' : 'repo'}
          </span>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-panel ${black ? 'btn-panel--dark' : ''}`}
              >
                Code
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-panel ${black ? 'btn-panel--dark' : ''}`}
              >
                Open site
              </a>
            )}
          </div>
        </div>
      </article>
    </RackUnit>
  );
};

/** All project boxes, mounted from `start` downward. */
export const Appliances: React.FC<{ start: number }> = ({ start }) => {
  let u = start;
  return (
    <div id="projects" className="scroll-mt-[92px]">
      <h2 className="sr-only">Projects</h2>
      {PROJECTS.map((p, i) => {
        const at = u;
        u += projectUnits(p);
        return <Appliance key={p.id} project={p} start={at} index={i} />;
      })}
    </div>
  );
};

export const projectsHeight = PROJECTS.reduce((n, p) => n + projectUnits(p), 0);
