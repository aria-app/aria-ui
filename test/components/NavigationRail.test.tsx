import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/NavigationRail.stories';

const { Default } = composeStories(stories);

describe('NavigationRail', () => {
  test('should allow selecting an item', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.click(screen.getByText('Likes'));

    expect(handleValueChange).toHaveBeenCalledWith('likes', expect.any(Object));
  });

  test('should still allow selecting a selected item', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.click(screen.getByText('Home'));

    expect(handleValueChange).toHaveBeenCalledWith('home', expect.any(Object));
  });
});
