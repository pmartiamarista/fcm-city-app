import { StyleSheet } from 'react-native';

import { appColors } from './color.types';
import { appRadius } from './radius.types';
import { appShadows } from './shadow.types';
import { appSpacing } from './spacing.types';

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
