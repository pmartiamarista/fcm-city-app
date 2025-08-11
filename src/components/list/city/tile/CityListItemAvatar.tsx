import { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { appColors } from '@/components/design-system/colors';
import { appRadius } from '@/components/design-system/radiusTypes';
import { appShadows } from '@/components/design-system/shadowTypes';
import IconCity from '@/components/icons/IconCity';

import { cityListTileStyles } from '../cityListTypes';

const avatarSize =
  cityListTileStyles.container.height -
  (cityListTileStyles.container.padding || 0) * 2;

type CityListItemAvatarProps = ViewProps;

const CityListItemAvatar: FC<CityListItemAvatarProps> = (props) => {
  return (
    <View style={[cityListItemStyles.container, props.style]}>
      <IconCity fill={appColors.mainDeepBlue700} width={50} height={50} />
    </View>
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
