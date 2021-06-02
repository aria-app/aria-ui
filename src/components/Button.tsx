import { useTheme } from '@emotion/react';
import React, { ElementType, FC, useMemo } from 'react';

import { Box, BoxProps } from './Box';
import { Text } from './Text';

export type ButtonVariant = 'contained' | 'minimal' | 'outlined';

export interface ButtonProps extends BoxProps<ElementType> {
  color?: BoxProps<ElementType>['backgroundColor'];
  component?: 'a' | 'button';
  iconSide?: 'left' | 'right';
  text?: string;
  variant?: ButtonVariant;
}

export const Button: FC<ButtonProps> = props => {
  const {
    color = 'textPrimary',
    component = 'button',
    disabled,
    iconSide,
    text,
    variant = 'outlined',
    ...rest
  } = props;
  const theme = useTheme();

  const backgroundColor = useMemo(
    () => (variant === 'contained' ? color : undefined),
    [color, variant],
  );

  const variantProps = useMemo(
    () =>
      ({
        contained: {
          backgroundColor,
          borderColor: 'transparent',
          borderWidth: 0,
          paddingY: 4,
        },
        minimal: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          paddingY: 4,
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: color,
          borderWidth: 3,
          paddingY: 3.25,
        },
      }[variant]),
    [backgroundColor, color, variant],
  );

  return (
    <Box disabled={disabled} sx={{}} {...rest}>
      <Box
        borderRadius="md"
        component={component}
        isInteractive={!disabled}
        paddingX={text ? 4 : undefined}
        {...variantProps}
        sx={{
          alignItems: 'center',
          appearance: 'none',
          cursor: disabled ? 'not-allowed' : undefined,
          display: 'flex',
          flex: 'none',
          flexDirection: iconSide === 'right' ? 'row' : 'row-reverse',
          justifyContent: 'center',
          minWidth: text ? theme.space(6) : undefined,
          opacity: disabled ? 0.5 : undefined,
          outline: 'none',
          position: 'relative',
          '&::after': {
            borderRadius: 5,
            margin: variant === 'outlined' ? -3 : undefined,
          },
        }}
      >
        {text && (
          <Text
            color={color}
            colorIsBackground={variant === 'contained'}
            sx={{
              pointerEvents: disabled ? 'none' : undefined,
            }}
            variant="button"
          >
            {text}
          </Text>
        )}
      </Box>
    </Box>
  );
};
