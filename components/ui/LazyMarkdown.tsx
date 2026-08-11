import React, { Suspense, lazy } from 'react';

/**
 * The markdown pipeline (react-markdown + remark + highlight.js) is the
 * heaviest thing on the site and nothing above the fold needs it, so it
 * loads as its own chunk.
 */
const Markdown = lazy(() => import('./Markdown'));

interface LazyMarkdownProps {
  children: string;
  className?: string;
}

export const LazyMarkdown: React.FC<LazyMarkdownProps> = ({ children, className }) => (
  <Suspense
    fallback={
      <p className="font-mono text-[11px] text-neon-dim">
        loading<span className="caret" />
      </p>
    }
  >
    <Markdown className={className}>{children}</Markdown>
  </Suspense>
);
