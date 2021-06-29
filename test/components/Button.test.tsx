import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Button.stories';

const { Default, Disabled, Loading } = composeStories(stories);

describe('Button', () => {
  test('should allow clicking by default', () => {
    const handleClick = jest.fn();

    render(<Default onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  test('should not allow clicking when disabled', () => {
    const handleClick = jest.fn();

    render(<Disabled onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should not allow clicking when loading', () => {
    const handleClick = jest.fn();

    render(<Loading onClick={handleClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
