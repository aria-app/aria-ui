import React, { forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { Box, BoxProps } from './Box';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerThickness = 'lg' | 'md' | 'sm';

export interface DividerProps extends BoxProps<'hr'> {
  orientation?: DividerOrientation;
  thickness?: DividerThickness;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  props,
  ref,
) {
  const { orientation = 'horizontal', thickness = 'md', sx, ...rest } = props;
  const theme = useThemeWithDefault();

  const thicknessStyles =
    orientation === 'horizontal'
      ? {
          height: {
            lg: 5,
            md: 3,
            sm: 1,
          }[thickness],
          width: '100%',
        }
      : {
          height: 'auto',
          width: {
            lg: 5,
            md: 3,
            sm: 1,
          }[thickness],
        };

  return (
    <Box
      as="hr"
      ref={ref}
      sx={mergeSX(
        {
          backgroundColor: theme.colors.border,
          border: 0,
          label: 'Divider',
          ...thicknessStyles,
        },
        sx,
      )}
      {...rest}
    />
  );
});
