import { FC, memo } from 'react';
import { View } from 'react-native';

import { chipStyles } from '../design-system/chip.types';
import TypographyBody, {
  TypographyBodyProps,
} from '../typography/TypographyBody';

export type ChipProps = TypographyBodyProps;

const Chip: FC<ChipProps> = (props) => {
  return (
    <View style={[chipStyles.container, chipStyles.elevated]}>
      <TypographyBody
        {...props}
        weight='md'
        size='xs'
        numberOfLines={1}
        ellipsizeMode='tail'
        noLineHeight
      />
    </View>
  );
};

export default memo(Chip);
