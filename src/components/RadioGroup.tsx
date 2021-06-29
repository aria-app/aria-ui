import { last } from 'lodash';
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  ReactElement,
  useCallback,
} from 'react';
import { Key } from 'w3c-keys';

import { mergeSX } from '../helpers';
import { FormGroup, FormGroupProps } from './FormGroup';
import {
  RadioButton,
  RadioButtonOnSelect,
  RadioButtonProps,
} from './RadioButton';
import { Stack } from './Stack';

export interface RadioGroupProps extends FormGroupProps {
  disabled?: boolean;
  onValueChange?: (
    value: any,
    e: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>,
  ) => void;
  value?: any;
}

export const RadioGroup = forwardRef<HTMLElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const { children, disabled, onValueChange, value, sx, ...rest } = props;

    const radioButtonChildren = Children.toArray(children).filter(
      child => isValidElement(child) && child.type === RadioButton,
    );

    const selectNextValue = useCallback<KeyboardEventHandler<HTMLElement>>(
      e => {
        const values = (radioButtonChildren as ReactElement<any>[]).map(
          ({ props }) => props.value,
        );
        const valueIndex = values.findIndex(v => v === value);

        if (valueIndex === values.length - 1) return;

        if (valueIndex === -1) {
          onValueChange?.(values[0], e);
          return;
        }

        onValueChange?.(values[valueIndex + 1], e);
      },
      [onValueChange, radioButtonChildren, value],
    );

    const selectPreviousValue = useCallback<KeyboardEventHandler<HTMLElement>>(
      e => {
        const values = (radioButtonChildren as ReactElement<any>[]).map(
          ({ props }) => props.value,
        );
        const valueIndex = values.findIndex(v => v === value);

        if (valueIndex === 0) return;

        if (valueIndex === -1) {
          onValueChange?.(last(values), e);
          return;
        }

        onValueChange?.(values[valueIndex - 1], e);
      },
      [onValueChange, radioButtonChildren, value],
    );

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
      e => {
        if (e.key === Key.ArrowUp) {
          selectPreviousValue(e);
        }

        if (e.key === Key.ArrowDown) {
          selectNextValue(e);
        }
      },
      [selectNextValue, selectPreviousValue],
    );

    const handleRadioButtonSelect = useCallback<RadioButtonOnSelect>(
      (value, e) => {
        if (disabled) return;
        onValueChange?.(value, e);
      },
      [disabled, onValueChange],
    );

    return (
      <FormGroup
        disabled={disabled}
        element="div"
        onKeyDown={handleKeyDown}
        ref={ref}
        role="radiogroup"
        sx={mergeSX(
          {
            label: 'RadioGroup',
          },
          sx,
        )}
        tabIndex={0}
        {...rest}
      >
        <Stack space={2}>
          {radioButtonChildren.map(child =>
            isValidElement(child)
              ? cloneElement(child, {
                  disabled: disabled || child.props.disabled,
                  isChecked: child.props.value === value,
                  onSelect: handleRadioButtonSelect,
                  tabIndex: -1,
                } as Partial<RadioButtonProps>)
              : child,
          )}
        </Stack>
      </FormGroup>
    );
  },
);
