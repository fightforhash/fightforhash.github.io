import React from 'react';
import { POSTS, readTime } from '../lib/posts';
import { postHref } from '../lib/router';
import { TerminalSection, Label } from './ui/Terminal';
import { Reveal } from './ui/Reveal';
import { ArrowRight } from 'lucide-react';

const RECENT = 3;

export const Blog = () => {
  const recent = POSTS.slice(0, RECENT);

  return (
    <TerminalSection
      id="blog"
      command="dir flash:/posts/"
      meta={`${POSTS.length} file${POSTS.length === 1 ? '' : 's'}`}
      className="bg-grid-panel/40"
    >
      {recent.length === 0 ? (
        <p className="font-mono text-xs text-neon-dim">
          No posts indexed. Add a markdown file under <span className="text-neon">content/posts/</span>.
        </p>
      ) : (
        <>
          <div className="border-t border-neon-line max-w-4xl">
            {recent.map((post, i) => (
              <PostRow key={post.slug} post={post} index={i} />
            ))}
          </div>

          {POSTS.length > RECENT && (
            <a
              href="#/blog"
              className="inline-flex items-center gap-2 mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim hover:text-neon transition-colors"
            >
              all {POSTS.length} posts <ArrowRight size={12} />
            </a>
          )}
        </>
      )}
    </TerminalSection>
  );
};

const PostRow = ({
  post,
  index,
}: {
  post: (typeof POSTS)[number];
  index: number;
}) => (
  <Reveal width="100%" delay={Math.min(index * 0.05, 0.2)}>
    <a
      href={postHref(post.slug)}
      className="group block border-b border-neon-line py-4 hover:bg-neon/[0.03] transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
        <span className="font-mono text-[11px] text-neon-dim tabular-nums shrink-0 md:w-28">
          {post.date}
        </span>
        <h3 className="font-mono text-sm text-neon-bright group-hover:text-neon transition-colors flex-1">
          {post.title}
        </h3>
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
          {post.tags.map(tag => (
            <Label key={tag}>#{tag}</Label>
          ))}
        </div>
      )}
    </a>
  </Reveal>
);
