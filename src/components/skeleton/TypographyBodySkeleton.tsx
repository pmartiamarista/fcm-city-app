import { FC, memo } from 'react';

import Skeleton, { SkeletonProps } from './Skeleton';
import { bodyStylesBySize } from '../design-system/typographyTypes';
import { TypographyBodyProps } from '../typography/TypographyBody';

type TypographyBodySkeletonBodyProps = Pick<TypographyBodyProps, 'size'> &
  Pick<SkeletonProps, 'style'>;

const TypographyBodySkeleton: FC<TypographyBodySkeletonBodyProps> = memo(
  ({ size = 'xs', style }) => {
    return (
      <Skeleton
        style={[
          {
            width: 100,
            height: bodyStylesBySize[size].lineHeight || 12,
          },
          style,
        ]}
      />
    );
  },
);

export default TypographyBodySkeleton;
