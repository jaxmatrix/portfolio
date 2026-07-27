import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, tagToSlug } from '../lib/blog';
import { siteUrl } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0]?.date;

  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      ...(newest ? { lastModified: new Date(`${newest}T00:00:00Z`) } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...getAllTags().map(({ tag }) => ({
      url: `${siteUrl}/blog/tag/${tagToSlug(tag)}`,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
  ];
}
