import React from 'react';
import { PROJECTS } from '../constants';
import { Reveal } from './ui/Reveal';
import { Github, ArrowUpRight, Clock } from 'lucide-react';
import { Project } from '../types';

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-void border-t border-white/5">
      <div className="container mx-auto px-6">

        <Reveal>
          <span className="font-mono text-neon text-sm tracking-widest uppercase mb-4 block">03 / Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-14">
            Selected <span className="text-slate-500">Work.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <PlaceholderCard />
        </div>

      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <Reveal width="100%">
    <div className="group bg-zinc-900/30 border border-white/5 hover:border-neon/30 p-6 transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-base font-bold text-white group-hover:text-neon transition-colors leading-snug">{project.title}</h4>
        {project.status && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neon border border-neon/20 px-2 py-0.5 shrink-0 ml-3">
            <span className="w-1 h-1 rounded-full bg-neon animate-pulse" />
            {project.status}
          </span>
        )}
      </div>

      <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-grow">{project.description}</p>

      <ul className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-[11px] font-mono text-slate-600">
        {project.techStack.map(tech => (
          <li key={tech} className="hover:text-neon transition-colors">{tech}</li>
        ))}
      </ul>

      <div className="flex gap-5 items-center mt-auto border-t border-white/5 pt-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-neon transition-colors font-mono text-xs uppercase tracking-wider">
            <Github size={13} /> Source
          </a>
        )}
        {project.projectUrl && (
          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-neon transition-colors font-mono text-xs uppercase tracking-wider">
            <ArrowUpRight size={13} /> Visit
          </a>
        )}
      </div>
    </div>
  </Reveal>
);

const PlaceholderCard = () => (
  <Reveal width="100%">
    <div className="border border-dashed border-white/10 p-6 h-full flex flex-col items-center justify-center text-center min-h-[200px] hover:border-neon/20 transition-all duration-300">
      <Clock size={18} className="text-slate-700 mb-3" />
      <h4 className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Automation Projects</h4>
      <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">Python / Bash scripts from IT ops — inventory workflows, AD provisioning, log parsing. Will update as projects get added.</p>
    </div>
  </Reveal>
);
