import React from 'react';

import { Text } from '../src';
import { render, screen } from '../src/testUtils';

describe('Text', () => {
  test('should contain passed text', () => {
    render(<Text>Some Text</Text>);

    expect(screen.getByText('Some Text')).toBeDefined();
  });
});
