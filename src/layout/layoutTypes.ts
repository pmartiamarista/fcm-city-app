import { StyleSheet } from 'react-native';

import { appColors } from '@/components/design-system/colorTypes';
import { appSpacing } from '@/components/design-system/spacingTypes';

const roundedContainerRadius = 52;

const roundedContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: -roundedContainerRadius,
    borderTopLeftRadius: roundedContainerRadius,
    borderTopRightRadius: roundedContainerRadius,
    borderStartStartRadius: roundedContainerRadius,
    borderStartEndRadius: roundedContainerRadius,
    borderRadius: roundedContainerRadius,
    gap: appSpacing.sm,
    backgroundColor: appColors.neutral50,
  },
});

export { roundedContainerRadius, roundedContainerStyles };
