import { render } from '@testing-library/react-native';
import React from 'react';
import { TextStyle } from 'react-native';

import TypographyBody from './TypographyBody';
import { appColors } from '../design-system/colorTypes';
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

    const mergedStyle = Object.assign({}, ...text.props.style);

    expect(mergedStyle).toEqual(
      expect.objectContaining({
        color: appColors[textDefaultColor],
        fontSize: bodyStylesBySize.md.fontSize,
        fontWeight: fontFamilyByWeight.rg,
        lineHeight: bodyStylesBySize.md.lineHeight,
      }),
    );
  });

  it('applies custom size and weight', () => {
    const { getByText } = render(
      <TypographyBody size='sm' weight='md'>
        Custom Size
      </TypographyBody>,
    );
    const text = getByText('Custom Size');

    const mergedStyle = Object.assign({}, ...text.props.style);

    expect(mergedStyle).toEqual(
      expect.objectContaining({
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20,
      }),
    );
  });

  it('applies custom textColor', () => {
    const { getByText } = render(
      <TypographyBody textColor='neutral100'>Colored Text</TypographyBody>,
    );
    const text = getByText('Colored Text');

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: appColors.neutral100 }),
      ]),
    );
  });

  it('disables lineHeight when noLineHeight is true', () => {
    const { getByText } = render(
      <TypographyBody noLineHeight>Flat Text</TypographyBody>,
    );
    const text = getByText('Flat Text');

    const lineHeightStyle = text.props.style
      .filter(Boolean)
      .find((s: TextStyle) => s.lineHeight !== undefined);
    expect(lineHeightStyle).toBeUndefined();

    expect(lineHeightStyle).toBeUndefined();
  });

  it('applies link style when isLink is true', () => {
    const { getByText } = render(
      <TypographyBody isLink>Link Text</TypographyBody>,
    );
    const text = getByText('Link Text');

    expect(text.props.style).toEqual(
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
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(defaultTypographyStyles.disabled),
      ]),
    );
  });

  it('merges custom style prop', () => {
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <TypographyBody style={customStyle}>Styled Text</TypographyBody>,
    );
    const text = getByText('Styled Text');

    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('respects allowFontScaling prop', () => {
    const { getByText } = render(
      <TypographyBody allowFontScaling={false}>Scaled Text</TypographyBody>,
    );
    const text = getByText('Scaled Text');

    expect(text.props.allowFontScaling).toBe(false);
  });

  it('applies accessibilityRole and accessibilityLabel', () => {
    const { getByText } = render(
      <TypographyBody accessibilityRole='header' accessibilityLabel='Title'>
        Accessible Header
      </TypographyBody>,
    );
    const text = getByText('Accessible Header');

    expect(text.props.accessibilityRole).toBe('header');
    expect(text.props.accessibilityLabel).toBe('Title');
  });

  const sizes: (keyof typeof bodyStylesBySize)[] = ['sm', 'md', 'lg'];
  sizes.forEach((size) => {
    it(`applies correct fontSize for size="${size}"`, () => {
      const { getByText } = render(
        <TypographyBody size={size}>Size Test</TypographyBody>,
      );
      const text = getByText('Size Test');

      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: bodyStylesBySize[size].fontSize,
          }),
        ]),
      );
    });
  });

  const weights: (keyof typeof fontFamilyByWeight)[] = ['rg', 'md'];
  weights.forEach((weight) => {
    it(`applies correct fontWeight for weight="${weight}"`, () => {
      const { getByText } = render(
        <TypographyBody weight={weight}>Weight Test</TypographyBody>,
      );
      const text = getByText('Weight Test');

      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontWeight: fontFamilyByWeight[weight],
          }),
        ]),
      );
    });
  });
});
