import type { ImageProps, StaticImageData } from 'next/image';

export type radiusSize = 'xs' | 's' | 'm' | 'l' | 'full';

export interface ClippedImageProps extends ImageProps {
  src: string | StaticImageData;
  alt: string;
  borderRadiusTopLeft?: radiusSize;
  borderRadiusTopRight?: radiusSize;
  borderRadiusBottomRight?: radiusSize;
  borderRadiusBottomLeft?: radiusSize;
  borderRadius?: radiusSize;
}
