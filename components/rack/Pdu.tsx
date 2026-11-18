import React from 'react';
import { PERSONAL_INFO } from '../../constants';
import { useContactForm } from '../../lib/useContactForm';
import { RackUnit, Led, Tape } from './parts';

/** A NEMA 5-15 receptacle, drawn: two slots and a ground hole. */
const Outlet: React.FC = () => (
  <span
    className="relative block w-[46px] h-[46px] rounded-[6px] bg-gradient-to-b from-[#1a1c1f] to-[#0f1012] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
    aria-hidden="true"
  >
    <span className="absolute top-[11px] left-[13px] w-[4px] h-[13px] bg-black rounded-[1px]" />
    <span className="absolute top-[11px] right-[13px] w-[4px] h-[13px] bg-black rounded-[1px]" />
    <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-black rounded-t-full" />
  </span>
);

const channels = [
  { name: 'Email', url: `mailto:${PERSONAL_INFO.email}` },
  ...PERSONAL_INFO.socials.map(s => ({ name: s.name, url: s.url })),
];

export const Pdu: React.FC<{ start: number }> = ({ start }) => {
  const { status, setStatus, handleSubmit } = useContactForm();
  const busy = status === 'submitting';

  return (
    <RackUnit id="contact" start={start} units={4} variant="black" bodyClassName="px-5 md:px-8 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <div>
          <span className="silk text-[14px] opacity-70">power distribution unit, 20A</span>
          <h2 className="silk text-[28px] leading-none text-[#eef0f2] mt-1">Contact</h2>
        </div>
        <span className="silk flex items-center gap-2 text-[14px]">
          <Led color="green" /> load normal
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-8">
        <div className="min-w-0">
          <p className="max-w-[56ch] text-[16px] leading-[1.6] text-[var(--ink-light)]">
            Seeking network engineer roles in routing and switching, network automation, and infrastructure. Seattle or
            remote. Email is the fastest way to reach me:{' '}
            <a href={`mailto:${PERSONAL_INFO.email}`} className="underline underline-offset-4 text-white">
              {PERSONAL_INFO.email}
            </a>
          </p>

          <ul className="mt-6 flex flex-wrap gap-5">
            {channels.map((c, i) => (
              <li key={c.name}>
                <a
                  href={c.url}
                  target={c.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2"
                >
                  <Outlet />
                  <Tape tilt={i % 2 ? 1 : -0.8}>{c.name}</Tape>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The work order everyone fills in before touching a rack. */}
        <div className="ticket p-5 rounded-[2px] min-w-0">
          <div className="flex justify-between items-baseline">
            <span className="silk text-[18px]">Work order</span>
            <span className="silk text-[13px] text-[#4b5560]">priority: normal</span>
          </div>

          {status === 'success' ? (
            <div className="mt-6 space-y-3">
              <p className="text-[16px]">Ticket received. I'll reply by email.</p>
              <button type="button" className="btn-panel" onClick={() => setStatus('idle')}>
                Open another ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <label className="block">
                <span className="silk text-[13px] text-[#4b5560]">Requested by</span>
                <input name="name" required autoComplete="name" disabled={busy} className="ticket-field" />
              </label>
              <label className="block">
                <span className="silk text-[13px] text-[#4b5560]">Reply to (email)</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={busy}
                  className="ticket-field"
                />
              </label>
              <label className="block">
                <span className="silk text-[13px] text-[#4b5560]">Details</span>
                <textarea name="message" required rows={4} disabled={busy} className="ticket-field resize-none" />
              </label>
              <div className="flex items-center gap-4">
                <button type="submit" disabled={busy} className="btn-panel">
                  {busy ? 'Sending…' : 'Send ticket'}
                </button>
                {status === 'error' && (
                  <p className="text-[14px] text-[#a3261c]" role="alert">
                    Didn't go through. Email {PERSONAL_INFO.email} directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </RackUnit>
  );
};
