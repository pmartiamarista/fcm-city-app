import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const IconArrowRight = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
      <Path d='M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z' />
    </Svg>
  );
};
export default memo(IconArrowRight);
