import { animated, useSpring } from '@react-spring/native';
import React, { ComponentProps } from 'react';

import { appColors } from '../design-system/colorTypes';
import { appRadius } from '../design-system/radiusTypes';

const AnimatedView = animated.View;

export interface SkeletonProps extends ComponentProps<typeof AnimatedView> {
  fadeDuration?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  fadeDuration = 450,
  style,
  children,
}) => {
  const [styles] = useSpring(() => ({
    from: { backgroundColor: appColors.neutral100 },
    to: async (next) => {
      while (true) {
        await next({ backgroundColor: appColors.neutral300 });
        await next({ backgroundColor: appColors.mainDeepBlue50 });
        await next({ backgroundColor: appColors.neutral300 });
        await next({ backgroundColor: appColors.neutral100 });
      }
    },
    config: { duration: fadeDuration },
    loop: true,
  }));

  return (
    <AnimatedView
      testID='skeleton'
      style={[
        { borderRadius: appRadius.rounded },
        style,
        { overflow: 'hidden' },
        styles,
      ]}
    >
      {children}
    </AnimatedView>
  );
};

export default Skeleton;
