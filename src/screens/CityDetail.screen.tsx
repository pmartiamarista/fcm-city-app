import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelectedCity } from '@/hooks/city/useSelectedCity';
import useAppNavigation from '@/hooks/navigation/useAppNavigation';
import useAppRouting from '@/hooks/navigation/useAppRouting';

import { appSpacing } from '@/components/design-system/spacingTypes';
import ErrorMessage from '@/components/ErrorMessage';
import IconButton from '@/components/icon-button/IconButton';
import IconButtonSkeleton from '@/components/skeleton/IconButtonSkeleton';
import TypographyBodySkeleton from '@/components/skeleton/TypographyBodySkeleton';
import TypographyHeadingSkeleton from '@/components/skeleton/TypographyHeadingSkeleton';
import TypographyHeading from '@/components/typography/TypographyHeading';

import ImageHeader from '@/layout/ImageHeader';
import RoundedContainer from '@/layout/RoundedContainer';

const image = require('../../assets/bg/city-bg.png');

export default function CityDetailScreen() {
  const { goBack } = useAppNavigation();
  const route = useAppRouting<'CityDetail'>();
  const { id } = route.params;
  const {
    state: { item, hasError, isLoaded, isLoading },
    actions: { loadCityById, clearSelectedCity },
  } = useSelectedCity({ id });

  useEffect(() => {
    void loadCityById();
    return () => {
      clearSelectedCity();
    };
  }, [clearSelectedCity, loadCityById]);

  return (
    <View style={styles.root}>
      <View style={styles.headerWrapper}>
        <ImageHeader source={image} isLoaded={isLoaded}>
          {!hasError && (
            <View style={styles.imageContent}>
              {isLoaded && <IconButton icon='arrowLeft' onPress={goBack} />}
              {isLoading && <IconButtonSkeleton />}
              {isLoaded && (
                <TypographyHeading textColor='neutral50'>
                  {item?.name}
                </TypographyHeading>
              )}
              {isLoading && (
                <TypographyHeadingSkeleton style={styles.headingSkeleton} />
              )}
            </View>
          )}
        </ImageHeader>
      </View>
      <RoundedContainer style={styles.container}>
        <View
          style={{
            paddingTop: appSpacing.sm2,
            paddingHorizontal: appSpacing.sm3,
          }}
        >
          {hasError && <ErrorMessage retryAction={loadCityById} />}
          {isLoading && (
            <View style={{ gap: appSpacing.sm3 }}>
              {[180, 140, 160, 190, 100].map((width, index) => {
                return <TypographyBodySkeleton key={index} style={{ width }} />;
              })}
            </View>
          )}
          {isLoaded && <View></View>}
        </View>
      </RoundedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerWrapper: {
    height: '45%',
  },
  imageContent: {
    height: '100%',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  headingSkeleton: {
    width: 120,
  },
  container: {
    height: '100%',
    width: '100%',
  },
});
