import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/SnackbarStack.stories';

const { Default } = composeStories(stories);

describe('SnackbarStack', () => {
  test("should remove snackbar when that snackbar's dismiss button is pressed", () => {
    const handleItemsChange = jest.fn();

    render(
      <Default
        items={[
          { id: '0', message: 'testMessage1', status: 'success' },
          { id: '1', message: 'testMessage2', status: 'success' },
        ]}
        onItemsChange={handleItemsChange}
      />,
    );

    userEvent.click(screen.getAllByRole('button')[0]);

    expect(handleItemsChange).toHaveBeenCalled();
  });
});
