import { keyframes } from '@emotion/react';
import React, { forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { ColorName } from '../types';
import { Box, BoxProps } from './Box';

const rotateAnimation = keyframes`
  // templating is needed to prevent error from TS bug
  ${'100%' as string} {
    transform: rotate(360deg);
  }
`;

export type SpinnerSize = 'lg' | 'md' | 'sm';

export interface SpinnerProps extends Omit<BoxProps<'div'>, 'size'> {
  color?: ColorName;
  colorIsBackground?: boolean;
  size?: SpinnerSize;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(props, ref) {
    const {
      color = 'brandPrimary',
      colorIsBackground,
      size = 'md',
      sx,
      ...rest
    } = props;
    const theme = useThemeWithDefault();

    const themeColor = colorIsBackground
      ? theme.getForegroundColor(color)
      : theme.getColor(color);

    const borderWidth = {
      lg: 5,
      md: 4,
      sm: 3,
    }[size];

    return (
      <Box
        as="div"
        aria-busy="true"
        ref={ref}
        role="alert"
        size={{ lg: 12, md: 8, sm: 6 }[size]}
        sx={mergeSX(
          {
            animation: `${rotateAnimation.toString()} 1500ms linear infinite`,
            animationDelay: '200ms',
            label: 'Spinner',
            pointerEvents: 'none',
            position: 'relative',
            transition: 'opacity 300ms ease-in-out',
            '&::before': {
              borderColor: themeColor,
              borderRadius: theme.getBorderRadius('full'),
              borderStyle: 'solid',
              borderWidth,
              bottom: 0,
              content: '""',
              left: 0,
              opacity: 0.3,
              position: 'absolute',
              right: 0,
              top: 0,
            },
            '&::after': {
              borderColor: 'transparent',
              borderRadius: theme.getBorderRadius('full'),
              borderStyle: 'solid',
              borderTopColor: themeColor,
              borderWidth,
              bottom: 0,
              content: '""',
              left: 0,
              opacity: 0.7,
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 10,
            },
          },
          sx,
        )}
        {...rest}
      />
    );
  },
);
