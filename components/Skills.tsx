import React from 'react';
import { SKILLS, PUBLICATIONS, BLOG_POSTS } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight } from 'lucide-react';

export const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Skills Section */}
        <div className="mb-20 md:mb-32">
          <Reveal>
             <span className="font-mono text-neon text-sm tracking-widest uppercase mb-4 block">02 / Capabilities</span>
             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12 md:mb-16">
                Technical <span className="text-slate-500">Arsenal.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            <TechColumn title="Frontend" items={SKILLS.frontend} index={1} />
            <TechColumn title="Backend" items={SKILLS.backend} index={2} />
            <TechColumn title="Database" items={SKILLS.database} index={3} />
            <TechColumn title="DevOps / Tools" items={SKILLS.tools} index={4} />
          </div>
        </div>

        {/* Publications Feature */}
        <div className="mb-20 md:mb-32">
            <Reveal>
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-bold text-white">Latest Research</h3>
                    <div className="h-[1px] flex-grow bg-white/10" />
                </div>
            </Reveal>

             {PUBLICATIONS.map(pub => (
                <Reveal key={pub.id} width="100%">
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="group block relative">
                         <div className="relative flex flex-col lg:flex-row gap-0 border border-white/10 bg-zinc-900/20 hover:border-neon/50 transition-all duration-500 overflow-hidden">
                             {/* Image Side */}
                             <div className="w-full lg:w-80 h-64 lg:h-auto shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 relative">
                                <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                                {pub.image && (
                                    <img 
                                        src={pub.image} 
                                        alt={pub.title} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                                    />
                                )}
                             </div>

                             {/* Content Side */}
                             <div className="p-8 lg:p-10 flex flex-col justify-center flex-grow">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="font-mono text-xs text-neon border border-neon/20 px-2 py-1 uppercase">{pub.conference}</span>
                                    <ArrowUpRight className="text-slate-500 group-hover:text-neon transition-colors" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-neon transition-colors">
                                    {pub.title}
                                </h4>
                                <p className="text-slate-400 leading-relaxed text-sm mb-8">
                                    {pub.description}
                                </p>
                                <span className="inline-flex items-center gap-2 font-mono text-xs text-neon uppercase tracking-wider group-hover:text-white transition-colors">
                                    Read Publication <ArrowUpRight size={14} />
                                </span>
                             </div>
                         </div>
                    </a>
                </Reveal>
            ))}
        </div>

        {/* Blog Grid */}
        <div>
             <Reveal>
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-bold text-white">Written Thoughts</h3>
                    <div className="h-[1px] flex-grow bg-white/10" />
                </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
                {BLOG_POSTS.map((post) => (
                    <Reveal key={post.id} width="100%">
                         <div className="bg-zinc-900/20 border border-white/5 p-1 h-full flex flex-col group hover:border-neon/30 transition-all">
                            <div className="h-48 overflow-hidden relative mb-4 shrink-0">
                                <div className="absolute inset-0 bg-black/10 z-10" />
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h4 className="text-white font-bold leading-tight mb-4 group-hover:text-neon transition-colors">{post.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed flex-grow">{post.excerpt}</p>
                            </div>
                         </div>
                    </Reveal>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

const TechColumn = ({ title, items, index }: { title: string, items: string[], index: number }) => (
    <Reveal delay={index * 0.1}>
        <div className="border-t border-white/20 pt-6">
            <h3 className="text-lg font-bold text-white mb-6 font-mono uppercase tracking-wider">{title}</h3>
            <ul className="space-y-3">
                {items.map(item => (
                    <li key={item} className="text-slate-400 text-xs font-mono hover:text-neon transition-colors cursor-default flex items-center gap-3">
                        <div className="w-1 h-1 bg-slate-600 rounded-full" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </Reveal>
);