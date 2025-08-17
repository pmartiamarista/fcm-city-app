import { StyleSheet } from 'react-native';

import { appColors } from '@/components/design-system/color.types';
import { appRadius } from '@/components/design-system/radius.types';
import { appShadows } from '@/components/design-system/shadow.types';
import { appSpacing } from '@/components/design-system/spacing.types';

const placeListItemStyles = StyleSheet.create({
  container: {
    height: 220,
    width: 170,
    borderRadius: appRadius.rounded,
  },
  innerContainer: {
    backgroundColor: appColors.neutral100,
    ...appShadows.shadow300,
  },
  card: {
    height: '100%',
    width: '100%',
    borderRadius: appRadius.rounded,
    padding: 2,
  },
  chip: {
    textTransform: 'capitalize',
  },
  textWrapper: {
    flexShrink: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: appSpacing.xxs2,
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  innerContainerPressed: {
    transform: [{ scale: 0.99 }],
    backgroundColor: appColors.neutral200,
    ...appShadows.shadow100,
  },
});

export { placeListItemStyles };
