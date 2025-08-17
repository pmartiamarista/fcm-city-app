import { FC, memo } from 'react';

import Skeleton, { SkeletonProps } from './Skeleton';
import { headingStylesBySize } from '../design-system/typography.types';
import { TypographyHeadingProps } from '../typography/TypographyHeading';

type TypographyHeadingSkeletonProps = Pick<TypographyHeadingProps, 'size'> &
  Pick<SkeletonProps, 'style'>;

const TypographyHeadingSkeleton: FC<TypographyHeadingSkeletonProps> = memo(
  ({ size = 'h1', style }) => {
    return (
      <Skeleton
        style={[
          {
            width: 100,
            height: headingStylesBySize[size].lineHeight || 12,
          },
          style,
        ]}
      />
    );
  },
);

export default TypographyHeadingSkeleton;
