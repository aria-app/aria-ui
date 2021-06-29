import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/NavigationRail.stories';

const { Default } = composeStories(stories);

describe('NavigationRail', () => {
  test('should allow selecting an item', () => {
    const handleSelectedNameChange = jest.fn();

    render(<Default onSelectedNameChange={handleSelectedNameChange} />);

    userEvent.click(screen.getByText('Likes'));

    expect(handleSelectedNameChange).toHaveBeenCalledWith(
      'likes',
      expect.any(Object),
    );
  });

  test('should not allow selecting a selected item', () => {
    const handleSelectedNameChange = jest.fn();

    render(<Default onSelectedNameChange={handleSelectedNameChange} />);

    userEvent.click(screen.getByText('Home'));

    expect(handleSelectedNameChange).not.toHaveBeenCalled();
  });
});
