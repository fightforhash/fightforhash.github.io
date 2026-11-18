import React from 'react';
import { PUBLICATIONS } from '../../constants';
import { RackUnit, Tape } from './parts';

/** Conference work, shown the way posters end up in a lab: on a display, with the talk's label. */
export const PosterBoard: React.FC<{ start: number }> = ({ start }) => (
  <RackUnit id="publications" start={start} units={4} bodyClassName="px-5 md:px-8 py-5">
    {/* `show tech-support` in the console navigates here. */}
    <span id="automation" className="block scroll-mt-[92px]" aria-hidden="true" />
    <div className="mb-5">
      <span className="silk text-[14px] text-[var(--ink-soft)]">display panel, portrait</span>
      <h2 className="silk text-[28px] leading-none text-[var(--ink)] mt-1">Presented</h2>
    </div>

    {PUBLICATIONS.map(p => (
      <article key={p.id} className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
        {p.image && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1b1d20] p-[8px] rounded-[2px] max-w-[220px]"
          >
            <span className="block aspect-[3/4] overflow-hidden bg-black">
              <img src={p.image} alt={`Poster: ${p.title}`} className="w-full h-full object-cover" loading="lazy" />
            </span>
          </a>
        )}
        <div className="min-w-0">
          <Tape tilt={-0.6}>{p.conference}</Tape>
          <h3 className="silk mt-3 text-[24px] leading-tight text-[var(--ink)] max-w-[36ch]">{p.title}</h3>
          <p className="mt-3 max-w-[64ch] text-[15.5px] leading-[1.6] text-[var(--ink)]">{p.description}</p>
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-panel mt-5">
            View the poster
          </a>
        </div>
      </article>
    ))}
  </RackUnit>
);
