import { useTheme } from '@emotion/react';
import capsize from 'capsize';
import React, { ElementType, forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { ColorName, Theme } from '../types';
import { Box, BoxProps } from './Box';

export interface TextProps extends BoxProps<ElementType> {
  color?: ColorName;
  colorIsBackground?: boolean;
  element?: keyof JSX.IntrinsicElements;
  variant?: keyof Theme['textVariants'];
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  props,
  ref,
) {
  const {
    color,
    colorIsBackground,
    element = 'span',
    sx,
    variant = 'body',
    ...rest
  } = props;
  const theme = useTheme();

  const { fontSize, fontWeight, leading } = theme.getTextVariant(variant);

  const themeColor = colorIsBackground
    ? theme.getForegroundColor(color)
    : theme.getColor(color);

  return (
    <Box
      as={element}
      ref={ref}
      sx={mergeSX(
        {
          color: themeColor || 'inherit',
          fontFamily: theme.fontFamily,
          fontWeight: fontWeight,
          label: 'Text',
          ...capsize({
            fontMetrics: theme.fontMetrics,
            fontSize,
            leading,
          }),
        },
        sx,
      )}
      {...rest}
    />
  );
});
