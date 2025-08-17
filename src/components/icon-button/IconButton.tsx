import { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import { iconButtonStyles } from '../design-system/icon-button.types';
import IconWrapper, { IconWrapperProps } from '../IconWrapper';

interface IconButtonProps
  extends PressableProps,
    Pick<IconWrapperProps, 'icon'> {}

const IconButton: FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <Pressable {...props} renderToHardwareTextureAndroid>
      {({ pressed }) => (
        <View
          style={[
            iconButtonStyles.button,
            iconButtonStyles.elevated,
            pressed && iconButtonStyles.pressed,
          ]}
        >
          <IconWrapper icon={icon} color='mainDeepBlue500' />
        </View>
      )}
    </Pressable>
  );
};

export default IconButton;
