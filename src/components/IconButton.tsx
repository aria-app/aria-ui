import { merge } from 'lodash';
import React, { forwardRef, MouseEventHandler } from 'react';

import { Box, BoxProps } from './Box';
import { Icon, IconProps } from './Icon';

export interface IconButtonProps extends Omit<BoxProps<'button'>, 'size'> {
  color?: IconProps['color'];
  colorIsBackground?: IconProps['colorIsBackground'];
  disabled?: boolean;
  icon?: IconProps['icon'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: IconProps['size'];
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      color,
      colorIsBackground,
      disabled,
      icon,
      onClick,
      size,
      sx,
      ...rest
    } = props;

    return (
      <Box
        backgroundColor="transparent"
        borderRadius="md"
        component="button"
        isInteractive={!!onClick}
        onClick={onClick}
        padding={2}
        ref={ref}
        sx={merge(
          {
            border: 0,
            cursor: disabled ? 'not-allowed' : undefined,
            label: 'IconButton',
            opacity: disabled ? 0.5 : undefined,
          },
          sx,
        )}
        {...rest}
      >
        <Icon
          color={color}
          colorIsBackground={colorIsBackground}
          icon={icon}
          size={size}
          sx={{ display: 'block' }}
        />
      </Box>
    );
  },
);
