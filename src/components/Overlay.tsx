import { merge } from 'lodash';
import React, { forwardRef } from 'react';

import { Box, BoxProps } from './Box';

export type OverlayProps = BoxProps<'div'>;

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(props, ref) {
    const { sx, ...rest } = props;

    return (
      <Box
        aria-hidden="true"
        backgroundColor="textPrimary"
        as="div"
        ref={ref}
        sx={merge(
          {
            bottom: 0,
            label: 'Overlay',
            left: 0,
            opacity: 0.3,
            position: 'absolute',
            right: 0,
            top: 0,
          },
          sx,
        )}
        {...rest}
      />
    );
  },
);
