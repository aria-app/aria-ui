import React, { forwardRef, Ref } from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { Box, BoxProps } from './Box';
import { Icon, IconProps } from './Icon';

export interface IconButtonProps
  extends Omit<BoxProps<'a' | 'button'>, 'size'> {
  color?: IconProps['color'];
  colorIsBackground?: IconProps['colorIsBackground'];
  disabled?: boolean;
  element?: 'a' | 'button';
  icon?: IconProps['icon'];
  size?: IconProps['size'];
}

export const IconButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  IconButtonProps
>(function IconButton(props, ref) {
  const {
    color = 'textSecondary',
    colorIsBackground,
    disabled,
    element = 'button',
    icon,
    size,
    sx,
    ...rest
  } = props;
  const theme = useThemeWithDefault();

  const elementProps = element === 'button' ? { disabled } : {};

  return (
    <Box
      as={element}
      backgroundColor="transparent"
      borderRadius="md"
      borderWidth={0}
      childColor={colorIsBackground ? undefined : color}
      isInteractive={!disabled}
      padding={2}
      parentColor={colorIsBackground ? color : undefined}
      ref={ref as Ref<HTMLButtonElement>}
      role="button"
      sx={mergeSX(
        {
          cursor: disabled ? 'not-allowed' : undefined,
          flex: 0,
          label: 'IconButton',
          opacity: disabled ? theme.disabledOpacity : undefined,
          outline: 'none',
        },
        sx,
      )}
      {...elementProps}
      {...rest}
    >
      <Icon
        block
        color={color}
        colorIsBackground={colorIsBackground}
        icon={icon}
        size={size}
      />
    </Box>
  );
});
