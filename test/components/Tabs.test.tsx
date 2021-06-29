import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Tabs.stories';

const { Default, WithDisabled } = composeStories(stories);

describe('Tabs', () => {
  test('should allow switching tabs', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('tab')[1]);

    expect(handleValueChange).toHaveBeenCalledWith('b', expect.any(Object));
  });

  test('should not allow switching to a disabled tab', () => {
    const handleValueChange = jest.fn();

    render(<WithDisabled onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('tab')[1]);

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  test('should not allow switching to a selected tab', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.click(screen.getAllByRole('tab')[0]);

    expect(handleValueChange).not.toHaveBeenCalled();
  });
});
