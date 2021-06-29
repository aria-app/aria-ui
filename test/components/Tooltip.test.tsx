import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Tooltip.stories';

const { Default } = composeStories(stories);

describe('Tooltip', () => {
  test('should appear when target is hovered', async () => {
    render(<Default />);

    expect(screen.queryByRole('tooltip')).toBeNull();

    userEvent.hover(screen.getByText('Hover me'));

    const tooltip = await screen.findByRole('tooltip');

    expect(tooltip).toBeTruthy();
  });
});
