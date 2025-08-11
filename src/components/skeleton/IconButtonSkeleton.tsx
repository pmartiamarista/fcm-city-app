import { FC, memo } from 'react';

import Skeleton, { SkeletonProps } from './Skeleton';
import { iconButtonStyles } from '../design-system/iconButtonTypes';

type IconButtonSkeletonProps = Pick<SkeletonProps, 'style'>;

const IconButtonSkeleton: FC<IconButtonSkeletonProps> = memo(({ style }) => {
  return <Skeleton style={[iconButtonStyles.button, style]} />;
});

export default IconButtonSkeleton;
