import React, { FC, memo } from 'react';
import { Text, TextProps } from 'react-native';

import { appColors } from '../design-system/colors';
import { appThemeMode } from '../design-system/theme';
import {
  DefaultFontType,
  defaultTypographyStyles,
  fontFamilyByWeight,
  HeadingSize,
  headingStylesBySize,
  typographyColorByMode,
  typographyDefaultProps,
} from '../design-system/typography';

export interface TypographyHeadingProps
  extends TextProps,
    DefaultFontType<HeadingSize> {}

const TypographyHeading: FC<TypographyHeadingProps> = memo(
  ({
    size = 'h1',
    weight = 'rg',
    style,
    textColor,
    noLineHeight,
    isLink,
    disabled,
    ...props
  }) => {
    const themeMode = appThemeMode;
    const color = textColor
      ? appColors[textColor]
      : appColors[typographyColorByMode[themeMode]];

    return (
      <Text
        {...typographyDefaultProps}
        {...props}
        style={[
          { color },

          {
            fontSize: headingStylesBySize[size].fontSize,
            fontFamily: fontFamilyByWeight[weight],
          },
          style,
          {
            ...(!noLineHeight
              ? { lineHeight: headingStylesBySize[size].lineHeight }
              : {}),
            ...(isLink ? defaultTypographyStyles.link : {}),
            ...(disabled ? defaultTypographyStyles.disabled : {}),
          },
        ]}
      />
    );
  },
);

export default TypographyHeading;
