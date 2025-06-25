import { ImageType } from '@/models';

export interface BlogPostCardProps {
  href: string;
  image: ImageType;
  title: string;
  subtitle: string;
  size: 's' | 'm' | 'l';
}
