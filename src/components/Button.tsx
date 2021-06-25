import React, {
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
  useMemo,
} from 'react';

import { useThemeWithDefault } from '../hooks';
import { Box, BoxProps } from './Box';
import { Icon, IconSize } from './Icon';
import { Spinner } from './Spinner';
import { Text } from './Text';

export type ButtonVariant = 'contained' | 'minimal' | 'outlined';

export interface ButtonProps extends BoxProps<'a' | 'button'> {
  color?: BoxProps<ElementType>['backgroundColor'];
  disabled?: boolean;
  element?: 'a' | 'button';
  endIcon?: ReactElement;
  endIconSize?: IconSize;
  startIcon?: ReactElement;
  startIconSize?: IconSize;
  isLoading?: boolean;
  text?: string;
  type?: BoxProps<'button'>['type'];
  variant?: ButtonVariant;
}

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    color = 'textPrimary',
    element = 'button',
    disabled,
    endIcon,
    endIconSize = 'md',
    isLoading,
    startIcon,
    startIconSize = 'md',
    text,
    type = 'button',
    variant = 'outlined',
    ...rest
  } = props;
  const theme = useThemeWithDefault();

  const elementProps =
    element === 'button' ? { disabled: disabled || isLoading } : {};

  const variantProps = useMemo(
    () =>
      ({
        contained: {
          backgroundColor: variant === 'contained' ? color : undefined,
          borderColor: 'transparent' as const,
          borderWidth: 0,
        },
        minimal: {
          backgroundColor: 'transparent' as const,
          borderColor: 'transparent' as const,
          borderWidth: 0,
        },
        outlined: {
          backgroundColor: 'transparent' as const,
          borderColor: color,
          borderWidth: 3,
        },
      }[variant]),
    [color, variant],
  );

  return (
    <Box
      as={element}
      borderRadius="md"
      childColor={variant !== 'contained' ? color : undefined}
      height={12}
      isInteractive={!(disabled || isLoading)}
      paddingX={text ? 4 : undefined}
      ref={ref as Ref<HTMLButtonElement>}
      {...elementProps}
      {...variantProps}
      sx={{
        alignItems: 'center',
        appearance: 'none',
        cursor: disabled ? 'not-allowed' : undefined,
        display: 'flex',
        flex: 'none',
        justifyContent: 'center',
        label: 'Button',
        minWidth: text ? theme.space(6) : undefined,
        opacity: disabled ? 0.5 : undefined,
        outline: 'none',
        position: 'relative',
        '&::after': {
          margin: variant === 'outlined' ? -3 : undefined,
        },
      }}
      type={type}
      {...rest}
    >
      {startIcon && (
        <Icon
          color={color}
          colorIsBackground={variant === 'contained'}
          icon={startIcon}
          size={startIconSize}
          marginLeft={-1}
          marginRight={3}
          sx={{
            visibility: isLoading ? 'hidden' : undefined,
          }}
        />
      )}
      {text && (
        <Text
          color={color}
          colorIsBackground={variant === 'contained'}
          sx={{
            pointerEvents: disabled ? 'none' : undefined,
            visibility: isLoading ? 'hidden' : undefined,
          }}
          variant="button"
        >
          {text}
        </Text>
      )}
      {endIcon && (
        <Icon
          color={color}
          colorIsBackground={variant === 'contained'}
          icon={endIcon}
          size={endIconSize}
          marginLeft={3}
          marginRight={-1}
          sx={{
            visibility: isLoading ? 'hidden' : undefined,
          }}
        />
      )}
      {isLoading && (
        <Spinner
          color={color}
          colorIsBackground={variant === 'contained'}
          sx={{ position: 'absolute' }}
        />
      )}
    </Box>
  );
});
