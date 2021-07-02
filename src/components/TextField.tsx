import { useTheme } from '@emotion/react';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  MouseEventHandler,
  ReactElement,
  Ref,
  useCallback,
  useMemo,
} from 'react';

import { mergeSX } from '../helpers';
import { ColorName } from '../types';
import { Box, BoxProps } from './Box';
import { FormGroup, FormGroupProps } from './FormGroup';
import { Icon, IconSize } from './Icon';

export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface TextFieldProps extends FormGroupProps {
  disabled?: boolean;
  endIcon?: ReactElement;
  endIconColor?: ColorName;
  endIconSize?: IconSize;
  id?: string;
  inputProps?: BoxProps<'input'>;
  onEndIconClick?: MouseEventHandler<HTMLSpanElement>;
  onStartIconClick?: MouseEventHandler<HTMLSpanElement>;
  onValueChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rootRef?: Ref<HTMLFieldSetElement>;
  startIcon?: ReactElement;
  startIconColor?: ColorName;
  startIconSize?: IconSize;
  type?: TextFieldType;
  value?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      disabled,
      endIcon,
      endIconColor = 'textSecondary',
      endIconSize,
      error,
      id,
      inputProps = {},
      label,
      onEndIconClick,
      onStartIconClick,
      onValueChange,
      placeholder,
      rootRef,
      startIcon,
      startIconColor = 'textSecondary',
      startIconSize,
      success,
      sx,
      type = 'text',
      value,
      warning,
      ...rest
    } = props;
    const theme = useTheme();

    const borderColor = useMemo(() => {
      if (error) return 'error';
      if (warning) return 'warning';
      if (success) return 'success';
      return 'transparent';
    }, [error, success, warning]);

    const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      e => {
        onValueChange?.(e.currentTarget.value, e);
      },
      [onValueChange],
    );

    return (
      <FormGroup
        disabled={disabled}
        error={error}
        htmlFor={id}
        label={label}
        ref={rootRef}
        space={2}
        success={success}
        sx={mergeSX(
          {
            label: 'TextField',
            width: '100%',
          },
          sx,
        )}
        warning={warning}
        {...rest}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            opacity: disabled ? theme.disabledOpacity : undefined,
            position: 'relative',
            width: '100%',
          }}
        >
          {startIcon && (
            <Box marginLeft={3.75} sx={{ position: 'absolute' }}>
              <Icon
                block
                color={startIconColor}
                icon={startIcon}
                onClick={onStartIconClick}
                role={onStartIconClick ? 'button' : undefined}
                size={startIconSize}
                sx={{
                  cursor: onStartIconClick ? 'pointer' : undefined,
                }}
              />
            </Box>
          )}
          <Box
            borderRadius="md"
            borderColor={borderColor}
            borderWidth={3}
            as="input"
            disabled={disabled}
            height={11}
            id={id || label?.replace(/ /g, '') || undefined}
            onChange={handleInputChange}
            paddingLeft={startIcon ? 12 : 3}
            paddingRight={endIcon ? 12 : 3}
            placeholder={placeholder}
            ref={ref}
            sx={{
              ...theme.textVariants.field,
              backgroundColor: theme.colors.border,
              color: theme.colors.textPrimary,
              fontFamily: 'inherit',
              outline: 0,
              width: '100%',
              '&, & *': {
                cursor: disabled ? 'not-allowed' : undefined,
              },
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
            }}
            type={type}
            value={value}
            {...inputProps}
          />
          {endIcon && (
            <Box marginRight={3.75} right={0} sx={{ position: 'absolute' }}>
              <Icon
                block
                color={endIconColor}
                icon={endIcon}
                onClick={onEndIconClick}
                role={onEndIconClick ? 'button' : undefined}
                size={endIconSize}
                sx={{
                  cursor: onEndIconClick ? 'pointer' : undefined,
                }}
              />
            </Box>
          )}
        </Box>
      </FormGroup>
    );
  },
);
