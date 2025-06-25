import fs from 'fs';
import path from 'path';

import topicsMetadataJSON from '@/content/blog-topics/metadata.json' assert { type: "json" };
import blogMetadataJSON from '@/content/blog/metadata.json' assert { type: "json" };
import { BlogPostMetadata, SEOMetadata } from '@/models';
import { getAllMdxIds, getJSONById } from '@/utils//markdownContentUtils';

const blockedPosts = process.env.NEXT_PUBLIC_BLOCKED_POSTS?.split(',') || [];

export const getLatestBlogPosts = (posts: BlogPostMetadata[], count = 3) => {
  return posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    )
    .slice(0, count);
};

export const getHomepageBlogPosts = (
  posts: BlogPostMetadata[],
): Record<string, BlogPostMetadata> => {
  const latestPosts = getLatestBlogPosts(posts);
  const { homepagePlacement } = blogMetadataJSON;
  const postMap = Object.fromEntries(posts.map((post) => [post.id, post]));

  return homepagePlacement.reduce<Record<string, BlogPostMetadata>>(
    (acc, { position, id }, index) => {
      acc[position] = postMap[id] || latestPosts[index];
      return acc;
    },
    {},
  );
};

export const getAllTopicsForBlog = () => {
  const activeTopics = getAllBlogPosts().reduce<Record<string, string>>(
    (prev: Record<string, string>, curr: BlogPostMetadata) => {
      const topics = curr.topics.reduce(
        (prev, curr) => ({ ...prev, [curr]: curr }),
        {},
      );

      return { ...prev, ...topics };
    },
    {},
  );

  return Object.entries(topicsMetadataJSON)
    .map(([key, value]) => ({
      id: key,
      label: value.label,
    }))
    .filter(({ id }) => Object.keys(activeTopics).includes(id));
};

export const getSeoData = ({ topicId }: { topicId: string }) => {
  try {
    const jsonDirectory = path.join(
      process.cwd(),
      'src/content/',
      'blog-topics',
    );

    const fullPath = path.join(jsonDirectory, 'metadata.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    return JSON.parse(fileContents)[topicId] as SEOMetadata;
  } catch (error) {
    console.error(`Error reading JSON from blog-topics`, error);
    return {} as SEOMetadata;
  }
};

export const formatDate = (dateString: string, locale = 'en-GB') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getAllBlogPosts = () => {
  return getAllMdxIds('blog')
    .filter(({ id }) => !blockedPosts.includes(id))
    .map(({ id }) => getJSONById('blog', id));
};

export const getAllBlogPostIds = (): Array<string> => {
  return getAllBlogPosts().map(({ id }) => id);
};
