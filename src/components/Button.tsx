import React, { ElementType, FC, useMemo } from 'react';

import { Box, BoxProps } from './Box';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps extends BoxProps<ElementType> {
  component?: 'button' | 'a';
  text?: string;
  variant?: ButtonVariant;
}

export const Button: FC<ButtonProps> = props => {
  const { component = 'button', text, variant = 'outlined', ...rest } = props;

  const contentPaddingX = useMemo(() => {
    if (variant !== 'text') {
      return text ? 4 : undefined;
    }

    return -4;
  }, [variant]);

  return (
    <Box
      borderWidth={0}
      backgroundColor="transparent"
      component={component}
      sx={{ appearance: 'none', outline: 'none' }}
      {...rest}
    >
      <Box paddingX={contentPaddingX}>{text}</Box>
    </Box>
  );
};
