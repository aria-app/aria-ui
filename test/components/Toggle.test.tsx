import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Toggle.stories';

const { Default, Disabled } = composeStories(stories);

describe('Toggle', () => {
  test('should toggle when clicked', () => {
    const handleIsCheckedChange = jest.fn();

    render(<Default onIsCheckedChange={handleIsCheckedChange} />);

    userEvent.click(screen.getByRole('checkbox'));

    expect(handleIsCheckedChange).toHaveBeenCalledWith(
      false,
      expect.any(Object),
    );
  });

  test('should not allow toggling when disabled', () => {
    const handleIsCheckedChange = jest.fn();

    render(<Disabled onIsCheckedChange={handleIsCheckedChange} />);

    userEvent.click(screen.getByRole('checkbox'));

    expect(handleIsCheckedChange).not.toHaveBeenCalled();
  });
});
