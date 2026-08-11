import React, { useState } from 'react';
import { POSTS, ALL_TAGS, readTime } from '../lib/posts';
import { postHref } from '../lib/router';
import { PromptLine, Label } from './ui/Terminal';
import { ArrowLeft } from 'lucide-react';

export const BlogIndex = () => {
  const [tag, setTag] = useState<string | null>(null);
  const posts = tag ? POSTS.filter(p => p.tags.includes(tag)) : POSTS;

  return (
    <div className="container mx-auto px-6 pt-28 pb-16 min-h-screen">
      <a
        href="#hero"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim hover:text-neon transition-colors mb-6"
      >
        <ArrowLeft size={12} /> cd ~
      </a>

      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <PromptLine command={`dir flash:/posts/${tag ? ` | include ${tag}` : ''}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim">
          {posts.length} file{posts.length === 1 ? '' : 's'}
        </span>
      </div>
      <div className="rule mt-3 mb-6" />

      {/* Tag filter */}
      {ALL_TAGS.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <FilterButton active={tag === null} onClick={() => setTag(null)}>
            all
          </FilterButton>
          {ALL_TAGS.map(t => (
            <FilterButton key={t} active={tag === t} onClick={() => setTag(t)}>
              #{t}
            </FilterButton>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="font-mono text-xs text-neon-dim">No posts match that tag.</p>
      ) : (
        <div className="border-t border-neon-line max-w-4xl">
          {posts.map(post => (
            <a
              key={post.slug}
              href={postHref(post.slug)}
              className="group block border-b border-neon-line py-4 hover:bg-neon/[0.03] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                <span className="font-mono text-[11px] text-neon-dim tabular-nums shrink-0 md:w-28">
                  {post.date}
                </span>
                <h2 className="font-mono text-sm text-neon-bright group-hover:text-neon transition-colors flex-1">
                  {post.title}
                </h2>
                <span className="font-mono text-[10px] text-neon-dim shrink-0 tabular-nums">
                  {readTime(post.body)} min
                </span>
              </div>

              {post.excerpt && (
                <p className="mt-1.5 font-mono text-xs text-neon-body leading-relaxed md:pl-32 max-w-3xl">
                  {post.excerpt}
                </p>
              )}

              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-x-3 md:pl-32">
                  {post.tags.map(t => (
                    <Label key={t}>#{t}</Label>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`px-2.5 py-1 font-mono text-[11px] border transition-colors ${
      active
        ? 'edge edge-hot text-neon bg-neon/10'
        : 'border-neon-line text-neon-dim hover:text-neon'
    }`}
  >
    {children}
  </button>
);
