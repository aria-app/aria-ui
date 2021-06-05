import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { forwardRef } from 'react';

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
  const theme = useTheme();

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
      component="hr"
      ref={ref}
      sx={merge(
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
