import React from 'react';
import { EXPERIENCES, EDUCATION_HISTORY, PERSONAL_INFO } from '../constants';
import { Reveal } from './ui/Reveal';

export const About = () => {
  return (
    <section id="about" className="py-32 bg-void relative border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24">
            <Reveal>
                <span className="font-mono text-neon text-sm tracking-widest uppercase mb-4 block">01 / The Profile</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Background & <br/>
                    <span className="text-slate-500">History.</span>
                </h2>
            </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Bio & Image */}
          <div className="lg:col-span-5">
            <Reveal>
               <div className="relative group w-full mb-12">
                <div className="absolute -inset-2 bg-neon/20 rounded-none skew-x-3 opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative overflow-hidden border border-white/10 bg-zinc-900 aspect-[3/4]">
                   <img 
                    src="https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/main/images/profile.jpg" 
                    alt="Thomas Ha" 
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                   />
                   {/* Tech Overlay */}
                   <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <p className="font-mono text-[10px] text-neon uppercase tracking-widest">
                        </p>
                   </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="prose prose-invert text-slate-400 leading-relaxed font-light text-sm md:text-base">
                {PERSONAL_INFO.bio.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6">
                        {paragraph}
                    </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <Reveal delay={0.3}>
                <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-4">
                    Experience
                    <div className="h-[1px] flex-grow bg-white/10" />
                </h3>
            </Reveal>
              
            <div className="space-y-12">
                {EXPERIENCES.map((exp) => (
                  <Reveal key={exp.id} width="100%">
                    <div className="group relative border-l border-white/10 pl-8 md:pl-12 hover:border-neon/50 transition-colors duration-300">
                      <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] bg-zinc-950 border border-white/30 group-hover:border-neon group-hover:bg-neon transition-all duration-300" />
                      
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                        <h4 className="text-xl font-bold text-white group-hover:text-neon transition-colors">{exp.role}</h4>
                        <span className="font-mono text-xs text-slate-500 whitespace-nowrap">{exp.period}</span>
                      </div>
                      
                      <p className="text-sm text-slate-300 font-medium mb-4">{exp.company}</p>
                      
                      <ul className="space-y-3">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="text-sm text-slate-400 leading-relaxed pl-4 border-l border-white/5">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
            </div>

            <Reveal delay={0.4}>
                <h3 className="text-2xl font-bold text-white mt-20 mb-12 flex items-center gap-4">
                    Education
                    <div className="h-[1px] flex-grow bg-white/10" />
                </h3>
            </Reveal>

             <div className="grid md:grid-cols-2 gap-8">
                {EDUCATION_HISTORY.map((edu) => (
                  <Reveal key={edu.id} width="100%">
                    <div className="bg-zinc-900/30 p-6 border border-white/5 hover:border-neon/30 transition-all duration-300 group">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon transition-colors">{edu.degree}</h4>
                      <p className="text-slate-400 text-sm mb-4">{edu.institution}</p>
                      <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                         <span className="font-mono text-xs text-slate-500">{edu.period}</span>
                         {edu.details && edu.details.length > 0 && (
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                {edu.details.map((d, i) => (
                                     <span key={i} className="font-mono text-xs text-neon/70">{d}</span>
                                ))}
                            </div>
                         )}
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};