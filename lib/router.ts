import { useEffect, useState } from 'react';

/**
 * Hash routing, deliberately.
 *
 * GitHub Pages serves static files with no SPA fallback, so a path-based
 * router would 404 on a hard load of /blog/foo. Hash routes need no
 * 404.html trick and survive refresh and deep links as-is. Existing
 * anchor links (#about, #skills) do not start with "#/" so they fall
 * through to the home route and keep scrolling normally.
 */

export type Route =
  | { name: 'home' }
  | { name: 'blogIndex' }
  | { name: 'post'; slug: string };

export function parseRoute(hash: string): Route {
  if (hash.startsWith('#/blog/')) {
    const slug = decodeURIComponent(hash.slice('#/blog/'.length)).replace(/\/$/, '');
    return slug ? { name: 'post', slug } : { name: 'blogIndex' };
  }
  if (hash === '#/blog' || hash === '#/blog/') return { name: 'blogIndex' };
  return { name: 'home' };
}

export function useRoute(): Route {
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash
  );

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return parseRoute(hash);
}

export const navigate = (to: string) => {
  window.location.hash = to;
};

export const postHref = (slug: string) => `#/blog/${encodeURIComponent(slug)}`;
