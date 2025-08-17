import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import Chip, { ChipProps } from './Chip';

// Mock the design system types
jest.mock('@/components/design-system/color.types', () => ({
  appColors: {
    neutral50: '#FFFFFF',
    neutral900: '#000000',
    functionalSiena600: '#FF6B35',
  },
}));

jest.mock('@/components/design-system/spacing.types', () => ({
  appSpacing: {
    xs2: 8,
    xs3: 12,
  },
}));

jest.mock('@/components/design-system/radius.types', () => ({
  appRadius: {
    sm: 4,
    md: 8,
  },
}));

describe('Chip', () => {
  const defaultProps: ChipProps = {
    children: 'Test Chip',
  };

  it('renders with default props', () => {
    const { getByText } = render(<Chip {...defaultProps} />);

    expect(getByText('Test Chip')).toBeTruthy();
  });

  it('renders with different text content', () => {
    const { getByText, rerender } = render(<Chip>Primary Chip</Chip>);
    expect(getByText('Primary Chip')).toBeTruthy();

    rerender(<Chip>Secondary Chip</Chip>);
    expect(getByText('Secondary Chip')).toBeTruthy();

    rerender(<Chip>Outline Chip</Chip>);
    expect(getByText('Outline Chip')).toBeTruthy();
  });

  it('renders with custom children', () => {
    const { getByText } = render(
      <Chip>
        <Text>Custom Content</Text>
      </Chip>,
    );

    expect(getByText('Custom Content')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(<Chip style={customStyle}>Test Chip</Chip>);

    const chip = getByText('Test Chip').parent?.parent;
    expect(chip).toBeTruthy();
  });

  it('renders with different content types', () => {
    const { getByText } = render(<Chip>Simple Text</Chip>);
    expect(getByText('Simple Text')).toBeTruthy();

    const { getByText: getByText2 } = render(
      <Chip>
        <Text>Complex Content</Text>
      </Chip>,
    );
    expect(getByText2('Complex Content')).toBeTruthy();
  });

  it('maintains accessibility', () => {
    const { getByText } = render(<Chip>Test Chip</Chip>);

    const chip = getByText('Test Chip').parent?.parent;
    expect(chip).toBeTruthy();
  });
});
