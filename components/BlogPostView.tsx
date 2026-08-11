import React from 'react';
import { POSTS, getPost, readTime } from '../lib/posts';
import { postHref } from '../lib/router';
import { PromptLine, Label } from './ui/Terminal';
import { LazyMarkdown } from './ui/LazyMarkdown';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const BlogPostView = ({ slug }: { slug: string }) => {
  const post = getPost(slug);

  if (!post) return <NotFound slug={slug} />;

  const index = POSTS.findIndex(p => p.slug === slug);
  const newer = index > 0 ? POSTS[index - 1] : undefined;
  const older = index < POSTS.length - 1 ? POSTS[index + 1] : undefined;

  return (
    <article className="container mx-auto px-6 pt-28 pb-16 min-h-screen">
      <a
        href="#/blog"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim hover:text-neon transition-colors mb-6"
      >
        <ArrowLeft size={12} /> dir flash:/posts/
      </a>

      <PromptLine command={`more flash:/posts/${post.slug}.md`} />
      <div className="rule mt-3 mb-6" />

      <header className="max-w-3xl">
        <h1 className="font-mono text-lg md:text-xl font-semibold text-neon-bright glow leading-snug">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
          <Label>{post.date}</Label>
          <Label>{readTime(post.body)} min read</Label>
          {post.tags.map(tag => (
            <Label key={tag}>#{tag}</Label>
          ))}
        </div>
      </header>

      <div className="rule-flat mt-6 mb-8 max-w-3xl" />

      <LazyMarkdown>{post.body}</LazyMarkdown>

      {/* Prev / next */}
      {(newer || older) && (
        <nav className="mt-14 max-w-3xl">
          <div className="rule mb-4" />
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {older ? (
              <a
                href={postHref(older.slug)}
                className="group font-mono text-xs text-neon-dim hover:text-neon transition-colors max-w-[48%]"
              >
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em]">
                  <ArrowLeft size={11} /> older
                </span>
                <span className="block mt-1 text-neon-body group-hover:text-neon">
                  {older.title}
                </span>
              </a>
            ) : (
              <span />
            )}

            {newer && (
              <a
                href={postHref(newer.slug)}
                className="group font-mono text-xs text-neon-dim hover:text-neon transition-colors sm:text-right max-w-[48%] sm:ml-auto"
              >
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] sm:justify-end">
                  newer <ArrowRight size={11} />
                </span>
                <span className="block mt-1 text-neon-body group-hover:text-neon">
                  {newer.title}
                </span>
              </a>
            )}
          </div>
        </nav>
      )}
    </article>
  );
};

const NotFound = ({ slug }: { slug: string }) => (
  <div className="container mx-auto px-6 pt-28 pb-16 min-h-screen">
    <PromptLine command={`more flash:/posts/${slug}.md`} />
    <div className="rule mt-3 mb-6" />
    <p className="font-mono text-sm text-amber">
      % flash:/posts/{slug}.md: No such file or directory
    </p>
    <a
      href="#/blog"
      className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-dim hover:text-neon transition-colors"
    >
      <ArrowLeft size={12} /> dir flash:/posts/
    </a>
  </div>
);
