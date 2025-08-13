import { FC, useEffect } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

import { useAllCities } from '@/hooks/city/useAllCities';

import { appSpacing } from '@/components/design-system/spacingTypes';
import ErrorMessage from '@/components/ErrorMessage';

import CityListItem, { CityListItemType } from './tile/CityListItem';
import CityListItemSkeletons from './tile/CityListItemSkeletons';
import ListEmptyMessage from '../ListEmptyMessage';
import ListSeparator from '../ListSeparator';
import { listDefaultProps } from '../listTypes';

const List = FlatList<CityListItemType>;

type CityListProps = Pick<
  FlatListProps<CityListItemType>,
  'style' | 'contentContainerStyle'
>;

const CityList: FC<CityListProps> = ({ style, contentContainerStyle }) => {
  const {
    state: { list, isLoading, hasError, isEmpty, isLoaded },
    actions: { loadAllCities },
  } = useAllCities();

  useEffect(() => {
    void loadAllCities();
  }, [loadAllCities]);

  if (hasError) {
    return (
      <View style={cityListStyles.container}>
        <ErrorMessage retryAction={loadAllCities} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={[
          cityListStyles.container,
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
      <View style={cityListStyles.container}>
        <ListEmptyMessage />
      </View>
    );
  }

  if (isLoaded) {
    return (
      <List
        data={list}
        extraData={list}
        keyExtractor={(item, index) => item?.id || String(index)}
        renderItem={(props) => <CityListItem {...props} />}
        style={style}
        contentContainerStyle={[
          { paddingHorizontal: appSpacing.sm3 },
          contentContainerStyle,
        ]}
        ItemSeparatorComponent={ListSeparator}
        {...listDefaultProps}
      />
    );
  }
};

export default CityList;

const cityListStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: appSpacing.xxs2,
    height: '100%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: appSpacing.sm3,
  },
});
