import { FC, memo } from 'react';

import Skeleton from '@/components/skeleton/Skeleton';

import { placeListItemStyles } from '../place-list.types';

const PlaceListItemSkeleton: FC = () => {
  return <Skeleton style={[placeListItemStyles.container]} />;
};

export default memo(PlaceListItemSkeleton);
