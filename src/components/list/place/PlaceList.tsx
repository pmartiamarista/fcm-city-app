import { FC, useEffect } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

import { useSelectedCityPlace } from '@/hooks/city/useSelectedCityPlace';

import { appSpacing } from '@/components/design-system/spacing.types';
import ErrorMessage from '@/components/ErrorMessage';

import { City } from '@/graphql/__generated__/graphql';

import { placeListItemStyles } from './place-list.types';
import PlaceListItem, { PlaceListItemType } from './tile/PlaceListItem';
import PlaceListItemSkeletons from './tile/PlaceListItemSkeletons';
import { listDefaultProps } from '../list.types';
import ListEmptyMessage from '../ListEmptyMessage';
import ListSeparator from '../ListSeparator';

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
          { justifyContent: 'flex-start', flexDirection: 'row' },
          contentContainerStyle,
          style,
        ]}
      >
        <PlaceListItemSkeletons />
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
        style={[{ minHeight: placeListItemStyles.container.height }, style]}
        contentContainerStyle={[
          { paddingBottom: appSpacing.xxs3 },
          contentContainerStyle,
        ]}
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
    minHeight: placeListItemStyles.container.height,
  },
});
