import { merge } from 'lodash';
import React, { forwardRef, Ref } from 'react';

import { Stack, StackProps } from './Stack';
import { Text } from './Text';

export interface FormGroupProps extends Omit<StackProps, 'ref'> {
  error?: string;
  label?: string;
  secondaryLabel?: string;
  success?: string;
  warning?: string;
}

export const FormGroup = forwardRef<HTMLFieldSetElement, FormGroupProps>(
  function FormGroup(props, ref) {
    const {
      children,
      error,
      label,
      secondaryLabel,
      space = 4,
      success,
      sx,
      warning,
      ...rest
    } = props;

    return (
      <Stack
        component="fieldset"
        ref={ref as Ref<HTMLDivElement>}
        space={space}
        sx={merge(
          {
            border: 0,
          },
          sx,
        )}
        {...rest}
      >
        {(label || secondaryLabel) && (
          <Stack space={2.5}>
            {label && <Text variant="label">{label}</Text>}
            {secondaryLabel && (
              <Text color="textSecondary" variant="caption">
                {secondaryLabel}
              </Text>
            )}
          </Stack>
        )}
        {children}
        {(error || success || warning) && (
          <Stack space={2.5}>
            {error && (
              <Text color="error" variant="caption">
                {error}
              </Text>
            )}
            {warning && (
              <Text color="warning" variant="caption">
                {warning}
              </Text>
            )}
            {success && (
              <Text color="success" variant="caption">
                {success}
              </Text>
            )}
          </Stack>
        )}
      </Stack>
    );
  },
);
