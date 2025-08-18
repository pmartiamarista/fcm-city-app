import { FC, memo } from 'react';

import PlaceListItemSkeleton from './PlaceListItemSkeleton';

const PlaceListItemSkeletons: FC = () => {
  return Array.from({ length: 5 }).map((_, index) => {
    return <PlaceListItemSkeleton key={index} />;
  });
};

export default memo(PlaceListItemSkeletons);
