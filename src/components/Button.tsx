import { useTheme } from '@emotion/react';
import React, { ElementType, forwardRef, ReactElement, useMemo } from 'react';

import { Box, BoxProps } from './Box';
import { Icon, IconSize } from './Icon';
import { Spinner } from './Spinner';
import { Text } from './Text';

export type ButtonVariant = 'contained' | 'minimal' | 'outlined';

export interface ButtonProps extends BoxProps<ElementType> {
  color?: BoxProps<ElementType>['backgroundColor'];
  component?: 'a' | 'button';
  endIcon?: ReactElement;
  endIconSize?: IconSize;
  startIcon?: ReactElement;
  startIconSize?: IconSize;
  isLoading?: boolean;
  text?: string;
  variant?: ButtonVariant;
}

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    color = 'textPrimary',
    component = 'button',
    disabled,
    endIcon,
    endIconSize = 'md',
    isLoading,
    startIcon,
    startIconSize = 'md',
    text,
    variant = 'outlined',
    ...rest
  } = props;
  const theme = useTheme();

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
      borderRadius="md"
      childColor={variant !== 'contained' ? color : undefined}
      component={component}
      disabled={disabled}
      height={12}
      isInteractive={!disabled}
      paddingX={text ? 4 : undefined}
      ref={ref}
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
        pointerEvents: isLoading ? 'none' : undefined,
        position: 'relative',
        '&::after': {
          margin: variant === 'outlined' ? -3 : undefined,
        },
      }}
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
          trimSpace={false}
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
