import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Chip.stories';

const { Default } = composeStories(stories);

describe('Chip', () => {
  test('should toggle when clicked', () => {
    const handleDelete = jest.fn();

    render(<Default onDelete={handleDelete} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleDelete).toHaveBeenCalledWith(expect.any(Object));
  });
});
