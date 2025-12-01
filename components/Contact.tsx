import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowRight, Github, Linkedin, MessageSquare, Check, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="contact" className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Info - Takes up 5 columns */}
            <div className="lg:col-span-5">
                 <Reveal>
                    <span className="font-mono text-neon text-sm tracking-widest uppercase mb-4 block">04 / Contact</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
                        Let's Work <br/>
                        <span className="text-slate-500">Together.</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-slate-400 text-lg leading-relaxed mb-12">
                        Currently looking for new opportunities in frontend and full-stack engineering. 
                        Have a project in mind or just want to say hello?
                    </p>

                    <div className="space-y-4">
                         <a href={`mailto:${PERSONAL_INFO.email}`} className="block text-white text-xl hover:text-neon transition-colors font-mono">
                            {PERSONAL_INFO.email}
                        </a>
                        <div className="flex gap-6 pt-4">
                            {PERSONAL_INFO.socials.map(social => (
                                <a 
                                    key={social.name} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    <social.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Right Form - Takes up 7 columns for wider inputs */}
            <div className="lg:col-span-7 mt-12 lg:mt-0">
                <Reveal delay={0.3} width="100%">
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 border border-neon/30 bg-neon/5"
                                >
                                    <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mb-6">
                                        <Check className="text-neon w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Complete</h3>
                                    <p className="text-slate-400">Your message has been received. I will respond shortly.</p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 text-sm font-mono text-neon hover:text-white transition-colors uppercase tracking-widest border-b border-neon pb-1"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit} 
                                    className="space-y-12"
                                >
                                    <div className="group relative">
                                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2 transition-colors group-focus-within:text-neon">
                                            Name
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            disabled={status === 'submitting'}
                                            className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-sans font-light text-xl focus:outline-none focus:border-neon transition-all placeholder:text-slate-700"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    
                                    <div className="group relative">
                                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2 transition-colors group-focus-within:text-neon">
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            disabled={status === 'submitting'}
                                            className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-sans font-light text-xl focus:outline-none focus:border-neon transition-all placeholder:text-slate-700"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    
                                    <div className="group relative">
                                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2 transition-colors group-focus-within:text-neon">
                                            Message
                                        </label>
                                        <textarea 
                                            name="message" 
                                            rows={4} 
                                            required 
                                            disabled={status === 'submitting'}
                                            className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-sans font-light text-xl focus:outline-none focus:border-neon transition-all resize-none placeholder:text-slate-700"
                                            placeholder="Enter your message"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button 
                                            type="submit" 
                                            disabled={status === 'submitting'}
                                            className="group flex items-center gap-4 text-white font-mono uppercase tracking-widest text-lg hover:text-neon transition-colors pt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === 'submitting' ? 'Transmitting...' : 'Send Message'} 
                                            {status === 'submitting' ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                            )}
                                        </button>
                                        {status === 'error' && (
                                            <span className="text-red-500 text-sm font-mono flex items-center gap-2 pt-4">
                                                <AlertCircle size={14} /> Transmission Failed
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

        <Reveal>
             <footer className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="text-slate-600 text-xs font-mono">
                    <p>&copy; 2025 Thomas Ha.</p>
                    <p>Built with React, Tailwind, Framer Motion.</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-600 text-xs font-mono uppercase tracking-widest mb-2">Status</p>
                    <div className="flex items-center gap-2 justify-end">
                        <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        <span className="text-neon text-sm font-medium">Available for work</span>
                    </div>
                </div>
            </footer>
        </Reveal>

      </div>
    </section>
  );
};