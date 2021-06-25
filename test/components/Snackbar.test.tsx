import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Snackbar.stories';

const { Default } = composeStories(stories);

describe('Snackbar', () => {
  test('should trigger dismiss action when dismiss button is pressed', () => {
    const handleDismiss = jest.fn();

    render(<Default onDismiss={handleDismiss} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleDismiss).toHaveBeenCalled();
  });
});
