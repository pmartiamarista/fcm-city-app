import { memo } from 'react';

import TypographyBody from './typography/TypographyBody';

type LabelValueRowProps = {
  label: string;
  value?: string | number | null;
};

const LabelValueRow = ({ label, value }: LabelValueRowProps) => {
  return (
    <TypographyBody weight='md' size='md'>
      <TypographyBody size='lg' weight='md'>
        {label}
        {': '}
      </TypographyBody>
      {value ?? '—'}
    </TypographyBody>
  );
};

export default memo(LabelValueRow);
