import { FC } from 'react';

import TypographyBody, {
  TypographyBodyProps,
} from '@/components/typography/TypographyBody';

const CityListItemHeader: FC<TypographyBodyProps> = (props) => {
  return (
    <TypographyBody
      {...props}
      numberOfLines={2}
      size='lg'
      weight='md'
      textColor='neutral500'
    />
  );
};

export default CityListItemHeader;
