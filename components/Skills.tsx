import React from 'react';
import { SKILLS } from '../constants';
import { Reveal } from './ui/Reveal';
export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">

        <Reveal>
          <span className="font-mono text-neon text-sm tracking-widest uppercase mb-4 block">02 / Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-14">
            Technical <span className="text-slate-500">Arsenal.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
          <TechColumn title="Networking" items={SKILLS.networking} index={1} />
          <TechColumn title="Systems & Support" items={SKILLS.systems} index={2} />
          <TechColumn title="Monitoring & IR" items={SKILLS.monitoring} index={3} />
          <TechColumn title="Scripting & Infra" items={SKILLS.scripting} index={4} />
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