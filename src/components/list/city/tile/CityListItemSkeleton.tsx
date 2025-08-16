import { FC } from 'react';

import Skeleton from '@/components/skeleton/Skeleton';

import { cityListTileStyles } from '../city-list.types';

const CityListItemSkeleton: FC = () => {
  return <Skeleton style={cityListTileStyles.container} />;
};

export default CityListItemSkeleton;
