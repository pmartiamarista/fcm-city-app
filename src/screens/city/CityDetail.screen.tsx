import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelectedCity } from '@/hooks/city/useSelectedCity';
import useAppNavigation from '@/hooks/navigation/useAppNavigation';
import useAppRouting from '@/hooks/navigation/useAppRouting';

import { appSpacing } from '@/components/design-system/spacingTypes';
import ErrorMessage from '@/components/ErrorMessage';
import IconButton from '@/components/icon-button/IconButton';
import LabelValueRow from '@/components/LabelValueRow';
import PlaceList from '@/components/list/place/PlaceList';
import IconButtonSkeleton from '@/components/skeleton/IconButtonSkeleton';
import TypographyBodySkeleton from '@/components/skeleton/TypographyBodySkeleton';
import TypographyHeadingSkeleton from '@/components/skeleton/TypographyHeadingSkeleton';
import TypographyBody from '@/components/typography/TypographyBody';
import TypographyHeading from '@/components/typography/TypographyHeading';

import ImageHeader from '@/layout/ImageHeader';
import RoundedContainer from '@/layout/RoundedContainer';

const image = require('../../../assets/bg/city-bg.png');

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
              {isLoading && <IconButtonSkeleton />}
              {isLoaded && <IconButton icon='arrowLeft' onPress={goBack} />}
              <View
                style={{
                  gap: appSpacing.xxs3,
                  justifyContent: 'center',
                }}
              >
                {isLoading && (
                  <>
                    <TypographyHeadingSkeleton
                      style={styles.headingSkeleton}
                      size='h2'
                    />
                    <TypographyBodySkeleton
                      style={styles.headingSkeleton}
                      size='lg'
                    />
                  </>
                )}
                {isLoaded && (
                  <>
                    <TypographyHeading textColor='neutral50' size='h2'>
                      {item?.name}
                    </TypographyHeading>
                    <TypographyBody textColor='neutral300' size='lg'>
                      {item?.nativeName}
                    </TypographyBody>
                  </>
                )}
              </View>
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
          {isLoaded && (
            <View style={{ gap: appSpacing.xxs3 }}>
              {Boolean(item?.currency) && (
                <LabelValueRow label='Currency' value={item?.currency} />
              )}
              {Boolean(item?.language) && (
                <LabelValueRow label='Language' value={item?.language} />
              )}
            </View>
          )}
          {!!item && <PlaceList entity={item} />}
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
