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
  iconSize?: IconSize;
  startIcon?: ReactElement;
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
    iconSize = 'md',
    isLoading,
    startIcon,
    text,
    variant = 'outlined',
    ...rest
  } = props;
  const theme = useTheme();

  const backgroundColor = useMemo(
    () => (variant === 'contained' ? color : undefined),
    [color, variant],
  );

  const paddingY = useMemo(() => {
    if (endIcon || startIcon) {
      const basePadding = {
        lg: 2,
        md: 3,
        sm: 4,
      }[iconSize];

      return variant === 'outlined' ? basePadding - 0.75 : basePadding;
    }

    return variant === 'outlined' ? 3.25 : 4;
  }, [endIcon, iconSize, startIcon, variant]);

  const variantProps = useMemo(
    () =>
      ({
        contained: {
          backgroundColor,
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
    [backgroundColor, color, variant],
  );

  return (
    <Box
      borderRadius="md"
      component={component}
      disabled={disabled}
      isInteractive={!disabled}
      paddingX={text ? 4 : undefined}
      paddingY={paddingY}
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
          borderRadius: 5,
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
          size={iconSize}
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
          size={iconSize}
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
