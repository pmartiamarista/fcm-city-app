import { FC, PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

import { roundedContainerStyles } from './layout.types';

type RoundedContainerProps = PropsWithChildren<ViewProps>;

const RoundedContainer: FC<RoundedContainerProps> = ({ style, children }) => {
  return (
    <View style={[roundedContainerStyles.container, style]}>{children}</View>
  );
};

export default RoundedContainer;
