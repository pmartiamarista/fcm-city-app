import { render } from '@testing-library/react-native';
import React from 'react';

import IconWrapper from './IconWrapper';

describe('IconWrapper', () => {
  it('renders icon with default props', () => {
    const { UNSAFE_root } = render(<IconWrapper icon='city' />);

    // Check that the component renders without crashing
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders icon with custom color', () => {
    const { UNSAFE_root } = render(
      <IconWrapper icon='city' color='mainDeepBlue500' />,
    );

    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders icon with custom size', () => {
    const { UNSAFE_root } = render(<IconWrapper icon='city' size={32} />);

    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders icon with size 0', () => {
    const { UNSAFE_root } = render(<IconWrapper icon='city' size={0} />);

    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders icon with undefined size', () => {
    const { UNSAFE_root } = render(
      <IconWrapper icon='city' size={undefined} />,
    );

    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders icon with additional props', () => {
    const { UNSAFE_root } = render(
      <IconWrapper
        icon='city'
        testID='custom-icon'
        accessibilityLabel='City Icon'
      />,
    );

    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders different icons', () => {
    const { UNSAFE_root, rerender } = render(<IconWrapper icon='city' />);
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);

    rerender(<IconWrapper icon='arrowLeft' />);
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);

    rerender(<IconWrapper icon='arrowRight' />);
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });

  it('renders nothing when no icon is provided', () => {
    const { UNSAFE_root } = render(<IconWrapper />);

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it('renders nothing when icon is null', () => {
    const { UNSAFE_root } = render(<IconWrapper icon={null as never} />);

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it('renders nothing when icon is undefined', () => {
    const { UNSAFE_root } = render(<IconWrapper icon={undefined} />);

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it('renders nothing when icon is false', () => {
    const { UNSAFE_root } = render(<IconWrapper icon={false as never} />);

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it('renders nothing when icon is 0', () => {
    const { UNSAFE_root } = render(<IconWrapper icon={0 as never} />);

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it('applies conditional size logic correctly', () => {
    const { UNSAFE_root, rerender } = render(
      <IconWrapper icon='city' size={48} />,
    );
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);

    // Test with size 0 (falsy)
    rerender(<IconWrapper icon='city' size={0} />);
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);

    // Test with undefined size
    rerender(<IconWrapper icon='city' size={undefined} />);
    expect(UNSAFE_root.children.length).toBeGreaterThan(0);
  });
});
