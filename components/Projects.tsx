import React from 'react';
import { PROJECTS } from '../constants';
import { Reveal } from './ui/Reveal';
import { Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

export const Projects = () => {
  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 bg-void border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <Reveal>
             <span className="font-mono text-neon text-sm tracking-widest uppercase mb-4 block">03 / The Works</span>
             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-20">
                Selected <span className="text-slate-500">Projects.</span>
             </h2>
        </Reveal>

        {/* Featured Projects - Large Industrial Cards */}
        <div className="space-y-32 mb-40">
          {featured.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects - Technical Grid */}
        <Reveal>
            <div className="flex items-center gap-4 mb-12">
                <h3 className="text-2xl font-bold text-white">Other Implementations</h3>
                <div className="h-[1px] flex-grow bg-white/10" />
            </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {others.map(project => (
                <OtherProject key={project.id} project={project} />
            ))}
        </div>

      </div>
    </section>
  );
};

const FeaturedProject = ({ project, index }: { project: Project; index: number }) => {
    const activeLink = project.githubUrl || project.projectUrl;
    const isEven = index % 2 === 0;

    return (
        <Reveal width="100%">
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 lg:mb-0">
                {/* Background Number */}
                <span 
                    className={`absolute -top-10 lg:-top-12 text-[80px] lg:text-[150px] font-bold text-white/[0.02] font-mono pointer-events-none select-none z-0
                    ${isEven ? 'left-0 lg:-left-12' : 'right-0 lg:-right-12'}`}
                >
                    0{index + 1}
                </span>

                {/* Image Column */}
                <div className={`lg:col-span-7 relative z-10 ${!isEven ? 'lg:order-2' : ''}`}>
                    {activeLink ? (
                        <a 
                            href={activeLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block overflow-hidden border border-white/10 bg-zinc-900 aspect-video relative group-hover:border-neon/50 transition-colors duration-500 cursor-pointer rounded-sm"
                        >
                            <div className="absolute inset-0 bg-void/40 group-hover:bg-transparent transition-all duration-500 z-10" />
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                            />
                        </a>
                    ) : (
                        <div className="overflow-hidden border border-white/10 bg-zinc-900 aspect-video relative group-hover:border-neon/50 transition-colors duration-500 rounded-sm">
                            <div className="absolute inset-0 bg-void/40 group-hover:bg-transparent transition-all duration-500 z-10" />
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                            />
                        </div>
                    )}
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-5 relative z-20 flex flex-col justify-center ${!isEven ? 'lg:order-1 lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 group-hover:text-neon transition-colors inline-flex items-center gap-3">
                        {activeLink ? (
                             <a href={activeLink} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-neon underline-offset-4 decoration-2">
                                {project.title}
                             </a>
                        ) : (
                            project.title
                        )}
                    </h3>

                    <div className={`bg-zinc-900/90 border border-white/10 p-6 mb-6 backdrop-blur-md rounded-sm shadow-xl ${!isEven ? '-mr-0 lg:-mr-16' : '-ml-0 lg:-ml-16'} z-20`}>
                         <p className="text-slate-300 text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="mb-6 lg:mb-8">
                         <ul className={`flex flex-wrap gap-2 lg:gap-3 text-xs font-mono text-neon/80 ${!isEven ? 'justify-start lg:justify-end' : 'justify-start'}`}>
                            {project.techStack.map(tech => (
                                <li key={tech} className="px-2 py-1 bg-neon/5 border border-neon/10 rounded-sm">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`flex gap-6 items-center ${!isEven ? 'justify-start lg:justify-end' : 'justify-start'}`}>
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-neon transition-colors uppercase font-mono text-xs tracking-wider">
                                <Github size={18} /> <span className="hidden sm:inline">Source</span>
                            </a>
                        )}
                        {!project.githubUrl && project.projectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-neon transition-colors uppercase font-mono text-xs tracking-wider">
                                <ArrowUpRight size={18} /> <span className="hidden sm:inline">Visit</span>
                            </a>
                        )}
                         {project.status && (
                             <span className="flex items-center gap-2 text-xs font-mono text-neon border border-neon/30 px-3 py-1 rounded-full bg-neon/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                                {project.status}
                             </span>
                        )}
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

const OtherProject = ({ project }: { project: Project }) => {
    const activeLink = project.githubUrl || project.projectUrl;
    
    const InnerContent = () => (
        <div className="group bg-zinc-900/30 border border-white/5 hover:border-neon/50 p-6 lg:p-8 transition-all duration-300 h-full flex flex-col hover:-translate-y-2 hover:shadow-xl hover:shadow-neon/10 rounded-sm">
            <div className="flex justify-between items-start mb-6">
                <h4 className="text-xl font-bold text-white group-hover:text-neon transition-colors max-w-[85%]">
                    {project.title}
                </h4>
                {activeLink && (
                    <span className="text-slate-500 group-hover:text-white transition-colors">
                        <ArrowUpRight size={20} />
                    </span>
                )}
            </div>

            <div className="mb-6 overflow-hidden h-40 w-full border border-white/5 relative rounded-sm">
                    <img src={project.imageUrl} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" />
            </div>

            <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                {project.description}
            </p>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-auto text-xs font-mono text-slate-500">
                {project.techStack.map(tech => (
                    <li key={tech} className="hover:text-neon transition-colors">{tech}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <Reveal width="100%">
            {activeLink ? (
                <a href={activeLink} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                    <InnerContent />
                </a>
            ) : (
                <div className="block h-full">
                    <InnerContent />
                </div>
            )}
        </Reveal>
    );
};