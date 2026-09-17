import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateDisplay: string;
  summary: string;
  tags: string[];
  readingMinutes: number;
  repo?: string;
  content: string;
  cover?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((file: string) => file.endsWith('.mdx') || file.endsWith('.md'));

  const posts = files
    .map((file: string) => {
      const slug = file.replace(/\.mdx?$/, '');
      const fullPath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const stats = readingTime(content);
      const dateStr = data.date ? (data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)) : '2026-08-01';

      return {
        slug,
        title: (data.title as string) || slug,
        date: dateStr,
        dateDisplay: new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        summary: (data.summary as string) || '',
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        readingMinutes: Math.ceil(stats.minutes),
        repo: data.repo as string | undefined,
        cover: data.cover as string | undefined,
        content,
      };
    })
    .sort((a: BlogPost, b: BlogPost) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
