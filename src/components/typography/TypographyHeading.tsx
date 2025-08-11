import React, { FC, memo } from 'react';
import { Text, TextProps } from 'react-native';

import { appColors } from '../design-system/colorsTypes';
import {
  DefaultFontType,
  defaultTypographyStyles,
  fontFamilyByWeight,
  HeadingSize,
  headingStylesBySize,
  textDefaultColor,
  typographyDefaultProps,
} from '../design-system/typographyTypes';

export interface TypographyHeadingProps
  extends TextProps,
    DefaultFontType<HeadingSize> {}

const TypographyHeading: FC<TypographyHeadingProps> = memo(
  ({
    size = 'h1',
    weight = 'rg',
    style,
    textColor = textDefaultColor,
    noLineHeight,
    isLink,
    disabled,
    ...props
  }) => {
    return (
      <Text
        {...typographyDefaultProps}
        {...props}
        style={[
          { color: appColors[textColor] },
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
