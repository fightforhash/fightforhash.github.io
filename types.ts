
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  projectUrl?: string;
  imageUrl: string;
  status?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string[];
}

export interface Publication {
  id: string;
  title: string;
  conference: string;
  description: string;
  link: string;
  image?: string;
}

export interface BlogPost {
  /** URL segment — from frontmatter `slug`, else derived from the filename. */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) — from frontmatter `date`, else the filename prefix. */
  date: string;
  excerpt: string;
  tags: string[];
  /** Raw markdown body, rendered by BlogPostView. */
  body: string;
  cover?: string;
}
