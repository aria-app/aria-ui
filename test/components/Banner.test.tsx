import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Banner.stories';

const { Default } = composeStories(stories);

describe('Banner', () => {
  test('should handle confirm click', () => {
    const handleConfirm = jest.fn();

    render(<Default onConfirm={handleConfirm} />);

    userEvent.click(screen.getByText('Confirm'));

    expect(handleConfirm).toHaveBeenCalledWith(expect.anything());
  });

  test('should handle dismiss click', () => {
    const handleDismiss = jest.fn();

    render(<Default onDismiss={handleDismiss} />);

    userEvent.click(screen.getByText('Dismiss'));

    expect(handleDismiss).toHaveBeenCalledWith(expect.anything());
  });
});
