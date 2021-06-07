import { merge } from 'lodash';
import React, { forwardRef, Ref } from 'react';

import { Stack, StackProps } from './Stack';
import { Text } from './Text';

export interface FormGroupProps extends Omit<StackProps, 'ref'> {
  element?: 'div' | 'fieldset';
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
      element = 'fieldset',
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
        as={element}
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
              <Text color="textSecondary" variant="helper">
                {secondaryLabel}
              </Text>
            )}
          </Stack>
        )}
        {children}
        {(error || success || warning) && (
          <Stack space={2.5}>
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
