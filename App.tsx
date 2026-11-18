import React, { useEffect } from 'react';
import { BlogIndex } from './components/BlogIndex';
import { BlogPostView } from './components/BlogPostView';
import { RackHome, RackShell, RACK_HEIGHT } from './components/rack/RackHome';
import { RackUnit } from './components/rack/parts';
import { AssetTag } from './components/rack/AssetTag';
import { useRoute } from './lib/router';

function App() {
  const route = useRoute();

  // Entering a blog route starts at the top. Coming back home via an anchor
  // (#about from the blog, or a console `navigate`) needs a manual scroll:
  // the browser resolves the fragment before React has mounted the section.
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
    <main className="rack-root cabinet min-h-screen antialiased">
      {route.name === 'home' ? (
        <RackHome footer={<AssetTag />} />
      ) : (
        <RackShell onHome={false} footer={<AssetTag />}>
          <RackUnit start={2} units={RACK_HEIGHT - 1} variant="black" bodyClassName="p-3 md:p-6">
            <div className="crt rack-blog p-2 md:p-4">
              {route.name === 'blogIndex' ? <BlogIndex /> : <BlogPostView slug={route.slug} />}
            </div>
          </RackUnit>
        </RackShell>
      )}
    </main>
  );
}

export default App;
