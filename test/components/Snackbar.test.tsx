import React from 'react';

import { Snackbar } from '../../src';
import { fireEvent, render, screen } from '../../src/testUtils';

describe('Snackbar', () => {
  test('should render message text', () => {
    render(<Snackbar message="testMessage" messageId={7} />);

    expect(screen.getByText('testMessage')).not.toBeNull();
  });

  test('should accept mouse events when not disabled', () => {
    const handleDismiss = jest.fn();

    render(<Snackbar messageId={7} onDismiss={handleDismiss} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleDismiss).toHaveBeenCalled();
  });
});
