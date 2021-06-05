import { useTheme } from '@emotion/react';
import capsize from 'capsize';
import { merge } from 'lodash';
import React, { ElementType, forwardRef } from 'react';

import { ColorName, Theme } from '../types';
import { Box, BoxProps } from './Box';

export interface TextProps extends BoxProps<ElementType> {
  color?: ColorName;
  colorIsBackground?: boolean;
  variant?: keyof Theme['textVariants'];
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  props,
  ref,
) {
  const {
    color,
    colorIsBackground,
    component = 'span',
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
      component={component}
      ref={ref}
      sx={merge(
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
