import Image from 'next/image';
import { FC } from 'react';

import { ClippedImageProps } from './ClippedImage.interface';

export const ClippedImage: FC<ClippedImageProps> = ({
  src,
  alt,
  width,
  height,
  borderRadiusTopLeft = 'full',
  borderRadiusTopRight = 'full',
  borderRadiusBottomRight = 'full',
  borderRadiusBottomLeft = 'full',
  borderRadius,
  ...rest
}) => {
  const corners = {
    borderRadiusTopLeft: borderRadius ?? borderRadiusTopLeft,
    borderRadiusTopRight: borderRadius ?? borderRadiusTopRight,
    borderRadiusBottomRight: borderRadius ?? borderRadiusBottomRight,
    borderRadiusBottomLeft: borderRadius ?? borderRadiusBottomLeft,
  };

  return (
    <Image
      src={src}
      width={width}
      height={height}
      {...rest}
      style={{
        borderTopLeftRadius: `var(--image-radius-${corners.borderRadiusTopLeft})`,
        borderTopRightRadius: `var(--image-radius-${corners.borderRadiusTopRight})`,
        borderBottomRightRadius: `var(--image-radius-${corners.borderRadiusBottomRight})`,
        borderBottomLeftRadius: `var(--image-radius-${corners.borderRadiusBottomLeft})`,
        ...rest.style,
      }}
      alt={alt}
    />
  );
};
