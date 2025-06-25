import { expect, test } from '@playwright/experimental-ct-react';

import { getAllBlogPostIds } from '@/utils/blog';
import { getJSONById } from '@/utils/markdownContentUtils';

import { BlogPostCard } from './BlogPostCard';

const blogPosts = getAllBlogPostIds().map((id) => getJSONById('blog', id));

const { thumbnailImage, id, title, subtitle } = blogPosts[0] || {};

test('renders BlogPostCard with size "s"', async ({ mount }) => {
  const component = await mount(
    <BlogPostCard
      image={thumbnailImage}
      href={`/blog/${id}`}
      title={title}
      subtitle={subtitle}
      size="m"
    />,
  );
  await expect(component).toBeVisible({timeout: 500});
});
