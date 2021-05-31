import styled from '@emotion/styled';
import { readableColor } from 'polished';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { Theme } from '../types';

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: keyof Theme['colors'];
  color?: keyof Theme['colors'];
  component?: ElementType;
  isInteractive?: boolean;
};

const BoxRoot = styled.div<BoxOwnProps>(
  ({ backgroundColor, color, isInteractive, theme }) => {
    const resolvedBackgroundColor =
      backgroundColor && theme.colors[backgroundColor];
    const contrastColor = readableColor(resolvedBackgroundColor || '#fff');
    const isLightBackground = contrastColor === '#000';

    return {
      backgroundColor: resolvedBackgroundColor,
      color: color && theme.colors[color],
      ...(isInteractive
        ? {
            cursor: 'pointer',
            position: 'relative',
            '&::after': {
              backgroundColor: isLightBackground ? '#000' : '#fff',
              bottom: 0,
              content: '""',
              left: 0,
              pointerEvents: 'none',
              opacity: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              transition: 'opacity 100ms ease-in-out',
            },
            '&:hover::after': {
              opacity: isLightBackground ? '0.1' : '0.2',
            },
            '&:active::after': {
              opacity: isLightBackground ? '0.25' : '0.4',
            },
          }
        : {}),
    };
  },
);

// Merge own props with others inherited from the underlying element type
export type BoxProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  BoxOwnProps
>;

const defaultElement = 'div';

export function Box<E extends ElementType = typeof defaultElement>({
  component = defaultElement,
  ...rest
}: BoxProps<E>): JSX.Element {
  return <BoxRoot as={component} {...rest}></BoxRoot>;
}
