import { render } from '@testing-library/react-native';
import React from 'react';
import { TextStyle } from 'react-native';

import TypographyHeading from './TypographyHeading';
import { appColors } from '../design-system/colorTypes';
import {
  defaultTypographyStyles,
  fontFamilyByWeight,
  headingStylesBySize,
  textDefaultColor,
} from '../design-system/typographyTypes';

describe('TypographyHeading', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TypographyHeading>Default Heading</TypographyHeading>,
    );
    const text = getByText('Default Heading');

    const mergedStyle = Object.assign({}, ...text.props.style);

    expect(mergedStyle).toEqual(
      expect.objectContaining({
        color: appColors[textDefaultColor],
        fontSize: headingStylesBySize.h1.fontSize,
        fontWeight: fontFamilyByWeight.rg,
        lineHeight: headingStylesBySize.h1.lineHeight,
      }),
    );
  });

  it('applies custom size and weight', () => {
    const { getByText } = render(
      <TypographyHeading size='h3' weight='md'>
        Custom Heading
      </TypographyHeading>,
    );
    const text = getByText('Custom Heading');

    const mergedStyle = Object.assign({}, ...text.props.style);

    expect(mergedStyle).toEqual(
      expect.objectContaining({
        fontSize: headingStylesBySize.h3.fontSize,
        fontWeight: fontFamilyByWeight.md,
        lineHeight: headingStylesBySize.h3.lineHeight,
      }),
    );
  });

  it('applies custom textColor', () => {
    const { getByText } = render(
      <TypographyHeading textColor='neutral100'>
        Colored Heading
      </TypographyHeading>,
    );
    const text = getByText('Colored Heading');

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: appColors.neutral100 }),
      ]),
    );
  });

  it('disables lineHeight when noLineHeight is true', () => {
    const { getByText } = render(
      <TypographyHeading noLineHeight>Flat Heading</TypographyHeading>,
    );
    const text = getByText('Flat Heading');

    const lineHeightStyle = text.props.style
      .filter(Boolean)
      .find((s: TextStyle) => s.lineHeight !== undefined);
    expect(lineHeightStyle).toBeUndefined();
  });

  it('applies link style when isLink is true', () => {
    const { getByText } = render(
      <TypographyHeading isLink>Link Heading</TypographyHeading>,
    );
    const text = getByText('Link Heading');

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(defaultTypographyStyles.link),
      ]),
    );
  });

  it('applies disabled style when disabled is true', () => {
    const { getByText } = render(
      <TypographyHeading disabled>Disabled Heading</TypographyHeading>,
    );
    const text = getByText('Disabled Heading');

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(defaultTypographyStyles.disabled),
      ]),
    );
  });

  it('merges custom style prop', () => {
    const customStyle = { marginBottom: 12 };
    const { getByText } = render(
      <TypographyHeading style={customStyle}>Styled Heading</TypographyHeading>,
    );
    const text = getByText('Styled Heading');

    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('respects allowFontScaling prop', () => {
    const { getByText } = render(
      <TypographyHeading allowFontScaling={false}>
        Scaled Heading
      </TypographyHeading>,
    );
    const text = getByText('Scaled Heading');

    expect(text.props.allowFontScaling).toBe(false);
  });

  it('applies accessibilityRole and accessibilityLabel', () => {
    const { getByText } = render(
      <TypographyHeading
        accessibilityRole='header'
        accessibilityLabel='Main Title'
      >
        Accessible Heading
      </TypographyHeading>,
    );
    const text = getByText('Accessible Heading');

    expect(text.props.accessibilityRole).toBe('header');
    expect(text.props.accessibilityLabel).toBe('Main Title');
  });

  const sizes: (keyof typeof headingStylesBySize)[] = ['h1', 'h2', 'h3', 'h4'];
  sizes.forEach((size) => {
    it(`applies correct fontSize for size="${size}"`, () => {
      const { getByText } = render(
        <TypographyHeading size={size}>Size Test</TypographyHeading>,
      );
      const text = getByText('Size Test');

      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: headingStylesBySize[size].fontSize,
          }),
        ]),
      );
    });
  });

  const weights: (keyof typeof fontFamilyByWeight)[] = ['rg', 'md'];
  weights.forEach((weight) => {
    it(`applies correct fontWeight for weight="${weight}"`, () => {
      const { getByText } = render(
        <TypographyHeading weight={weight}>Weight Test</TypographyHeading>,
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
