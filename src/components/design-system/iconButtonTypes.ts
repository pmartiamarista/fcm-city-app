import { StyleSheet } from 'react-native';

import { appColors } from './colorsTypes';
import { appShadows } from './shadowTypes';

const iconButtonStyles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevated: {
    backgroundColor: appColors.neutral100,
    ...appShadows.shadow300,
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.6,
    ...appShadows.shadow100,
  },
});
export { iconButtonStyles };
