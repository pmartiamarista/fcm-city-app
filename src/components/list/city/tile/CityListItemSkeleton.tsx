import { FC } from 'react';
import { View } from 'react-native';

import Skeleton from '@/components/skeleton/Skeleton';

import { cityListTileStyles } from '../city-list.types';

const CityListItemSkeleton: FC = () => {
  return (
    <View style={cityListTileStyles.container}>
      <Skeleton style={cityListTileStyles.container} />
    </View>
  );
};

export default CityListItemSkeleton;
