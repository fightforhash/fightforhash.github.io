import React from 'react';
import { PERSONAL_INFO, EDUCATION_HISTORY } from '../../constants';
import { RackUnit, StatusLed, Led } from './parts';

const ccna = EDUCATION_HISTORY.find(e => /ccna/i.test(e.degree));

/** Pad to the 16 characters a 16x2 character LCD actually has. */
const lcdLine = (s: string) => s.slice(0, 16).padEnd(16, ' ');

export const Nameplate: React.FC<{ start: number }> = ({ start }) => (
  <RackUnit id="hero" start={start} units={3} as="header" bodyClassName="px-5 md:px-8 py-6 md:py-8">
    <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10">
      {/* Model badge + name: the part of the chassis you read first. */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="silk text-[13px] px-2 py-0.5 bg-[var(--ink)] text-[var(--faceplate)] rounded-[2px]">
            TH-2026
          </span>
          <span className="silk text-[13px] text-[var(--ink-soft)]">network engineer, rack-mounted</span>
        </div>

        <h1 className="silk mt-3 text-[44px] md:text-[64px] leading-[0.9] tracking-[-0.01em] text-[var(--ink)]">
          {PERSONAL_INFO.name}
        </h1>
        <p className="silk mt-2 text-[19px] md:text-[22px] text-[var(--ink-soft)]">{PERSONAL_INFO.title}</p>
        <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-[var(--ink)]">
          {PERSONAL_INFO.tagline} Based in {PERSONAL_INFO.location}.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href="#projects" className="btn-panel">
            See projects
          </a>
          {ccna?.verifyUrl && (
            <a href={ccna.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn-panel">
              Verify CCNA on Credly
            </a>
          )}
        </div>
      </div>

      {/* Status block: LEDs and the character LCD. */}
      <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
        <div className="flex gap-5 text-[var(--ink)]">
          <StatusLed name="sys" />
          <StatusLed name="stat" />
          <StatusLed name="ccna" />
          <StatusLed name="act" blink="slow" />
        </div>

        <div className="lcd" aria-label={`CCNA certified, ${ccna?.period ?? ''}`}>
          {lcdLine('CCNA certified')}
          {'\n'}
          {lcdLine(`since ${ccna?.period ?? ''}`)}
        </div>

        <p className="silk flex items-center gap-2 text-[14px] text-[var(--ink)]">
          <Led color="green" /> available for work
        </p>
      </div>
    </div>
  </RackUnit>
);
