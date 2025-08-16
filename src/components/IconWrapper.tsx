import { memo } from 'react';
import { SvgProps } from 'react-native-svg';

import { AppColorAttr, appColors } from './design-system/color.types';
import { AppIconAttr, appIcons } from './design-system/icon.types';

import { SizeGeneric } from '@/types/generics';

export interface IconWrapperProps
  extends Omit<SvgProps, 'ref' | 'color'>,
    Partial<AppColorAttr>,
    Partial<AppIconAttr>,
    Partial<SizeGeneric<number>> {}

export type IconPropsAttr = { iconProps?: Omit<IconWrapperProps, 'ref'> };

const IconWrapper = memo(
  ({
    color = 'mainDeepBlue700',
    icon,
    size = 24,
    ...props
  }: IconWrapperProps) => {
    const Icon = !!icon && appIcons?.[icon];

    if (Icon) {
      return (
        <Icon
          {...props}
          {...(size ? { width: size, height: size } : {})}
          fill={appColors[color]}
        />
      );
    }

    return <></>;
  },
);

export default IconWrapper;
