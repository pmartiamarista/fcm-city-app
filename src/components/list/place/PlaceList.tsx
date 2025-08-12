import { FC, useEffect } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

import { useSelectedCityPlace } from '@/hooks/city/useSelectedCityPlace';

import { appSpacing } from '@/components/design-system/spacingTypes';
import ErrorMessage from '@/components/ErrorMessage';

import { City } from '@/graphql/__generated__/graphql';

import PlaceListItem, { PlaceListItemType } from './tile/PlaceListItem';
import CityListItemSkeletons from '../city/tile/CityListItemSkeletons';
import ListEmptyMessage from '../ListEmptyMessage';
import ListSeparator from '../ListSeparator';
import { listDefaultProps } from '../listTypes';

import { ItemGeneric } from '@/types/generics';

const List = FlatList<PlaceListItemType>;

type PlaceListProps = Pick<
  FlatListProps<PlaceListItemType>,
  'style' | 'contentContainerStyle'
> &
  ItemGeneric<Pick<City, 'id' | 'key'>>;

const PlaceList: FC<PlaceListProps> = ({
  style,
  contentContainerStyle,
  item,
}) => {
  const {
    state: { list, isLoading, hasError, isEmpty, isLoaded },
    actions: { loadCityPlace },
  } = useSelectedCityPlace({ id: item.id, key: item.key });

  useEffect(() => {
    void loadCityPlace();
  }, [loadCityPlace]);

  if (hasError) {
    return (
      <View style={placeListStyles.container}>
        <ErrorMessage retryAction={loadCityPlace} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={[
          placeListStyles.container,
          { justifyContent: 'flex-start' },
          style,
        ]}
      >
        <CityListItemSkeletons />
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={placeListStyles.container}>
        <ListEmptyMessage />
      </View>
    );
  }

  if (isLoaded) {
    return (
      <List
        horizontal
        data={list}
        extraData={list}
        keyExtractor={(_, index) => String(index)}
        renderItem={(props) => <PlaceListItem {...props} />}
        style={style}
        contentContainerStyle={[contentContainerStyle]}
        ItemSeparatorComponent={ListSeparator}
        {...listDefaultProps}
      />
    );
  }
};

export default PlaceList;

const placeListStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: appSpacing.xxs2,
    flexShrink: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
