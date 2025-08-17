import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { appColors } from '@/components/design-system/color.types';
import { appRadius } from '@/components/design-system/radius.types';
import { appShadows } from '@/components/design-system/shadow.types';

import { cityListTileStyles } from '../city-list.types';

const avatarSize =
  cityListTileStyles.container.height -
  (cityListTileStyles.container.padding || 0) * 2;

const CityListItemAvatar: FC = () => {
  return (
    <Image
      style={[cityListItemStyles.container]}
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
