import React from 'react';
import { POSTS } from '../../lib/posts';
import { postHref } from '../../lib/router';
import { RackUnit, StatusLed } from './parts';

const SLOTS = 6;

/** Writing as an LTO library: each post is a labelled cartridge. */
export const TapeLibrary: React.FC<{ start: number }> = ({ start }) => {
  const posts = POSTS.slice(0, SLOTS);

  return (
    <RackUnit id="blog" start={start} units={3} variant="black" bodyClassName="px-5 md:px-8 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <div>
          <span className="silk text-[14px] opacity-70">tape library, {SLOTS} slots</span>
          <h2 className="silk text-[28px] leading-none text-[#eef0f2] mt-1">Writing</h2>
        </div>
        <div className="flex items-center gap-5">
          <StatusLed name="ready" />
          <a href="#/blog" className="btn-panel btn-panel--dark">
            All posts
          </a>
        </div>
      </div>

      <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: SLOTS }, (_, i) => {
          const post = posts[i];
          if (!post) {
            return (
              <li key={i} aria-hidden="true" className="h-[118px] rounded-[2px] bg-[#1b1d20] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]" />
            );
          }
          return (
            <li key={post.slug}>
              <a
                href={postHref(post.slug)}
                className="group flex flex-col h-[118px] rounded-[2px] p-2 bg-gradient-to-b from-[#24426e] to-[#172c4b] shadow-[0_2px_0_#0d1a2e] motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform"
              >
                <span className="tape whitespace-normal text-[12.5px] leading-tight !text-left line-clamp-3">
                  {post.title}
                </span>
                <span className="mt-auto silk text-[12px] text-[#b9c8de]">{post.date}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </RackUnit>
  );
};
