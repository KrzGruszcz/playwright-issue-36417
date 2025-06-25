import fs from 'fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { BlogPostMetadata } from '@/models';

import {
  getAllTopicsForBlog,
  getHomepageBlogPosts,
  getLatestBlogPosts,
  getSeoData,
} from '../blog';

vi.mock('@/content/blog/metadata.json', () => ({
  default: {
    homepagePlacement: [
      { position: 'main', id: null },
      { position: 'rightTop', id: null },
    ],
  },
}));

vi.mock('fs');

const mockPosts: BlogPostMetadata[] = [
  {
    id: '1',
    hash: '1',
    title: 'Understanding TypeScript',
    subtitle: 'A deep dive into the types and syntax of TypeScript',
    headerImage: { src: '/images/typescript.jpg', alt: 'TypeScript Logo' },
    thumbnailImage: { src: '/images/typescript.jpg', alt: 'TypeScript Logo' },
    topics: ['typescript', 'javascript', 'programming'],
    publishDate: '2025-02-18',
    createDate: '2025-02-10',
    readingTime: '8 min',
  },
  {
    id: '2',
    hash: '2',
    title: 'Introduction to Next.js',
    subtitle: 'Building fast and scalable web applications with Next.js',
    headerImage: { src: '/images/nextjs.jpg', alt: 'Next.js Logo' },
    thumbnailImage: { src: '/images/nextjs.jpg', alt: 'Next.js Logo' },
    topics: ['next.js', 'react', 'web'],
    publishDate: '2025-02-15',
    createDate: '2025-02-05',
    readingTime: '12 min',
  },
  {
    id: '3',
    hash: '3',
    title: 'CSS Grid Layouts',
    subtitle: 'Mastering modern web layouts with CSS Grid',
    headerImage: { src: '/images/css-grid.jpg', alt: 'CSS Grid' },
    thumbnailImage: { src: '/images/css-grid.jpg', alt: 'CSS Grid' },
    topics: ['css', 'design', 'frontend'],
    publishDate: '2025-02-12',
    createDate: '2025-02-01',
    readingTime: '10 min',
  },
];

vi.mock('@/utils//markdownContentUtils', () => {
  return {
    getAllMdxIds: vi.fn(() => mockPosts),
    getJSONById: vi.fn((_, id) => mockPosts.find((post) => post.id === id)),
  };
});

const mockSortedPostsByDate = [...mockPosts].sort(
  (a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
);

const mockSeoData = {
  tech: { title: 'Technology Blog Posts' },
};

describe('getLatestBlogPosts', () => {
  it('returns the latest posts sorted by date', () => {
    const result = getLatestBlogPosts(mockPosts);

    expect(result).toEqual([
      mockSortedPostsByDate[0],
      mockSortedPostsByDate[1],
      mockSortedPostsByDate[2],
    ]);
  });
});

describe('getHomepageBlogPosts', () => {
  it('assigns latest post when homepagePlacement has id:null', () => {
    const result = getHomepageBlogPosts(mockPosts);

    expect(result).toEqual({
      main: mockSortedPostsByDate[0],
      rightTop: mockSortedPostsByDate[1],
    });
  });

  it('returns blog posts mapped by homepage placement', () => {
    const [mainPost, rightTopPost] = mockPosts;

    vi.doMock('@/content/blog/metadata.json', () => ({
      default: {
        homepagePlacement: [
          { position: 'main', id: mainPost.id },
          { position: 'rightTop', id: rightTopPost.id },
        ],
      },
    }));

    const result = getHomepageBlogPosts(mockPosts);
    expect(result).toEqual({
      main: mainPost,
      rightTop: rightTopPost,
    });
  });
});

describe('getAllTopicsForBlog', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unmock('@/content/blog-topics/metadata.json');
  });

  it('returns all topics mapped with id and label', () => {
    vi.mock('@/content/blog-topics/metadata.json', () => ({
      default: {
        tech: { label: 'Technology' },
        design: { label: 'Design' },
        typescript: { label: 'TypeScript' },
      },
    }));

    const result = getAllTopicsForBlog();

    expect(result).toEqual([
      { id: 'design', label: 'Design' },
      { id: 'typescript', label: 'TypeScript' },
    ]);
  });
});

describe('getSeoData', () => {
  it('returns SEO metadata for a given topic id', () => {
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockSeoData));

    const result = getSeoData({ topicId: 'tech' });
    expect(result).toEqual({ title: 'Technology Blog Posts' });
  });

  it('returns undefined if the id is not found', () => {
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({}));
    const result = getSeoData({ topicId: 'nonexistent' });
    expect(result).toBeUndefined();
  });
});
