import { isNumber } from 'lodash';
import React, { forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { useResponsivePropValue, useThemeWithDefault } from '../hooks';
import { ResponsiveProp, Spacing } from '../types';
import { Box, BoxProps } from './Box';

export type InlineAlign = 'center' | 'end' | 'start';
export type InlineAlignY = 'center' | 'end' | 'start' | 'stretch';

export interface InlineProps extends BoxProps<'div'> {
  align?: ResponsiveProp<InlineAlign>;
  alignY?: ResponsiveProp<InlineAlignY>;
  space?: ResponsiveProp<Spacing>;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  props,
  ref,
) {
  const {
    align: alignProp,
    alignY: alignYProp,
    children,
    space: spaceProp,
    sx,
    ...rest
  } = props;
  const align = useResponsivePropValue(alignProp) || 'start';
  const alignY = useResponsivePropValue(alignYProp) || 'stretch';
  const space = useResponsivePropValue(spaceProp) || 0;
  const theme = useThemeWithDefault();

  return (
    <Box
      as="div"
      ref={ref}
      sx={mergeSX(
        {
          display: 'flex',
          label: 'Inline',
        },
        sx,
      )}
      {...rest}
    >
      <Box
        marginLeft={isNumber(space) ? -space : 0}
        marginTop={isNumber(space) ? -space : 0}
        sx={{
          alignItems: {
            center: 'center',
            end: 'flex-end',
            start: 'flex-start',
            stretch: 'stretch',
          }[alignY],
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: {
            center: 'center',
            end: 'flex-end',
            start: 'flex-start',
          }[align],
          '& > *': {
            marginLeft: theme.space(space),
            marginTop: theme.space(space),
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
});
