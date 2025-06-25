import Link from 'next/link';
import type { FC } from 'react';

import { ArrowUpRight } from '../../../components/icons';
import { generateClassNames } from '../../../utils/generateClassNames';
import { t } from '../../../utils/i18nMock';

import { ClippedImage } from '../ClippedImage';
import type { BlogPostCardProps } from './BlogPostCard.interface';

export const BlogPostCard: FC<BlogPostCardProps> = ({
  href,
  image,
  title,
  subtitle,
  size,
}) => {
  return (
    <Link
      href={href}
      className="focusable-card group flex h-full flex-col justify-between">
      <ClippedImage
        src={image.src}
        alt={image.alt}
        className="aspect-[5/3] object-cover"
        borderRadiusBottomLeft="l"
        width={895}
        height={492}
      />
      <div
        className="flex h-full flex-col justify-between gap-[var(--size-Size-04)]
          p-[var(--size-Size-06)]">
        <div className="space-y-[var(--size-Size-04)]">
          {(size === 'm' || size === 's') && (
            <h3 className="text-md">{title}</h3>
          )}
          {size === 'l' && <h2 className="text-xl">{title}</h2>}
          <p
            className={generateClassNames('text-[var(--fg-secondary)]', {
              'line-clamp-2 h-[46px] text-wrap text-xs': size === 's',
              'line-clamp-4 h-[92px] text-wrap text-xs': size === 'm',
              'text-sm': size === 'l',
            })}>
            {subtitle}
          </p>
        </div>
        <p className="flex items-center gap-[var(--size-Size-01)] group-hover:underline">
          {t('Read full article')}
          <ArrowUpRight className="scale-[var(--arrow-icon-scale)]" />
        </p>
      </div>
    </Link>
  );
};

export default BlogPostCard;
