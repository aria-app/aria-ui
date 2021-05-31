import React from 'react';

import { Text } from '../../src';
import { render, screen } from '../../src/testUtils';

describe('Text', () => {
  test('should contain passed text', () => {
    render(<Text>Some Text</Text>);

    expect(screen.getByText('Some Text')).toBeDefined();
  });

  test('should have the correct color', () => {
    render(<Text>Some Text</Text>);
    const style = window.getComputedStyle(screen.getByText('Some Text'));

    expect(style.color).toBe('rgb(51, 51, 51)');
  });
});
