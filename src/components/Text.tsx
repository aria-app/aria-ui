import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { ElementType, FC } from 'react';

import { ColorName, Theme } from '../types';
import { Box, BoxProps } from './Box';

export interface TextProps extends BoxProps<ElementType> {
  color?: ColorName;
  colorIsBackground?: boolean;
  variant?: keyof Theme['textVariants'];
}

export const Text: FC<TextProps> = props => {
  const {
    color,
    colorIsBackground,
    component = 'span',
    sx = {},
    variant = 'body',
    ...rest
  } = props;
  const theme = useTheme();

  const themeColor = colorIsBackground
    ? theme.getForegroundColor(color)
    : theme.getColor(color);

  return (
    <Box
      component={component}
      sx={merge(
        {
          color: themeColor || 'inherit',
          fontFamily: theme.fontFamily,
          ...theme.getTextVariant(variant),
        },
        sx,
      )}
      {...rest}
    />
  );
};
