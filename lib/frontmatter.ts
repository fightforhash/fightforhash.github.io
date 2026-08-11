/**
 * Minimal YAML-ish frontmatter parser.
 *
 * gray-matter is deliberately avoided: it depends on Buffer and pulls a
 * Node shim into the browser bundle. Posts only need scalars and simple
 * inline arrays, which is a dozen lines of regex.
 */
export interface Frontmatter {
  data: Record<string, string | string[]>;
  body: string;
}

const stripQuotes = (s: string) => s.replace(/^["']|["']$/g, '');

export function parseFrontmatter(raw: string): Frontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string | string[]> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!kv) continue;

    const key = kv[1];
    const rawValue = kv[2].trim();

    if (/^\[.*\]$/.test(rawValue)) {
      data[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map(s => stripQuotes(s.trim()))
        .filter(Boolean);
    } else {
      data[key] = stripQuotes(rawValue);
    }
  }

  return { data, body: match[2] };
}
