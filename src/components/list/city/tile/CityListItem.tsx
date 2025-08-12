import { memo, useCallback } from 'react';
import { ListRenderItem, Pressable, View } from 'react-native';

import useAppNavigation from '@/hooks/navigation/useAppNavigation';

import { appSpacing } from '@/components/design-system/spacingTypes';
import IconWrapper from '@/components/IconWrapper';

import { GetCitiesQuery } from '@/graphql/__generated__/graphql';

import CitiesListItemAvatar from './CityListItemAvatar';
import CitiesListItemHeader from './CityListItemHeader';
import CitiesListItemSubheader from './CityListItemSubheader';
import { cityListTileStyles } from '../cityListTypes';

export type CityListItemType = NonNullable<GetCitiesQuery['allCities']>[number];

const CityListItem: ListRenderItem<CityListItemType> = ({ item }) => {
  const navigation = useAppNavigation();

  const onPressTile = useCallback(() => {
    if (item) {
      navigation.navigate('CityDetail', { id: item?.id });
    }
  }, [item, navigation]);

  return (
    <Pressable onPress={onPressTile}>
      {({ pressed }) => {
        return (
          <View
            style={[
              cityListTileStyles.container,
              cityListTileStyles.innerContainer,
              pressed ? cityListTileStyles.innerContainerPressed : {},
            ]}
          >
            <CitiesListItemAvatar />
            <View
              style={{
                flexShrink: 1,
                width: '100%',
                justifyContent: 'center',
                paddingHorizontal: appSpacing.xxs2,
              }}
            >
              <CitiesListItemHeader>{item?.name}</CitiesListItemHeader>
              <View style={{ flexShrink: 1 }}>
                <CitiesListItemSubheader>
                  {item?.nativeName}
                </CitiesListItemSubheader>
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <IconWrapper icon='arrowRight' color='mainDeepBlue700' />
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};

export default memo(CityListItem);
