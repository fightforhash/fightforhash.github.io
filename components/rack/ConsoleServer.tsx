import React, { useMemo, useState } from 'react';
import { TOPOLOGY, CDP_NEIGHBORS } from '../../lib/topology';
import { runCommand } from '../../lib/commands';
import { Console } from '../ui/Console';
import { RackUnit, StatusLed } from './parts';

const pad = (s: string, n: number) => s.padEnd(n, ' ');

/** Console server + CRT: the lab diagram on one screen, a live shell on the other. */
export const ConsoleServer: React.FC<{ start: number }> = ({ start }) => {
  const banner = useMemo(() => runCommand('show version').lines ?? [], []);
  const [mobileConsole, setMobileConsole] = useState(false);

  return (
    <RackUnit id="topology" start={start} units={4} variant="black" bodyClassName="px-5 md:px-8 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <div>
          <span className="silk text-[14px] opacity-70">console server with crt</span>
          <h2 className="silk text-[28px] leading-none text-[#eef0f2] mt-1">Lab</h2>
        </div>
        <div className="flex gap-5">
          <StatusLed name="pwr" />
          <StatusLed name="tx" blink="fast" />
          <StatusLed name="rx" blink="slow" />
        </div>
      </div>

      <div className="crt p-4 md:p-6">
        <p className="text-[20px] leading-tight">R1# show cdp neighbors</p>
        <div className="mt-3 grid xl:grid-cols-[auto_minmax(0,1fr)] gap-x-10 gap-y-4 items-start">
          <pre className="text-[15px] md:text-[16px] leading-[1.15] overflow-x-auto whitespace-pre">{TOPOLOGY}</pre>
          <pre className="text-[16px] md:text-[17px] leading-[1.25] overflow-x-auto whitespace-pre">
            {pad('Device', 8)}
            {pad('Local', 10)}
            {pad('Cap', 7)}
            {pad('Platform', 12)}
            {'Port\n'}
            {CDP_NEIGHBORS.map(
              n => `${pad(n.device, 8)}${pad(n.local, 10)}${pad(n.capability, 7)}${pad(n.platform, 12)}${n.port}\n`
            ).join('')}
          </pre>
        </div>
      </div>

      <div className="mt-6">
        {/* Desktop: the shell is always live. */}
        <div className="crt hidden md:block p-2">
          <Console banner={banner} className="h-[380px] !bg-transparent !backdrop-blur-none !shadow-none !border-0" />
        </div>

        {/* Phones: opt in, so the keyboard does not take over the page. */}
        <div className="md:hidden">
          {mobileConsole ? (
            <div className="crt p-2">
              <Console banner={banner} className="h-[380px] !bg-transparent !backdrop-blur-none !shadow-none !border-0" />
            </div>
          ) : (
            <button type="button" className="btn-panel btn-panel--dark" onClick={() => setMobileConsole(true)}>
              Open the console
            </button>
          )}
        </div>
        <p className="mt-3 text-[13.5px] leading-snug text-[var(--ink-light)] opacity-80">
          Type <code className="silk">help</code> to list commands. Try <code className="silk">show version</code> or{' '}
          <code className="silk">traceroute career</code>.
        </p>
      </div>
    </RackUnit>
  );
};
