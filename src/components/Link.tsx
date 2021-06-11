import React, { AnchorHTMLAttributes, forwardRef, Ref } from 'react';

import { mergeSX } from '../helpers';
import { Merge } from '../types';
import { Box, BoxProps } from './Box';
import { Text, TextProps } from './Text';

export interface LinkProps
  extends Merge<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    BoxProps<'a' | 'button'>
  > {
  color?: TextProps['color'];
  colorIsBackground?: TextProps['colorIsBackground'];
  variant?: TextProps['variant'];
}

export const Link = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>(function Link(props, ref) {
  const { children, color, colorIsBackground, sx, variant, ...rest } = props;

  return (
    <Box
      as="a"
      borderRadius="sm"
      isInteractive
      marginX={-1}
      marginY={-2}
      padding={1}
      paddingY={2}
      ref={ref as Ref<HTMLAnchorElement>}
      sx={mergeSX(
        {
          color: 'unset',
          cursor: 'pointer',
          display: 'block',
          label: 'Link',
        },
        sx,
      )}
      {...rest}
    >
      <Text
        color={color}
        colorIsBackground={colorIsBackground}
        variant={variant}
      >
        {children}
      </Text>
    </Box>
  );
});
