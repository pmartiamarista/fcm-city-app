import { memo } from 'react';
import { ListRenderItem, Pressable, View } from 'react-native';

import { useMapLink } from '@/hooks/useMapLink';

import Chip from '@/components/chip/Chip';
import TypographyBody from '@/components/typography/TypographyBody';

import { GetCityPlaceQuery } from '@/graphql/__generated__/graphql';

import PlaceListItemAvatar from './PlaceListItemAvatar';
import { placeListItemStyles } from '../place-list.types';

export type PlaceListItemType = NonNullable<
  GetCityPlaceQuery['allPlaces']
>[number];

const PlaceListItem: ListRenderItem<PlaceListItemType> = ({ item }) => {
  const {
    actions: { openMap },
  } = useMapLink({ coordinates: item?.place.coordinates });

  return (
    <Pressable onPress={openMap}>
      {({ pressed }) => {
        return (
          <View
            style={[
              placeListItemStyles.container,
              placeListItemStyles.innerContainer,
              pressed ? placeListItemStyles.innerContainerPressed : {},
            ]}
          >
            <View style={placeListItemStyles.card}>
              <PlaceListItemAvatar>
                <Chip style={placeListItemStyles.chip}>
                  {item?.place?.type}
                </Chip>
              </PlaceListItemAvatar>
              <View style={placeListItemStyles.textWrapper}>
                <TypographyBody
                  size='sm'
                  weight='md'
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  style={placeListItemStyles.title}
                >
                  {item?.place.name}
                </TypographyBody>
              </View>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};

export default memo(PlaceListItem);
