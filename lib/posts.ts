import { BlogPost } from '../types';
import { parseFrontmatter } from './frontmatter';

/**
 * Every markdown file under content/posts/ becomes a post at build time.
 * Writing a post is: add a file, commit. No CMS, no API.
 *
 * Filename convention: YYYY-MM-DD-slug.md
 */
const files = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FILENAME = /^(\d{4}-\d{2}-\d{2})-(.+)$/;

function toPost(path: string, raw: string): BlogPost {
  const filename = path.split('/').pop()!.replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(raw);

  const parsed = FILENAME.exec(filename);
  const fileDate = parsed?.[1] ?? '';
  const fileSlug = parsed?.[2] ?? filename;

  const asString = (v: string | string[] | undefined, fallback: string) =>
    typeof v === 'string' ? v : fallback;

  const tags = data.tags;

  return {
    slug: asString(data.slug, fileSlug),
    title: asString(data.title, fileSlug),
    date: asString(data.date, fileDate),
    excerpt: asString(data.excerpt, ''),
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    body: body.trim(),
    cover: typeof data.cover === 'string' ? data.cover : undefined,
  };
}

export const POSTS: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string): BlogPost | undefined =>
  POSTS.find(p => p.slug === slug);

export const ALL_TAGS: string[] = Array.from(
  new Set(POSTS.flatMap(p => p.tags))
).sort();

/** Rough read time — 200 wpm, CJK counted by character. */
export function readTime(body: string): number {
  const cjk = (body.match(/[ㄱ-힝一-鿿]/g) ?? []).length;
  const words = body.replace(/[ㄱ-힝一-鿿]/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200 + cjk / 500));
}
