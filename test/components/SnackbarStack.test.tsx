import React from 'react';

import { SnackbarStack } from '../../src';
import { fireEvent, render, screen } from '../../src/testUtils';

describe('SnackbarStack', () => {
  test('should render snackbars with messages from items', () => {
    render(
      <SnackbarStack
        items={[
          { id: 0, message: 'testMessage1', status: 'success' },
          { id: 1, message: 'testMessage2', status: 'success' },
        ]}
      />,
    );

    expect(screen.getByText('testMessage1')).not.toBeNull();
    expect(screen.getByText('testMessage2')).not.toBeNull();
  });
  test('should accept mouse events when not disabled', () => {
    const handleItemsChange = jest.fn();

    render(
      <SnackbarStack
        items={[
          { id: 0, message: 'testMessage1', status: 'success' },
          { id: 1, message: 'testMessage2', status: 'success' },
        ]}
        onItemsChange={handleItemsChange}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(handleItemsChange).toHaveBeenCalled();
  });
});
