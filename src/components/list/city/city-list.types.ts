import { StyleSheet } from 'react-native';

import { appColors } from '@/components/design-system/color.types';
import { appRadius } from '@/components/design-system/radius.types';
import { appShadows } from '@/components/design-system/shadow.types';
import { appSpacing } from '@/components/design-system/spacing.types';

export const cityListTileStyles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: appRadius.rounded,
    width: '100%',
    padding: appSpacing.xxs2,
  },
  innerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: appSpacing.xxs2,
    backgroundColor: appColors.neutral100,
    ...appShadows.shadow300,
  },
  avatarPressed: {
    backgroundColor: appColors.neutral200,
  },
  innerContainerPressed: {
    backgroundColor: appColors.neutral200,
    ...appShadows.shadow100,
  },
});
