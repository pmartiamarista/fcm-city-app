import { FC, memo } from 'react';

import CityListItemSkeleton from './CityListItemSkeleton';

const CityListItemSkeletons: FC = () => {
  return Array.from({ length: 15 }).map((_, index) => {
    return <CityListItemSkeleton key={index} />;
  });
};

export default memo(CityListItemSkeletons);
