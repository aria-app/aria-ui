import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, {
  cloneElement,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';

import { ColorName } from '../types';
import { Box, BoxProps } from './Box';

export type IconSize = 'lg' | 'md' | 'sm';

export interface IconProps extends Omit<BoxProps<ElementType>, 'size'> {
  color?: ColorName;
  colorIsBackground?: boolean;
  icon?: ReactElement;
  size?: IconSize;
}

export const Icon = forwardRef<HTMLElement, IconProps>(function Icon(
  props,
  ref,
) {
  const {
    color,
    colorIsBackground,
    component = 'span',
    icon,
    size = 'md',
    sx,
    ...rest
  } = props;
  const theme = useTheme();

  const themeColor = colorIsBackground
    ? theme.getForegroundColor(color)
    : theme.getColor(color);

  if (!icon) return null;

  return (
    <Box
      component={component}
      ref={ref as Ref<HTMLDivElement>}
      size={{ lg: 8, md: 6, sm: 4 }[size]}
      sx={merge(
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
