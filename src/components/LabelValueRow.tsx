import { memo } from 'react';

import TypographyBody from './typography/TypographyBody';

import { LabelGeneric, ValueGeneric } from '@/types/generics';

type LabelValueRowProps = Partial<ValueGeneric<string | number>> &
  LabelGeneric<string>;

const LabelValueRow = ({ label, value }: LabelValueRowProps) => {
  return (
    <TypographyBody weight='md' size='md'>
      <TypographyBody size='md' weight='md'>
        {label}
        {': '}
      </TypographyBody>
      {value ?? '—'}
    </TypographyBody>
  );
};

export default memo(LabelValueRow);
