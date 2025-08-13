import { FC, memo, PropsWithChildren } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { appColors } from '@/components/design-system/colorTypes';
import { appRadius } from '@/components/design-system/radiusTypes';
import { appSpacing } from '@/components/design-system/spacingTypes';

export type PlaceListItemAvatarProps = PropsWithChildren;

const PlaceListItemAvatar: FC<PlaceListItemAvatarProps> = ({ children }) => {
  return (
    <ImageBackground
      style={placeListItemAvatarStyles.background}
      imageStyle={placeListItemAvatarStyles.image}
      source={require('../../../../../assets/bg/city-place-bg.png')}
    >
      <View style={placeListItemAvatarStyles.content}>{children}</View>
    </ImageBackground>
  );
};

const placeListItemAvatarStyles = StyleSheet.create({
  background: {
    backgroundColor: appColors.neutral300,
    height: '75%',
    width: '100%',
    borderTopLeftRadius: appRadius.rounded,
    borderTopRightRadius: appRadius.rounded,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: appRadius.rounded,
    borderTopRightRadius: appRadius.rounded,
  },
  content: {
    paddingTop: appSpacing.xxs2,
    paddingRight: appSpacing.xxs2,
  },
});

export default memo(PlaceListItemAvatar);
