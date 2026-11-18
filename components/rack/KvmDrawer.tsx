import React from 'react';
import { PERSONAL_INFO, EDUCATION_HISTORY, EXPERIENCES } from '../../constants';
import { RackUnit } from './parts';

const degree = EDUCATION_HISTORY.find(e => /b\.s\./i.test(e.degree));

/** The pull-out LCD console every 2000s rack had, here holding the profile. */
export const KvmDrawer: React.FC<{ start: number }> = ({ start }) => (
  <RackUnit id="about" start={start} units={3} bodyClassName="px-5 md:px-8 py-5">
    <div className="flex items-center justify-between gap-4 mb-4">
      <span className="silk text-[14px] text-[var(--ink-soft)]">kvm console drawer</span>
      {/* drawer handle */}
      <span className="h-[10px] w-28 rounded-full bg-gradient-to-b from-[#eef0f2] to-[#9aa1a8] shadow-[0_1px_0_rgba(0,0,0,0.4)]" aria-hidden="true" />
    </div>

    <div className="grid md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-6 md:gap-8 items-start">
      {/* LCD panel in its bezel. */}
      <div className="bg-[#1b1d20] p-[10px] rounded-[3px] shadow-[inset_0_0_0_1px_#3a3e43]">
        <div className="aspect-[4/3] overflow-hidden bg-black">
          <img
            src="/images/profile.jpg"
            alt={`${PERSONAL_INFO.name} playing a Suhr guitar`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="silk text-[10px] text-[#7d848b]">1024 x 768</span>
          <span className="silk text-[10px] text-[#7d848b]">vga 1</span>
        </div>
      </div>

      <div className="min-w-0">
        <h2 className="silk text-[28px] leading-none text-[var(--ink)]">About</h2>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.65] text-[var(--ink)]">{PERSONAL_INFO.bio}</p>

        <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-[14px]">
          <dt className="silk text-[var(--ink-soft)]">now</dt>
          <dd className="text-[var(--ink)]">Looking for network engineer roles, Seattle or remote</dd>
          <dt className="silk text-[var(--ink-soft)]">last role</dt>
          <dd className="text-[var(--ink)]">
            {EXPERIENCES[0]?.role}, {EXPERIENCES[0]?.company.split(' — ')[0]}
          </dd>
          {degree && (
            <>
              <dt className="silk text-[var(--ink-soft)]">school</dt>
              <dd className="text-[var(--ink)]">
                {degree.degree}, {degree.institution}
              </dd>
            </>
          )}
        </dl>
      </div>
    </div>
  </RackUnit>
);
