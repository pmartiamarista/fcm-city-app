import { FC, memo } from 'react';
import { Text, TextProps } from 'react-native';

import { appColors } from '../design-system/colors';
import { appThemeMode } from '../design-system/theme';
import {
  BodySize,
  bodyStylesBySize,
  DefaultFontType,
  defaultTypographyStyles,
  fontFamilyByWeight,
  typographyColorByMode,
  typographyDefaultProps,
} from '../design-system/typography';

export interface TypographyBodyProps
  extends TextProps,
    DefaultFontType<BodySize> {}

const TypographyBody: FC<TypographyBodyProps> = memo(
  ({
    size = 'md',
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
          style,
          {
            fontSize: bodyStylesBySize[size].fontSize,
            fontFamily: fontFamilyByWeight[weight],
          },
          {
            ...(!noLineHeight
              ? { lineHeight: bodyStylesBySize[size].lineHeight }
              : {}),
            ...(isLink ? defaultTypographyStyles.link : {}),
            ...(disabled ? defaultTypographyStyles.disabled : {}),
          },
        ]}
      />
    );
  },
);

export default TypographyBody;
