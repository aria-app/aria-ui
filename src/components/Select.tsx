import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  ReactElement,
  Ref,
  useMemo,
} from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { ColorName } from '../types';
import { Box, BoxProps } from './Box';
import { FormGroup, FormGroupProps } from './FormGroup';
import { Icon, IconSize } from './Icon';

export interface SelectOption<ValueType = any> {
  disabled?: boolean;
  label?: string;
  value?: ValueType;
}

export interface SelectProps extends FormGroupProps {
  disabled?: boolean;
  endIcon?: ReactElement;
  endIconColor?: ColorName;
  endIconSize?: IconSize;
  id?: string;
  onValueChange?: (value: any, event: ChangeEvent<HTMLSelectElement>) => void;
  options?: SelectOption[];
  placeholder?: string;
  rootRef?: Ref<HTMLFieldSetElement>;
  selectProps?: BoxProps<'select'>;
  startIcon?: ReactElement;
  startIconColor?: ColorName;
  startIconSize?: IconSize;
  value?: any;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const {
      disabled,
      endIcon = <ChevronDownIcon />,
      endIconColor = 'textSecondary',
      endIconSize,
      error,
      id,
      label,
      onValueChange,
      options = [],
      placeholder,
      rootRef,
      startIcon,
      startIconColor = 'textSecondary',
      startIconSize,
      selectProps = {},
      success,
      sx,
      value = '',
      warning,
      ...rest
    } = props;
    const theme = useThemeWithDefault();

    const borderColor = useMemo(() => {
      if (error) return 'error';
      if (warning) return 'warning';
      if (success) return 'success';
      return 'transparent';
    }, [error, success, warning]);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = e => {
      const selectedIndex = placeholder
        ? e.target.selectedIndex - 1
        : e.target.selectedIndex;
      onValueChange?.(options[selectedIndex].value, e);
    };

    const selectedOption = options.find(option => option.value === value);

    return (
      <FormGroup
        error={error}
        label={label}
        space={3}
        success={success}
        ref={rootRef}
        sx={mergeSX(
          {
            appearance: 'none',
            label: 'Select',
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
          }}
        >
          {startIcon && (
            <Box
              marginLeft={3.75}
              sx={{ pointerEvents: 'none', position: 'absolute' }}
            >
              <Icon
                block
                color={startIconColor}
                icon={startIcon}
                size={startIconSize}
                sx={{
                  width: '100%',
                }}
              />
            </Box>
          )}
          <Box
            as="select"
            borderColor={borderColor}
            borderRadius="md"
            borderWidth={3}
            disabled={disabled}
            height={12}
            id={id || label?.replace(/ /g, '') || undefined}
            onChange={handleChange}
            ref={ref}
            paddingLeft={startIcon ? 12 : 3}
            paddingRight={endIcon ? 12 : 3}
            sx={{
              ...theme.textVariants.field,
              appearance: 'none',
              backgroundColor: theme.colors.border,
              color: !!selectedOption
                ? theme.colors.textPrimary
                : theme.colors.textSecondary,
              fontFamily: 'inherit',
              outline: 0,
              width: '100%',
              '&, & *': {
                cursor: disabled ? 'not-allowed' : 'pointer',
              },
            }}
            value={selectedOption ? value : ''}
            {...selectProps}
          >
            {placeholder && (
              <option
                key="ARIA_SELECT_PLACEHOLDER_OPTION"
                label={placeholder}
                value=""
              />
            )}
            {options.map(({ label, value }, index) => (
              <option key={`${value}-${index}`} label={label} value={value} />
            ))}
          </Box>
          {endIcon && (
            <Box
              marginRight={3.75}
              right={0}
              sx={{ pointerEvents: 'none', position: 'absolute' }}
            >
              <Icon
                block
                color={endIconColor}
                icon={endIcon}
                size={endIconSize}
              />
            </Box>
          )}
        </Box>
      </FormGroup>
    );
  },
);
