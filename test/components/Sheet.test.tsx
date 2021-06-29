import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Sheet.stories';

const { Closed, Default } = composeStories(stories);

describe('Sheet', () => {
  test('should handle overlay clicks by default', () => {
    const handleOverlayClick = jest.fn();

    render(<Default onOverlayClick={handleOverlayClick} />);

    userEvent.click(screen.getByTestId('aria-ui-sheet-overlay'));

    expect(handleOverlayClick).toHaveBeenCalledWith(expect.any(Object));
  });

  test('should not render clickable overlay when closed', () => {
    render(<Closed onOverlayClick={() => {}} />);

    expect(screen.queryByTestId('aria-ui-sheet-overlay')).toBeNull();
  });
});
