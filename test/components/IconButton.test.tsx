import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/IconButton.stories';

const { Default, Disabled } = composeStories(stories);

describe('IconButton', () => {
  test('should allow clicking by default', () => {
    const handleClick = jest.fn();

    render(<Default onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not allow clicking when disabled', () => {
    const handleClick = jest.fn();

    render(<Disabled onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
