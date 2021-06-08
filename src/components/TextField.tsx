import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
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
        error={error}
        label={label}
        ref={rootRef}
        space={3}
        success={success}
        sx={merge(
          {
            label: 'TextField',
            opacity: disabled ? 0.5 : 1,
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
            position: 'relative',
            width: '100%',
          }}
        >
          {startIcon && (
            <Box marginLeft={3.75} sx={{ position: 'absolute' }}>
              <Icon
                color={startIconColor}
                icon={startIcon}
                onClick={onStartIconClick}
                size={startIconSize}
                sx={{
                  cursor: onStartIconClick ? 'pointer' : undefined,
                  display: 'block',
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
            height={12}
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
                color={endIconColor}
                icon={endIcon}
                onClick={onEndIconClick}
                size={endIconSize}
                sx={{
                  cursor: onEndIconClick ? 'pointer' : undefined,
                  display: 'block',
                }}
              />
            </Box>
          )}
        </Box>
      </FormGroup>
    );
  },
);
