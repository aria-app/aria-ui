import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Dialog.stories';

const { Default, Closed } = composeStories(stories);

describe('Dialog', () => {
  test('should register overlay clicks by default', () => {
    const handleOverlayClick = jest.fn();

    render(<Default onOverlayClick={handleOverlayClick} />);

    userEvent.click(screen.getByTestId('aria-ui-dialog-overlay'));

    expect(handleOverlayClick).toHaveBeenCalledTimes(1);
  });

  test('should not render clickable overlay when closed', () => {
    render(<Closed onOverlayClick={() => {}} />);

    expect(screen.queryByTestId('aria-ui-dialog-overlay')).toBeNull();
  });
});
