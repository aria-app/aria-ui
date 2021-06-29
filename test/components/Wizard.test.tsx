import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../src/testUtils';
import * as stories from '../../stories/Components/Wizard.stories';

const { LastStep, MiddleStep } = composeStories(stories);

describe('Wizard', () => {
  test('should handle back click', () => {
    const handleCurrentIndexChange = jest.fn();

    render(<MiddleStep onCurrentIndexChange={handleCurrentIndexChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(handleCurrentIndexChange).toHaveBeenCalledWith(0);
  });

  test('should handle next click', () => {
    const handleCurrentIndexChange = jest.fn();

    render(<MiddleStep onCurrentIndexChange={handleCurrentIndexChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(handleCurrentIndexChange).toHaveBeenCalledWith(2);
  });

  test('should handle finish click', () => {
    const handleFinish = jest.fn();

    render(<LastStep onFinish={handleFinish} />);

    userEvent.click(screen.getByRole('button', { name: 'Finish' }));

    expect(handleFinish).toHaveBeenCalledWith(expect.any(Object));
  });
});
