import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { appSpacing } from '@/components/design-system/spacingTypes';
import TypographyBody from '@/components/typography/TypographyBody';

interface ScreenSectionProps extends PropsWithChildren {
  header: string;
}

const ScreenSection: FC<ScreenSectionProps> = ({ children }) => {
  return (
    <View style={{ flexDirection: 'column', gap: appSpacing.xxs2 }}>
      <TypographyBody size='lg'></TypographyBody>
      {children}
    </View>
  );
};

export default ScreenSection;
