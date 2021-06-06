import { CSSObject } from '@emotion/react';
import { merge } from 'lodash';
import React, { forwardRef, MouseEventHandler, ReactElement } from 'react';

import { ColorName } from '../types';
import { Box, BoxProps } from './Box';
import { IconSize } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { Text } from './Text';

export interface ListItemProps extends Omit<BoxProps<'li'>, 'ref'> {
  endIcon?: ReactElement;
  endIconColor?: ColorName;
  endIconSize?: IconSize;
  onEndIconClick?: MouseEventHandler<HTMLButtonElement>;
  onStartIconClick?: MouseEventHandler<HTMLButtonElement>;
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
      endIcon,
      endIconColor = 'textSecondary',
      endIconSize = 'md',
      onEndIconClick,
      onStartIconClick,
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

    return (
      <Box
        component="li"
        ref={ref}
        paddingX={4}
        paddingY={4}
        sx={merge<CSSObject, CSSObject | undefined>(
          {
            label: 'ListItem',
            listStyle: 'none',
            position: 'relative',
          },
          sx,
        )}
        {...rest}
      >
        <Box
          isInteractive
          sx={{
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1,
          }}
        />
        <Stack align="center" direction="row" space={2}>
          {startIcon && (
            <IconButton
              color={startIconColor}
              icon={startIcon}
              marginLeft={-1}
              onClick={onStartIconClick}
              size={startIconSize}
            />
          )}
          <Stack space={3}>
            {primaryText && (
              <Box>
                <Text color={primaryTextColor} variant="label">
                  {primaryText}
                </Text>
              </Box>
            )}
            {secondaryText && (
              <Text color={secondaryTextColor}>{secondaryText}</Text>
            )}
          </Stack>
          {endIcon && (
            <IconButton
              color={endIconColor}
              icon={endIcon}
              marginRight={-1}
              onClick={onEndIconClick}
              size={endIconSize}
              sx={{ position: 'relative', zIndex: 3 }}
            />
          )}
        </Stack>
      </Box>
    );
  },
);
