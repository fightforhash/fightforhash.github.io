import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { GridToggle, useGridMode } from './ui/GridOverlay';

const navLinks = [
  { name: '~/profile', href: '#about' },
  { name: '~/interfaces', href: '#skills' },
  { name: '~/automation', href: '#automation' },
  { name: '~/inventory', href: '#projects' },
  { name: '~/posts', href: '#blog' },
  { name: '~/contact', href: '#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gridOn, toggleGrid] = useGridMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-void/85 backdrop-blur-md py-3 border-b border-neon-line' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center gap-4">
          {/* Prompt-as-logo */}
          <a href="#hero" className="group shrink-0">
            <span className="font-mono text-sm tracking-tight text-neon-bright group-hover:text-neon transition-colors">
              thomas<span className="text-neon-dim">@</span>fightforhash
              <span className="text-amber">:~$</span>
              <span className="text-neon caret-solid" />
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.15em] text-neon-dim hover:text-neon transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-neon transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <GridToggle on={gridOn} onToggle={toggleGrid} className="ml-2" />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-neon hover:text-neon-bright transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-void/97 backdrop-blur-sm md:hidden flex items-center justify-center"
          >
            <div className="flex flex-col items-start gap-6">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-lg tracking-tight text-neon-bright hover:text-neon transition-colors"
                >
                  <span className="text-neon-dim text-xs mr-3">{String(i + 1).padStart(2, '0')}</span>
                  {link.name}
                </a>
              ))}
              <div className="rule w-full mt-2" />
              <GridToggle on={gridOn} onToggle={toggleGrid} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
