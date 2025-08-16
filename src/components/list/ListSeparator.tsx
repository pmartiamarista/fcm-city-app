import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { appSpacing } from '../design-system/spacing.types';

const ListSeparator = () => {
  return <View style={listSeparatorStyles.container} />;
};

export default memo(ListSeparator);

const listSeparatorStyles = StyleSheet.create({
  container: { height: appSpacing.xxs2, width: appSpacing.xxs2 },
});
