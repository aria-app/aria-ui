import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/NavigationItem.stories';

const { Default, Selected } = composeStories(stories);

describe('NavigationItem', () => {
  test('should allow selection by default', () => {
    const handleSelect = jest.fn();

    render(<Default onSelect={handleSelect} />);

    userEvent.click(screen.getByText('Profile'));

    expect(handleSelect).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
    );
    // expect(handleSelect).toHaveBeenCalledWith('profile', expect.any(Object));
  });

  test('should still allow selection when selected', () => {
    const handleSelect = jest.fn();

    render(<Selected onSelect={handleSelect} />);

    userEvent.click(screen.getByText('Profile'));

    expect(handleSelect).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
    );
    // expect(handleSelect).toHaveBeenCalledWith('profile', expect.any(Object));
  });
});
