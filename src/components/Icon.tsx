import { useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { cloneElement, forwardRef, ReactElement } from 'react';

import { Text, TextProps } from './Text';

export type IconSize = 'lg' | 'md' | 'sm';

export interface IconProps extends Omit<TextProps, 'size' | 'variant'> {
  icon?: ReactElement;
  size?: IconSize;
}

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { icon, size = 'md', sx, ...rest } = props;
  const theme = useTheme();

  if (!icon) return null;

  return (
    <Text ref={ref} sx={merge({ label: 'Icon', lineHeight: 0 }, sx)} {...rest}>
      {cloneElement(icon, {
        size: theme.space({ lg: 8, md: 6, sm: 4 }[size]),
        style: { fill: 'currentcolor' },
      })}
    </Text>
  );
});
