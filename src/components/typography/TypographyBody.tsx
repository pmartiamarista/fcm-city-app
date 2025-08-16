import { FC, memo } from 'react';
import { Text, TextProps } from 'react-native';

import { appColors } from '../design-system/color.types';
import {
  BodySize,
  bodyStylesBySize,
  DefaultFontType,
  defaultTypographyStyles,
  fontFamilyByWeight,
  textDefaultColor,
  typographyDefaultProps,
} from '../design-system/typography.types';

export interface TypographyBodyProps
  extends TextProps,
    DefaultFontType<BodySize> {}

const TypographyBody: FC<TypographyBodyProps> = memo(
  ({
    size = 'md',
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
          ...(style ? [style] : []),
          {
            fontSize: bodyStylesBySize[size].fontSize,
            fontWeight: fontFamilyByWeight[weight],
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
