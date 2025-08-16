import { FC, memo } from 'react';

import PlaceListItemSkeleton from './PlaceListItemSkeleton';

const PlaceListItemSkeletons: FC = () => {
  return Array.from({ length: 4 }).map((_, index) => {
    return <PlaceListItemSkeleton key={index} />;
  });
};

export default memo(PlaceListItemSkeletons);
