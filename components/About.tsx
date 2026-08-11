import React from 'react';
import { EXPERIENCES, EDUCATION_HISTORY, PERSONAL_INFO } from '../constants';
import { Reveal } from './ui/Reveal';
import { TerminalSection, TerminalWindow, Label } from './ui/Terminal';

export const About = () => (
  <>
    <ProfileSection />
    <LoggingSection />
  </>
);

/* ------------------------------------------------------------------
   show running-config | section profile
   ------------------------------------------------------------------ */

const ProfileSection = () => (
  <TerminalSection id="about" command="show running-config | section profile" meta="profile">
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Photo — small, no editorial hover tricks */}
      <div className="lg:col-span-3">
        <Reveal width="100%">
          <div className="edge overflow-hidden bg-grid-panel aspect-[4/5] max-w-[220px]">
            <img
              src="https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/main/images/profile.jpg"
              alt="Thomas Ha"
              className="object-cover w-full h-full opacity-90"
              loading="lazy"
            />
          </div>
          <div className="mt-3 font-mono text-[11px] text-neon-dim space-y-1">
            <p>
              <span className="text-neon-dim">location </span>
              <span className="text-neon-body">{PERSONAL_INFO.location}</span>
            </p>
            <p>
              <span className="text-neon-dim">role     </span>
              <span className="text-neon-body">{PERSONAL_INFO.title}</span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Bio as config comments */}
      <div className="lg:col-span-9">
        <Reveal width="100%" delay={0.05}>
          <div className="font-mono text-xs md:text-[13px] leading-relaxed space-y-3">
            {PERSONAL_INFO.bio.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-neon-body">
                <span className="text-neon-dim select-none mr-2">!</span>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Education */}
        <div className="mt-8">
          <Reveal width="100%" delay={0.1}>
            <Label>education</Label>
            <div className="rule-flat mt-2 mb-4" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">
            {EDUCATION_HISTORY.map(edu => {
              const inProgress = /in progress/i.test(edu.degree);
              return (
                <Reveal key={edu.id} width="100%">
                  <TerminalWindow
                    title={edu.period}
                    status={inProgress ? 'progress' : 'active'}
                    statusLabel={inProgress ? 'in progress' : 'complete'}
                  >
                    <h4
                      className={`font-mono text-sm mb-1 ${
                        inProgress ? 'text-amber' : 'text-neon-bright'
                      }`}
                    >
                      {edu.degree.replace(/\s*—\s*in progress/i, '')}
                    </h4>
                    <p className="font-mono text-[11px] text-neon-dim mb-3">{edu.institution}</p>
                    {edu.details && edu.details.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-3 border-t border-neon-line">
                        {edu.details.map((d, i) => (
                          <span key={i} className="font-mono text-[10px] text-neon-dim">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </TerminalWindow>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </TerminalSection>
);

/* ------------------------------------------------------------------
   show logging — experience as timestamped log entries
   ------------------------------------------------------------------ */

const LoggingSection = () => (
  <TerminalSection
    id="logs"
    command="show logging"
    meta={`${EXPERIENCES.reduce((n, e) => n + e.description.length + 1, 0)} entries`}
    className="bg-grid-panel/40"
  >
    <div className="space-y-6">
      {EXPERIENCES.map(exp => (
        <Reveal key={exp.id} width="100%">
          <div className="font-mono text-xs leading-relaxed">
            {/* Session header */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2 border-b border-neon-line">
              <span className="text-neon-dim tabular-nums whitespace-nowrap">{exp.period}</span>
              <span className="text-amber">%SYS-5-CONFIG_I:</span>
              <span className="text-neon-bright">{exp.role}</span>
              <span className="text-neon-dim">— {exp.company}</span>
            </div>

            {/* Log lines */}
            <ul className="mt-2 space-y-1.5">
              {exp.description.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-neon-body">
                  <span className="text-neon-dim shrink-0 tabular-nums select-none">
                    {String(idx + 1).padStart(3, '0')}
                  </span>
                  <span className="text-neon-dim shrink-0 hidden sm:inline">%OPS-6-INFO:</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </TerminalSection>
);
