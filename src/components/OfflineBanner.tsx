import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appColors } from '@/components/design-system/color.types';
import { appSpacing } from '@/components/design-system/spacing.types';
import TypographyBody from '@/components/typography/TypographyBody';

interface OfflineBannerProps {
  isVisible: boolean;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ isVisible }) => {
  const { top } = useSafeAreaInsets();

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.content}>
        <TypographyBody textColor='neutral50' size='xs' style={styles.text}>
          You're offline. Some features may be limited.
        </TypographyBody>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: appColors.functionalSiena600,
  },
  content: {
    paddingHorizontal: appSpacing.sm3,
    paddingVertical: appSpacing.xxs2,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default OfflineBanner;
