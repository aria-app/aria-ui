import React, { forwardRef, Ref } from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { Stack, StackProps } from './Stack';
import { Text } from './Text';

export interface FormGroupProps extends Omit<StackProps, 'ref'> {
  disabled?: boolean;
  element?: 'div' | 'fieldset';
  error?: string;
  htmlFor?: string;
  label?: string;
  secondaryLabel?: string;
  success?: string;
  warning?: string;
}

export const FormGroup = forwardRef<HTMLElement, FormGroupProps>(
  function FormGroup(props, ref) {
    const {
      children,
      disabled,
      element = 'fieldset',
      error,
      htmlFor,
      label,
      secondaryLabel,
      space = 4,
      success,
      sx,
      warning,
      ...rest
    } = props;
    const theme = useThemeWithDefault();

    const disabledProps = disabled
      ? { sx: { opacity: theme.disabledOpacity } }
      : {};

    return (
      <Stack
        as={element}
        ref={ref as Ref<HTMLDivElement>}
        space={space}
        sx={mergeSX(
          {
            border: 0,
          },
          sx,
        )}
        {...rest}
      >
        {(label || secondaryLabel) && (
          <Stack space={2.5} {...disabledProps}>
            {label && (
              <Text element="label" htmlFor={htmlFor} variant="label">
                {label}
              </Text>
            )}
            {secondaryLabel && (
              <Text
                color="textSecondary"
                element="label"
                htmlFor={htmlFor}
                variant="helper"
              >
                {secondaryLabel}
              </Text>
            )}
          </Stack>
        )}
        {children}
        {(error || success || warning) && (
          <Stack space={2.5} {...disabledProps}>
            {error && (
              <Text color="error" variant="helper">
                {error}
              </Text>
            )}
            {warning && (
              <Text color="warning" variant="helper">
                {warning}
              </Text>
            )}
            {success && (
              <Text color="success" variant="helper">
                {success}
              </Text>
            )}
          </Stack>
        )}
      </Stack>
    );
  },
);
