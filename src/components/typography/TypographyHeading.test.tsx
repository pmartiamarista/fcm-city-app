import { render } from '@testing-library/react-native';
import React from 'react';
import { TextStyle } from 'react-native';

import TypographyHeading from './TypographyHeading';
import { appColors } from '../design-system/colors';
import { appThemeMode } from '../design-system/theme';
import {
  defaultTypographyStyles,
  fontFamilyByWeight,
  headingStylesBySize,
  typographyColorByMode,
} from '../design-system/typography';

describe('TypographyHeading', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TypographyHeading>Default Heading</TypographyHeading>,
    );
    const text = getByText('Default Heading');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: appColors[typographyColorByMode[appThemeMode]],
        }),
        expect.objectContaining({ fontSize: headingStylesBySize.h1.fontSize }),
        expect.objectContaining({ fontFamily: fontFamilyByWeight.rg }),
        expect.objectContaining({
          lineHeight: headingStylesBySize.h1.lineHeight,
        }),
      ]),
    );
  });

  it('applies custom size and weight', () => {
    const { getByText } = render(
      <TypographyHeading size='h3' weight='md'>
        Custom Heading
      </TypographyHeading>,
    );
    const text = getByText('Custom Heading');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: headingStylesBySize.h3.fontSize }),
        expect.objectContaining({ fontFamily: fontFamilyByWeight.md }),
        expect.objectContaining({
          lineHeight: headingStylesBySize.h3.lineHeight,
        }),
      ]),
    );
  });

  it('applies custom textColor', () => {
    const { getByText } = render(
      <TypographyHeading textColor='mainDeepBlue400'>
        Colored Heading
      </TypographyHeading>,
    );
    const text = getByText('Colored Heading');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: appColors.mainDeepBlue400 }),
      ]),
    );
  });

  it('applies link style when isLink is true', () => {
    const { getByText } = render(
      <TypographyHeading isLink>Linked Heading</TypographyHeading>,
    );
    const text = getByText('Linked Heading');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
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
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining(defaultTypographyStyles.disabled),
      ]),
    );
  });

  it('omits lineHeight when noLineHeight is true', () => {
    const { getByText } = render(
      <TypographyHeading noLineHeight>
        Heading Without LineHeight
      </TypographyHeading>,
    );
    const text = getByText('Heading Without LineHeight');
    const styles = (text.props.style as TextStyle[]).filter(Boolean);

    const hasLineHeight = styles.some(
      (style) => style?.lineHeight === headingStylesBySize.h1.lineHeight,
    );

    expect(hasLineHeight).toBe(false);
  });
});
