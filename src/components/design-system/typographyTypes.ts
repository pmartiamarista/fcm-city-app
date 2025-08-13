import { StyleSheet, TextProps, TextStyle } from 'react-native';

import { AppColor, appColors } from './colorTypes';

import { SizeGeneric } from '@/types/generics';

export const typographyDefaultProps: TextProps = {
  allowFontScaling: true,
  maxFontSizeMultiplier: 1.5,
  minimumFontScale: 1,
};

export const typographyStyles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    color: appColors.mainDeepBlue400,
  },
  disabled: {
    opacity: 0.4,
  },
});

export const textDefaultColor = 'mainDeepBlue700';

export type FontWeight = 'rg' | 'md';

export const fontFamilyByWeight: Record<FontWeight, string> = {
  rg: 'SyneRegular',
  md: 'SyneMedium',
};

export interface DefaultFontType<T> extends Partial<SizeGeneric<T>> {
  weight?: FontWeight;
  textColor?: AppColor;
  noLineHeight?: boolean;
  isLink?: boolean;
}

// BODY
export type BodySize = 'xs' | 'sm' | 'md' | 'lg';

export const bodyStylesBySize: Record<BodySize, TextStyle> = {
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  md: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
};

// HEADING
export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export const headingStylesBySize: Record<HeadingSize, TextStyle> = {
  h1: { fontSize: 36, lineHeight: 44 },
  h2: { fontSize: 32, lineHeight: 38 },
  h3: { fontSize: 28, lineHeight: 36 },
  h4: { fontSize: 24, lineHeight: 32 },
  h5: { fontSize: 20, lineHeight: 28 },
};

export const defaultTypographyStyles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    color: appColors.mainDeepBlue400,
  },
  disabled: {
    opacity: 0.4,
  },
});
