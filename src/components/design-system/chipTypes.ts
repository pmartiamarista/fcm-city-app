import { StyleSheet } from 'react-native';

import { appColors } from './colorTypes';
import { appRadius } from './radiusTypes';
import { appShadows } from './shadowTypes';
import { appSpacing } from './spacingTypes';

const chipStyles = StyleSheet.create({
  container: {
    minHeight: 30,
    minWidth: 30,
    borderRadius: appRadius.rounded,
    paddingVertical: appSpacing.xxs3,
    paddingHorizontal: appSpacing.xxs2,
    justifyContent: 'center',
  },
  elevated: {
    backgroundColor: appColors.neutral50,
    ...appShadows.shadow100,
  },
});

export { chipStyles };
