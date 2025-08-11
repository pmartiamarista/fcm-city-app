import { FC } from 'react';

import TypographyBody, {
  TypographyBodyProps,
} from '@/components/typography/TypographyBody';

const CityListItemSubheader: FC<TypographyBodyProps> = (props) => {
  return (
    <TypographyBody
      {...props}
      numberOfLines={2}
      textColor='neutral400'
      size='sm'
      weight='md'
    />
  );
};

export default CityListItemSubheader;
