import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Select.stories';

const { Default } = composeStories(stories);

describe('Select', () => {
  test('should allow value changing', () => {
    const handleValueChange = jest.fn();

    render(<Default onValueChange={handleValueChange} />);

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByText('Option 1'),
    );

    expect(handleValueChange).toHaveBeenCalledWith(1, expect.anything());
  });
});
