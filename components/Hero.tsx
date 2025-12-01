import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { DitheringShader } from './ui/dithering-shader';

export const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Initial size
    if (typeof window !== 'undefined') {
        handleResize();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Shader & Overlay */}
      {dimensions.width > 0 && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-30">
            <DitheringShader 
              width={dimensions.width}
              height={dimensions.height}
              colorBack="#030303"
              colorFront="#00f0ff"
              shape="circle"
              type="2x2"
              pxSize={4}
              speed={1}
            />
          </div>
          {/* 
             Gradient to fade out shader at the bottom for text readability.
             Concentrated at the bottom (0-40%) to keep text legible while revealing animation above.
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] from-0% via-[#030303]/90 via-20% to-transparent to-50%" />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-neon/50"></div>
            <span className="text-neon font-mono text-sm tracking-widest uppercase">
              System Online
            </span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[10rem] leading-none font-bold tracking-tighter text-white mb-2"
            >
              THOMAS
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
             <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-[10rem] leading-none font-bold tracking-tighter text-white/5"
              style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)" }}
            >
              HA
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-12 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-8"
          >
            <p className="text-slate-300 text-lg max-w-lg leading-relaxed font-light drop-shadow-md">
              <span className="text-white font-medium">Frontend-focused Full-Stack Engineer</span> combining architectural logic with creative design. Building scalable, high-performance web interfaces with modern React ecosystems.
            </p>
            
            <div className="mt-8 md:mt-0 flex flex-col items-end gap-2">
               <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Current Location</span>
               <span className="text-white font-medium drop-shadow-md">{PERSONAL_INFO.location}</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 bottom-0 p-12 opacity-20 pointer-events-none z-10">
         <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-neon rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
         </div>
      </div>
    </section>
  );
};