import React, { forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';

export type ToolbarProps = BoxProps<'div'>;

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  function Toolbar(props, ref) {
    const { sx, ...rest } = props;

    return (
      <Box
        as="div"
        backgroundColor="backgroundContrast"
        padding={4}
        ref={ref}
        sx={mergeSX(
          {
            display: 'flex',
            label: 'Toolbar',
          },
          sx,
        )}
        {...rest}
      />
    );
  },
);
