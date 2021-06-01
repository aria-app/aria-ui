import styled from '@emotion/styled';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { Theme } from '../types';

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: keyof Theme['colors'];
  component?: ElementType;
  isInteractive?: boolean;
};

const BoxRoot = styled.div<BoxOwnProps>(
  ({ backgroundColor, isInteractive, theme }) => {
    const foregroundColor = theme.getForegroundColor(backgroundColor);
    const isLightBackground =
      !foregroundColor || foregroundColor === theme.colors.textPrimary;

    return {
      backgroundColor: theme.getColor(backgroundColor),
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
