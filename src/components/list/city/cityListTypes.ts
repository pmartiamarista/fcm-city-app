import { StyleSheet } from 'react-native';

import { appColors } from '@/components/design-system/colors';
import { appRadius } from '@/components/design-system/radiusTypes';
import { appShadows } from '@/components/design-system/shadowTypes';
import { appSpacing } from '@/components/design-system/spacingTypes';

export const cityListTileStyles = StyleSheet.create({
  container: {
    borderRadius: appRadius.rounded,
    height: 100,
    width: '100%',
    padding: appSpacing.xxs2,
  },
  innerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: appSpacing.xxs2,
    backgroundColor: appColors.neutral200,
    ...appShadows.shadow300,
  },
  avatarPressed: {
    backgroundColor: appColors.neutral200,
  },
  innerContainerPressed: {
    backgroundColor: appColors.neutral100,
    ...appShadows.shadow100,
  },
});
