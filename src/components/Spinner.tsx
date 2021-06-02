import { keyframes, useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { FC } from 'react';

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

export const Spinner: FC<SpinnerProps> = props => {
  const {
    color = 'brandPrimary',
    colorIsBackground,
    size = 'md',
    sx = {},
    ...rest
  } = props;
  const theme = useTheme();

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
      component="div"
      size={{ lg: 12, md: 8, sm: 6 }[size]}
      sx={merge(
        {
          animation: `${rotateAnimation.toString()} 1500ms linear infinite`,
          animationDelay: '200ms',
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
};
