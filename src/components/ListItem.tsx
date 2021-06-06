import { CSSObject, useTheme } from '@emotion/react';
import { merge } from 'lodash';
import React, { forwardRef, ReactElement } from 'react';

import { ColorName } from '../types';
import { Box, BoxProps } from './Box';
import { Icon, IconSize } from './Icon';
import { Stack } from './Stack';
import { Text } from './Text';

export interface ListItemProps extends Omit<BoxProps<'li'>, 'ref'> {
  primaryText?: string;
  primaryTextColor?: ColorName;
  secondaryText?: string;
  secondaryTextColor?: ColorName;
  startIcon?: ReactElement;
  startIconColor?: ColorName;
  startIconSize?: IconSize;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    const {
      primaryText,
      primaryTextColor = 'textPrimary',
      secondaryText,
      secondaryTextColor = 'textSecondary',
      startIcon,
      startIconColor = 'textSecondary',
      startIconSize = 'md',
      sx,
      ...rest
    } = props;
    const theme = useTheme();

    return (
      <Box
        component="li"
        ref={ref}
        paddingX={4}
        paddingY={4}
        sx={merge<CSSObject, CSSObject | undefined>(
          {
            backgroundColor: theme.colors.border,
            border: 0,
            label: 'ListItem',
            listStyle: 'none',
          },
          sx,
        )}
        {...rest}
      >
        <Stack align="center" direction="row" space={4}>
          {startIcon && (
            <Icon
              color={startIconColor}
              icon={startIcon}
              size={startIconSize}
            />
          )}
          <Stack space={3}>
            {primaryText && (
              <Text color={primaryTextColor} variant="label">
                {primaryText}
              </Text>
            )}
            {secondaryText && (
              <Text color={secondaryTextColor}>{secondaryText}</Text>
            )}
          </Stack>
        </Stack>
      </Box>
    );
  },
);
