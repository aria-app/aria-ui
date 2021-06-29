import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Dialog.stories';

const { Closed, Default } = composeStories(stories);

describe('Dialog', () => {
  test('should handle clicking confirm', () => {
    const handleConfirm = jest.fn();

    render(<Default onConfirm={handleConfirm} />);

    userEvent.click(screen.getByText('Confirm'));

    expect(handleConfirm).toHaveBeenCalledWith(expect.anything());
  });

  test('should handle clicking cancel', () => {
    const handleCancel = jest.fn();

    render(<Default onCancel={handleCancel} />);

    userEvent.click(screen.getByText('Cancel'));

    expect(handleCancel).toHaveBeenCalledWith(expect.anything());
  });

  test('should handle overlay clicks by default', () => {
    const handleOverlayClick = jest.fn();

    render(<Default onOverlayClick={handleOverlayClick} />);

    userEvent.click(screen.getByTestId('aria-ui-dialog-overlay'));

    expect(handleOverlayClick).toHaveBeenCalledWith(expect.anything());
  });

  test('should not render clickable overlay when closed', () => {
    render(<Closed onOverlayClick={() => {}} />);

    expect(screen.queryByTestId('aria-ui-dialog-overlay')).toBeNull();
  });
});
