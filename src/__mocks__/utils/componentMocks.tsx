import React from 'react';
import { PressableProps, Text, View, ViewStyle } from 'react-native';

import { ChipProps } from '@/components/chip/Chip';
import {
  IconWrapperProps,
  IconWrapperProps as IconWrapperPropsType,
} from '@/components/IconWrapper';

interface IconButtonProps
  extends PressableProps,
    Pick<IconWrapperPropsType, 'icon'> {}

// Mock component prop interfaces
interface MockTypographyProps {
  children: React.ReactNode;
  style?: ViewStyle;
  [key: string]: unknown;
}

interface MockCityListItemProps {
  city: { name: string; nativeName: string };
  onPress?: () => void;
  [key: string]: unknown;
}

interface MockPlaceListItemProps {
  place: { place: { name: string; type: string } };
  onPress?: () => void;
  [key: string]: unknown;
}

interface MockSkeletonProps {
  style?: ViewStyle;
  [key: string]: unknown;
}

/**
 * Mock IconWrapper component for testing
 */
export const MockIconWrapper = ({
  icon,
  color: _color,
  size: _size,
  ...props
}: IconWrapperProps) => (
  <View testID={`${icon}-icon`} {...props}>
    <Text>{icon} Icon</Text>
  </View>
);

/**
 * Mock Chip component for testing
 */
export const MockChip = ({
  children,
  style,
  onPress: _onPress,
  ...props
}: ChipProps) => (
  <View testID='chip' style={style as ViewStyle} {...props}>
    <Text>{children}</Text>
  </View>
);

/**
 * Mock IconButton component for testing
 */
export const MockIconButton = ({
  icon,
  onPress: _onPress,
  style,
  ...props
}: IconButtonProps) => (
  <View testID='icon-button' style={style as ViewStyle} {...props}>
    <Text>{icon} Button</Text>
  </View>
);

/**
 * Mock TypographyBody component for testing
 */
export const MockTypographyBody = ({
  children,
  style,
  ...props
}: MockTypographyProps) => (
  <Text testID='typography-body' style={style} {...props}>
    {children}
  </Text>
);

/**
 * Mock TypographyHeading component for testing
 */
export const MockTypographyHeading = ({
  children,
  style,
  ...props
}: MockTypographyProps) => (
  <Text testID='typography-heading' style={style} {...props}>
    {children}
  </Text>
);

/**
 * Mock CityListItem component for testing
 */
export const MockCityListItem = ({
  city,
  onPress: _onPress,
  ...props
}: MockCityListItemProps) => (
  <View testID='city-list-item' {...props}>
    <Text>{city.name}</Text>
    <Text>{city.nativeName}</Text>
  </View>
);

/**
 * Mock PlaceListItem component for testing
 */
export const MockPlaceListItem = ({
  place,
  onPress: _onPress,
  ...props
}: MockPlaceListItemProps) => (
  <View testID='place-list-item' {...props}>
    <Text>{place.place.name}</Text>
    <Text>{place.place.type}</Text>
  </View>
);

/**
 * Mock Skeleton component for testing
 */
export const MockSkeleton = ({ style, ...props }: MockSkeletonProps) => (
  <View testID='skeleton' style={style} {...props}>
    <View style={{ width: 100, height: 20, backgroundColor: '#e0e0e0' }} />
  </View>
);

/**
 * Mock IconButtonSkeleton component for testing
 */
export const MockIconButtonSkeleton = ({
  style,
  ...props
}: MockSkeletonProps) => (
  <MockSkeleton testID='icon-button-skeleton' style={style} {...props} />
);

/**
 * Mock TypographyBodySkeleton component for testing
 */
export const MockTypographyBodySkeleton = ({
  style,
  ...props
}: MockSkeletonProps) => (
  <MockSkeleton testID='typography-body-skeleton' style={style} {...props} />
);

/**
 * Mock TypographyHeadingSkeleton component for testing
 */
export const MockTypographyHeadingSkeleton = ({
  style,
  ...props
}: MockSkeletonProps) => (
  <MockSkeleton testID='typography-heading-skeleton' style={style} {...props} />
);

/**
 * Mock CityListItemSkeleton component for testing
 */
export const MockCityListItemSkeleton = ({
  style,
  ...props
}: MockSkeletonProps) => (
  <View testID='city-list-item-skeleton' style={style} {...props}>
    <MockSkeleton style={{ width: 50, height: 50, borderRadius: 25 }} />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <MockTypographyHeadingSkeleton style={{ width: 120, height: 20 }} />
      <MockTypographyBodySkeleton
        style={{ width: 80, height: 16, marginTop: 4 }}
      />
    </View>
  </View>
);

/**
 * Mock PlaceListItemSkeleton component for testing
 */
export const MockPlaceListItemSkeleton = ({
  style,
  ...props
}: MockSkeletonProps) => (
  <View testID='place-list-item-skeleton' style={style} {...props}>
    <MockSkeleton style={{ width: 50, height: 50, borderRadius: 25 }} />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <MockSkeleton style={{ width: 150, height: 20 }} />
      <MockSkeleton style={{ width: 100, height: 16, marginTop: 4 }} />
    </View>
  </View>
);

/**
 * Mock OfflineBanner component for testing
 */
export const MockOfflineBanner = ({
  isVisible,
  ...props
}: {
  isVisible: boolean;
  [key: string]: unknown;
}) => {
  if (!isVisible) return null;

  return (
    <View testID='offline-banner' {...props}>
      <Text>You're offline. Some features may be limited.</Text>
    </View>
  );
};

/**
 * Mock ImageHeader component for testing
 */
export const MockImageHeader = ({
  imageSource: _imageSource,
  title,
  subtitle,
  ...props
}: {
  imageSource?: unknown;
  title?: string;
  subtitle?: string;
  [key: string]: unknown;
}) => (
  <View testID='image-header' {...props}>
    <View testID='header-image' style={{ width: '100%', height: 200 }} />
    <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{ color: 'white', fontSize: 16, marginTop: 4 }}>
          {subtitle}
        </Text>
      )}
    </View>
  </View>
);
