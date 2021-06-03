import React from 'react';

import { Button } from '../../src';
import { fireEvent, render, screen } from '../../src/testUtils';

describe('Button', () => {
  test('should contain passed text', () => {
    render(<Button text="testText" />);

    expect(screen.getByRole('button')).toHaveTextContent('testText');
  });

  test('should accept mouse events when not disabled', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not accept mouse events when not disabled', () => {
    const handleClick = jest.fn();

    render(<Button disabled onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should contain a spinner when loading', () => {
    const { rerender } = render(<Button />);

    expect(screen.queryByRole('alert')).toBeNull();

    rerender(<Button isLoading />);

    expect(screen.queryByRole('alert')).toBeDefined();
  });
});
