import { useEffect } from 'react';
import { View } from 'react-native';

import useAppRouting from '@/hooks/useAppRouting';
import { useSelectedCity } from '@/hooks/useSelectedCity';

import IconArrowRight from '@/components/icons/IconArrowRight';
import TypographyHeading from '@/components/typography/TypographyHeading';

import ImageHeader from '@/layout/ImageHeader';
import RoundedContainer from '@/layout/RoundedContainer';

import { RootStackParamList } from './App.navigator';

export default function CityDetailScreen() {
  const route = useAppRouting<RootStackParamList, 'CityDetail'>();
  const { id } = route.params;
  const {
    state: { item },
    actions: { loadCityById, clearSelectedCity },
  } = useSelectedCity({ id });

  useEffect(() => {
    void loadCityById();
    return () => {
      clearSelectedCity();
    };
  }, [loadCityById, clearSelectedCity]);

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ height: '45%' }}>
        <ImageHeader style={{}} source={require('../../assets/bg/city-bg.png')}>
          <View
            style={{
              height: '100%',
              flexShrink: 1,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ height: 48 }}>
              <IconArrowRight />
            </View>
            <TypographyHeading textColor='neutral50'>
              {item?.name}
            </TypographyHeading>
          </View>
        </ImageHeader>
      </View>
      <RoundedContainer
        style={{ height: '100%', width: '100%' }}
      ></RoundedContainer>
    </View>
  );
}
