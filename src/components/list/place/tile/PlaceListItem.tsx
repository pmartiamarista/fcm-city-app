import { memo } from 'react';
import { ListRenderItem, View } from 'react-native';

import { appSpacing } from '@/components/design-system/spacingTypes';
import TypographyBody from '@/components/typography/TypographyBody';

import { GetCityPlaceQuery } from '@/graphql/__generated__/graphql';

export type PlaceListItemType = NonNullable<
  GetCityPlaceQuery['allPlaces']
>[number];

const PlaceListItem: ListRenderItem<PlaceListItemType> = ({ item }) => {
  return (
    <View>
      <View
        style={{
          flexShrink: 1,
          width: '100%',
          justifyContent: 'center',
          paddingHorizontal: appSpacing.xxs2,
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <TypographyBody>{item?.place.name}</TypographyBody>
        </View>
      </View>
    </View>
  );
};

export default memo(PlaceListItem);
