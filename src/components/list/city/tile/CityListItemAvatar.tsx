import { animated, useSpring } from '@react-spring/native';
import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { appColors } from '@/components/design-system/colors';
import { appRadius } from '@/components/design-system/radiusTypes';
import { appShadows } from '@/components/design-system/shadowTypes';

import { cityListTileStyles } from '../cityListTypes';

const avatarSize =
  cityListTileStyles.container.height -
  (cityListTileStyles.container.padding || 0) * 2;

const AnimatedImage = animated(Image);

const CityListItemAvatar: FC = () => {
  const springProps = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 15, duration: 1000 },
  });

  return (
    <AnimatedImage
      style={[cityListItemStyles.container, springProps]}
      source={require('../../../../../assets/bg/city-tile-bg.png')}
    />
  );
};

export default CityListItemAvatar;

const cityListItemStyles = StyleSheet.create({
  container: {
    height: avatarSize,
    width: avatarSize,
    backgroundColor: appColors.neutral300,
    borderRadius: appRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...appShadows.shadow100,
  },
});
