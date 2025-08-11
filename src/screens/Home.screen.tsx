import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appSpacing } from '@/components/design-system/spacingTypes';
import CityList from '@/components/list/city/CityList';

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={{ flexShrink: 1, paddingTop: top }}>
      <CityList
        contentContainerStyle={{
          paddingBottom: bottom || appSpacing.sm3,
        }}
      />
    </View>
  );
}
