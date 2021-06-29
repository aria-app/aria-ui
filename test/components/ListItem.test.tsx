import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/ListItem.stories';

const { WithEndIcon, WithStartIcon } = composeStories(stories);

describe('ListItem', () => {
  test('should handle end icon clicking', () => {
    const handleEndIconClick = jest.fn();

    render(<WithEndIcon onEndIconClick={handleEndIconClick} />);

    userEvent.click(screen.getAllByRole('button')[0]);

    expect(handleEndIconClick).toHaveBeenCalledWith(expect.any(Object));
  });

  test('should handle start icon clicking', () => {
    const handleStartIconClick = jest.fn();

    render(<WithStartIcon onStartIconClick={handleStartIconClick} />);

    userEvent.click(screen.getAllByRole('button')[0]);

    expect(handleStartIconClick).toHaveBeenCalledWith(expect.any(Object));
  });
});
