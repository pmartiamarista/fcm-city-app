import { render } from '@testing-library/react-native';
import React from 'react';
import { TextStyle } from 'react-native';

import TypographyBody from './TypographyBody';
import { appColors } from '../design-system/colorsTypes';
import {
  bodyStylesBySize,
  defaultTypographyStyles,
  fontFamilyByWeight,
  textDefaultColor,
} from '../design-system/typographyTypes';

describe('TypographyBody', () => {
  it('renders with default props', () => {
    const { getByText } = render(<TypographyBody>Default Text</TypographyBody>);
    const text = getByText('Default Text');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: appColors[textDefaultColor],
        }),
        expect.objectContaining({ fontSize: bodyStylesBySize.md.fontSize }),
        expect.objectContaining({ fontFamily: fontFamilyByWeight.rg }),
        expect.objectContaining({ lineHeight: bodyStylesBySize.md.lineHeight }),
      ]),
    );
  });

  it('applies custom size and weight', () => {
    const { getByText } = render(
      <TypographyBody size='lg' weight='md'>
        Custom Style
      </TypographyBody>,
    );
    const text = getByText('Custom Style');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: bodyStylesBySize.lg.fontSize }),
        expect.objectContaining({ fontFamily: fontFamilyByWeight.md }),
        expect.objectContaining({ lineHeight: bodyStylesBySize.lg.lineHeight }),
      ]),
    );
  });

  it('applies custom textColor', () => {
    const { getByText } = render(
      <TypographyBody textColor='mainDeepBlue400'>Colored Text</TypographyBody>,
    );
    const text = getByText('Colored Text');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: appColors.mainDeepBlue400 }),
      ]),
    );
  });

  it('applies link style when isLink is true', () => {
    const { getByText } = render(
      <TypographyBody isLink>Link Text</TypographyBody>,
    );
    const text = getByText('Link Text');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining(defaultTypographyStyles.link),
      ]),
    );
  });

  it('applies disabled style when disabled is true', () => {
    const { getByText } = render(
      <TypographyBody disabled>Disabled Text</TypographyBody>,
    );
    const text = getByText('Disabled Text');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining(defaultTypographyStyles.disabled),
      ]),
    );
  });

  it('omits lineHeight when noLineHeight is true', () => {
    const { getByText } = render(
      <TypographyBody noLineHeight>Text Without LineHeight</TypographyBody>,
    );
    const text = getByText('Text Without LineHeight');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    const hasLineHeight = styles.some(
      (style) => style?.lineHeight === bodyStylesBySize.md.lineHeight,
    );

    expect(hasLineHeight).toBe(false);
  });
});
