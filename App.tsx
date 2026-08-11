import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Automation } from './components/Automation';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { BlogIndex } from './components/BlogIndex';
import { BlogPostView } from './components/BlogPostView';
import { GridOverlay } from './components/ui/GridOverlay';
import { useRoute } from './lib/router';

function App() {
  const route = useRoute();

  // Entering a blog route should start at the top of the new document.
  // Coming *back* to home via an anchor (#about from the blog index, or a
  // console `navigate`) needs a manual scroll: the browser resolves the
  // fragment before React has mounted the section, so it finds nothing.
  useEffect(() => {
    if (route.name !== 'home') {
      window.scrollTo(0, 0);
      return;
    }

    const hash = window.location.hash;
    if (!hash || hash.startsWith('#/')) return;

    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route.name, route.name === 'post' ? route.slug : '']);

  return (
    <main className="bg-void min-h-screen text-neon-body antialiased selection:bg-neon selection:text-void relative">
      <GridOverlay />

      <div className="relative z-10">
        <Navbar />

        {route.name === 'home' && (
          <>
            <Hero />
            <About />
            <Skills />
            <Automation />
            <Projects />
            <Blog />
            <Contact />
          </>
        )}

        {route.name === 'blogIndex' && <BlogIndex />}
        {route.name === 'post' && <BlogPostView slug={route.slug} />}
      </div>
    </main>
  );
}

export default App;
