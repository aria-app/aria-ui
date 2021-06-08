import { useTheme } from '@emotion/react';
import React, { cloneElement, forwardRef, ReactElement, Ref } from 'react';

import { mergeSX } from '../helpers';
import { ColorName } from '../types';
import { Box, BoxProps } from './Box';

export type IconSize = 'lg' | 'md' | 'sm';

export interface IconProps extends Omit<BoxProps<'span'>, 'size'> {
  color?: ColorName;
  colorIsBackground?: boolean;
  icon?: ReactElement;
  size?: IconSize;
}

export const Icon = forwardRef<HTMLElement, IconProps>(function Icon(
  props,
  ref,
) {
  const { color, colorIsBackground, icon, size = 'md', sx, ...rest } = props;
  const theme = useTheme();

  const themeColor = colorIsBackground
    ? theme.getForegroundColor(color)
    : theme.getColor(color);

  if (!icon) return null;

  return (
    <Box
      as="span"
      ref={ref as Ref<HTMLDivElement>}
      size={{ lg: 8, md: 6, sm: 4 }[size]}
      sx={mergeSX(
        {
          color: themeColor,
          label: 'Icon',
          lineHeight: 0,
        },
        sx,
      )}
      {...rest}
    >
      {cloneElement(icon, {
        size: theme.space({ lg: 8, md: 6, sm: 4 }[size]),
        style: { fill: 'currentcolor' },
      })}
    </Box>
  );
});
