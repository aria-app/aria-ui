import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/RadioGroup.stories';

const { Default, Disabled, DisabledButton } = composeStories(stories);

describe('RadioGroup', () => {
  test('should change value to value of selected radio button', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('radio')[1]);

    expect(handleValueChange).toHaveBeenCalledWith('b', expect.anything());
  });

  test('should change value to value of button above selected button when the up arrow key is pressed', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} value="b" />);

    userEvent.type(screen.getByRole('radiogroup'), '{arrowup}');

    expect(handleValueChange).toHaveBeenCalledWith('a', expect.anything());
  });

  test('should change value to value of button below selected button when the down arrow key is pressed', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} value="b" />);

    userEvent.type(screen.getByRole('radiogroup'), '{arrowdown}');

    expect(handleValueChange).toHaveBeenCalledWith('c', expect.anything());
  });

  test('should change value to value of last button when there is no selected button and the up arrow key is pressed', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} value={undefined} />);

    userEvent.type(screen.getByRole('radiogroup'), '{arrowup}');

    expect(handleValueChange).toHaveBeenCalledWith('c', expect.anything());
  });

  test('should change value to value of first button when there is no selected button and the down arrow key is pressed', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} value={undefined} />);

    userEvent.type(screen.getByRole('radiogroup'), '{arrowdown}');

    expect(handleValueChange).toHaveBeenCalledWith('a', expect.anything());
  });

  test('should not change value when clicking selected radio button', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('radio')[0]);

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  test('should not change value when disabled', () => {
    const handleValueChange = jest.fn();

    render(<Disabled onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('radio')[1]);

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  test('should not change value when a disabled button is clicked', () => {
    const handleValueChange = jest.fn();

    render(<DisabledButton onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('radio')[2]);

    expect(handleValueChange).not.toHaveBeenCalled();
  });
});
