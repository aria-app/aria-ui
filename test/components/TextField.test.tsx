import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/TextField.stories';

const { Default, Disabled, WithEndIcon, WithStartIcon } = composeStories(
  stories,
);

describe('TextField', () => {
  test('should allow text entry by default', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.type(screen.getByRole('textbox'), '!');

    expect(handleValueChange).toHaveBeenCalledWith(
      `${Default.args?.value}!`,
      expect.any(Object),
    );
  });

  test('should not allow text entry when disabled', () => {
    const handleValueChange = jest.fn();

    render(<Disabled onValueChange={handleValueChange} />);

    userEvent.type(screen.getByRole('textbox'), 'S');

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  test('should handle end icon clicking', () => {
    const handleEndIconClick = jest.fn();

    render(<WithEndIcon onEndIconClick={handleEndIconClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleEndIconClick).toHaveBeenCalledWith(expect.any(Object));
  });

  test('should handle start icon clicking', () => {
    const handleStartIconClick = jest.fn();

    render(<WithStartIcon onStartIconClick={handleStartIconClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleStartIconClick).toHaveBeenCalledWith(expect.any(Object));
  });
});
