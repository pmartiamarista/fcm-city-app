import React, { FC, memo } from 'react';
import { Text, View, ViewProps } from 'react-native';

import { appColors } from './design-system/colorTypes';
import TypographyBody from './typography/TypographyBody';

export interface ErrorMessageProps extends Pick<ViewProps, 'style'> {
  retryAction?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ retryAction, style }) => {
  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <TypographyBody weight='md' size='md'>
        Something bad has happened
        {retryAction ? ', ' : ''}
        {Boolean(retryAction) && (
          <Text
            style={[
              {
                textDecorationLine: 'underline',
                color: appColors.mainDeepBlue400,
              },
            ]}
            onPress={retryAction}
          >
            Try again
          </Text>
        )}
      </TypographyBody>
    </View>
  );
};

export default memo(ErrorMessage);
