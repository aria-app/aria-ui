import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { FC } from 'react';

import { Box, BoxProps } from './Box';

export type DividerThickness = 'lg' | 'md' | 'sm';

export interface DividerProps extends BoxProps<'hr'> {
  thickness?: DividerThickness;
}

export const Divider: FC<DividerProps> = props => {
  const { thickness = 'md', sx = {}, ...rest } = props;
  const theme = useTheme();

  return (
    <Box
      component="hr"
      sx={merge(
        {
          backgroundColor: theme.colors.border,
          border: 0,
          height: {
            lg: 5,
            md: 3,
            sm: 1,
          }[thickness],
          width: '100%',
        },
        sx,
      )}
      {...rest}
    />
  );
};
