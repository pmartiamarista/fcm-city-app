import { memo } from 'react';
import { View } from 'react-native';

import TypographyBody from '../typography/TypographyBody';

const ListEmptyMessage = () => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
        },
      ]}
    >
      <TypographyBody weight='md' size='md'>
        Oops! There's nothing in this list yet.
      </TypographyBody>
    </View>
  );
};

export default memo(ListEmptyMessage);
