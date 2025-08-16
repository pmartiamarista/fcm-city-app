import { FC } from 'react';
import { View } from 'react-native';

import Skeleton from '@/components/skeleton/Skeleton';

import { placeListItemStyles } from '../place-list.types';

const PlaceListItemSkeleton: FC = () => {
  return (
    <View style={placeListItemStyles.container}>
      <Skeleton style={placeListItemStyles.container} />
    </View>
  );
};

export default PlaceListItemSkeleton;
