import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// rehype-highlight registers ~190 languages by default, which more than
// doubled the bundle. Register only what actually appears on this site.
import python from 'highlight.js/lib/languages/python';
import yaml from 'highlight.js/lib/languages/yaml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import typescript from 'highlight.js/lib/languages/typescript';
import ini from 'highlight.js/lib/languages/ini';

const languages = { python, yaml, bash, json, markdown, typescript, ini };

interface MarkdownProps {
  children: string;
  className?: string;
}

/**
 * Shared markdown renderer — blog posts and the automation snippets go
 * through the same pipeline, so highlighting is configured once.
 *
 * The highlight theme lives in index.css (cyan/amber) rather than a
 * highlight.js stylesheet, so there is no external CSS dependency.
 */
const Markdown: React.FC<MarkdownProps> = ({ children, className = '' }) => (
  <div className={`prose-console ${className}`}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { languages, detect: false, ignoreMissing: true }]]}
      components={{
        a: ({ href, children: kids, ...rest }) => {
          const external = href?.startsWith('http');
          return (
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...rest}
            >
              {kids}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);

export default Markdown;
