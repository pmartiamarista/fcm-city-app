import { LinearGradient } from 'expo-linear-gradient';
import { FC } from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appGradientRgbColors } from '@/components/design-system/gradients.types';
import { appSpacing } from '@/components/design-system/spacing.types';
import Skeleton from '@/components/skeleton/Skeleton';

import { roundedContainerRadius } from './layout.types';

import { Statuses } from '@/types/types';

type ImageHeaderProps = ImageBackgroundProps & Pick<Statuses, 'isLoaded'>;

const ImageHeader: FC<ImageHeaderProps> = ({
  children,
  isLoaded,
  ...props
}) => {
  const { top } = useSafeAreaInsets();

  if (!isLoaded) {
    return <Skeleton style={styles.image} />;
  }

  return (
    <>
      <ImageBackground
        {...props}
        style={[styles.image, props.style]}
        resizeMode='cover'
      >
        <LinearGradient
          colors={[
            `rgba(${appGradientRgbColors.linearGradient180}, 1)`,
            `rgba(${appGradientRgbColors.linearGradient180}, 0.8)`,
            `rgba(${appGradientRgbColors.linearGradient180}, 0.25)`,
            `rgba(${appGradientRgbColors.linearGradient180}, 0)`,
            `rgba(${appGradientRgbColors.linearGradient180}, 0.25)`,
            `rgba(${appGradientRgbColors.linearGradient180}, 0.95)`,
            `rgba(${appGradientRgbColors.linearGradient180}, 1)`,
          ]}
          style={[
            styles.gradient,
            { paddingTop: top + appSpacing.xxs3 },
            props.style,
          ]}
        >
          {children}
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default ImageHeader;

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%',
    paddingHorizontal: appSpacing.sm3,
    paddingBottom: roundedContainerRadius + appSpacing.xxs3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
