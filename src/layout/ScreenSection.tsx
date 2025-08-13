import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import { appSpacing } from '@/components/design-system/spacingTypes';
import TypographyHeading from '@/components/typography/TypographyHeading';

import { LabelGeneric } from '@/types/generics';

interface ScreenSectionProps
  extends PropsWithChildren,
    LabelGeneric<string>,
    Pick<ViewProps, 'style'> {}

const ScreenSection: FC<ScreenSectionProps> = ({ children, label, style }) => {
  return (
    <View style={[{ flexDirection: 'column', gap: appSpacing.xxs2 }, style]}>
      <View style={{ paddingHorizontal: appSpacing.sm3 }}>
        <TypographyHeading size='h4' textColor='mainDeepBlue700'>
          {label}
        </TypographyHeading>
      </View>
      {children}
    </View>
  );
};

export default ScreenSection;
