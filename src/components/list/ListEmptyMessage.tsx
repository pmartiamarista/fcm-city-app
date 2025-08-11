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
        ¡Ups! Esta lista está vacía por ahora.
      </TypographyBody>
    </View>
  );
};

export default memo(ListEmptyMessage);
