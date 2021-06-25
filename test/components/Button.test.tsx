import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Button.stories';

const { Default, Disabled, Loading } = composeStories(stories);

describe('Button', () => {
  test('should accept mouse events by default', () => {
    const handleClick = jest.fn();

    render(<Default onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not accept mouse events when disabled', () => {
    const handleClick = jest.fn();

    render(<Disabled onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should not accept mouse events when loading', () => {
    const handleClick = jest.fn();

    render(<Loading onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
