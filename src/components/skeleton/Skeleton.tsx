import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { appColors } from '../design-system/color.types';
import { appRadius } from '../design-system/radius.types';

export interface SkeletonProps extends ViewProps {
  fadeDuration?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  fadeDuration = 1000,
  style,
  children,
  ...props
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: fadeDuration }),
      -1,
      true,
    );
  }, [opacity, fadeDuration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: appColors.neutral200,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      testID='skeleton'
      style={[
        { borderRadius: appRadius.rounded },
        style,
        { overflow: 'hidden' },
        animatedStyle,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default Skeleton;
