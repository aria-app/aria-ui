import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Chip.stories';

const { Default } = composeStories(stories);

describe('Chip', () => {
  test('should toggle when clicked', () => {
    const handleOnDelete = jest.fn();

    render(<Default onDelete={handleOnDelete} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleOnDelete).toHaveBeenCalledWith(expect.anything());
  });
});
