import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { Reveal } from './ui/Reveal';
import { TerminalSection, Label, PromptLine } from './ui/Terminal';
import { Check, Loader2, AlertCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FIELD =
  'w-full bg-grid-panel/60 border border-neon-line px-3 py-2 text-neon-bright font-mono text-sm ' +
  'focus:outline-none focus:border-neon focus:shadow-[0_0_12px_-4px_var(--neon-glow)] ' +
  'transition-all placeholder:text-neon-dim disabled:opacity-50';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(PERSONAL_INFO.contactFormAction, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <TerminalSection
      id="contact"
      command={`ssh ${PERSONAL_INFO.email}`}
      meta="open to work"
      className="bg-grid-panel/40"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left — availability + channels */}
        <div className="lg:col-span-5">
          <Reveal width="100%">
            <p className="font-mono text-xs md:text-[13px] text-neon-body leading-relaxed">
              Seeking IT / NOC / helpdesk roles focused on networking, systems administration, and
              infrastructure. Open to any opportunity — feel free to reach out.
            </p>

            <div className="mt-6">
              <Label>channels</Label>
              <div className="rule-flat mt-2 mb-3" />
              <ul className="font-mono text-xs space-y-2">
                <li className="flex items-center gap-3">
                  <Mail size={13} className="text-neon-dim shrink-0" />
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-neon-body hover:text-neon transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </li>
                {PERSONAL_INFO.socials.map(social => (
                  <li key={social.name} className="flex items-center gap-3">
                    <social.icon size={13} className="text-neon-dim shrink-0" />
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-body hover:text-neon transition-colors"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Right — the form, styled as console input */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05} width="100%">
            <div className="edge bg-grid-panel/50 p-5">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-10 text-center"
                  >
                    <Check className="text-neon w-8 h-8 mx-auto mb-4" />
                    <p className="font-mono text-sm text-neon glow">
                      %SYS-5-DELIVERED: message received
                    </p>
                    <p className="font-mono text-xs text-neon-dim mt-2">
                      I will respond shortly.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim hover:text-neon transition-colors border-b border-neon-line pb-1"
                    >
                      send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="c-name" className="block mb-1.5">
                        <Label>name</Label>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        name="name"
                        required
                        disabled={status === 'submitting'}
                        className={FIELD}
                        placeholder="your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="c-email" className="block mb-1.5">
                        <Label>email</Label>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        name="email"
                        required
                        disabled={status === 'submitting'}
                        className={FIELD}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="c-message" className="block mb-1.5">
                        <Label>message</Label>
                      </label>
                      <textarea
                        id="c-message"
                        name="message"
                        rows={5}
                        required
                        disabled={status === 'submitting'}
                        className={`${FIELD} resize-none`}
                        placeholder="..."
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="edge edge-hot px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neon hover:bg-neon/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {status === 'submitting' ? 'transmitting' : 'transmit'}
                        {status === 'submitting' && <Loader2 size={12} className="animate-spin" />}
                      </button>
                      {status === 'error' && (
                        <span className="text-amber text-[11px] font-mono flex items-center gap-2">
                          <AlertCircle size={12} /> %SYS-3-FAILED: transmission failed
                        </span>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </TerminalSection>
  );
};

/* ------------------------------------------------------------------
   Footer — build provenance instead of a framework credit line.
   ------------------------------------------------------------------ */

const Footer = () => (
  <Reveal width="100%" delay={0.1}>
    <footer className="mt-12">
      <div className="rule mb-4" />
      <PromptLine command="show version | include build" className="mb-3" />
      <div className="flex flex-col md:flex-row justify-between gap-3 font-mono text-[11px] text-neon-dim">
        <div className="space-y-1">
          <p>
            <span className="inline-block w-20">commit</span>
            <span className="text-neon-body tabular-nums">{__COMMIT_SHA__}</span>
          </p>
          <p>
            <span className="inline-block w-20">built</span>
            <span className="text-neon-body tabular-nums">{__BUILD_TIME__}</span>
          </p>
          <p>
            <span className="inline-block w-20">deploy</span>
            <span className="text-neon-body">github pages · main:/docs</span>
          </p>
        </div>
        <div className="md:text-right">
          <p>&copy; {new Date().getFullYear()} Thomas Ha</p>
          <p className="mt-1 flex items-center gap-2 md:justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-neon" />
            <span className="text-neon">available for work</span>
          </p>
        </div>
      </div>
    </footer>
  </Reveal>
);
