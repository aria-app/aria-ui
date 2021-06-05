import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { forwardRef } from 'react';

import { Box, BoxProps } from './Box';

export interface TextFieldProps extends BoxProps<'input'> {
  label?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const { sx, ...rest } = props;
    const theme = useTheme();

    return (
      <Box
        borderRadius="md"
        component="input"
        height={12}
        paddingX={4}
        ref={ref}
        sx={merge(
          {
            ...theme.textVariants.field,
            backgroundColor: theme.colors.border,
            border: 0,
            color: theme.colors.textPrimary,
            fontFamily: 'inherit',
            label: 'TextField',
            outline: 0,
            '&::-moz-placeholder': {
              color: theme.colors.textSecondary,
              opacity: 1,
            },
            '&:-ms-input-placeholder': {
              color: theme.colors.textSecondary,
            },
            '&::-webkit-input-placeholder': {
              color: theme.colors.textSecondary,
            },
          },
          sx,
        )}
        {...rest}
      />
    );
  },
);
