import { merge } from 'lodash';
import React, {
  forwardRef,
  MouseEventHandler,
  ReactElement,
  useMemo,
} from 'react';

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
  onClick?: MouseEventHandler<HTMLElement>;
  onEndIconClick?: MouseEventHandler<HTMLButtonElement>;
  onStartIconClick?: MouseEventHandler<HTMLButtonElement>;
  parentColor?: BoxProps<'li'>['parentColor'];
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
      onClick,
      onEndIconClick,
      onStartIconClick,
      parentColor,
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

    const iconPaddingCorrection = useMemo(
      () => (secondaryText && primaryText ? -1 : -3),
      [primaryText, secondaryText],
    );

    return (
      <Box
        component="li"
        ref={ref}
        paddingX={4}
        paddingY={4}
        sx={merge(
          {
            display: 'flex',
            label: 'ListItem',
            listStyle: 'none',
            minHeight: 48,
            position: 'relative',
          },
          sx,
        )}
        {...rest}
      >
        {onClick && (
          <Box
            isInteractive
            onClick={onClick}
            parentColor={parentColor}
            sx={{
              bottom: 0,
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 1,
            }}
          />
        )}
        <Stack align="center" direction="row" space={2} sx={{ flex: 1 }}>
          {startIcon && (
            <IconButton
              color={startIconColor}
              icon={startIcon}
              isInteractive={!!onStartIconClick}
              marginLeft={iconPaddingCorrection}
              marginY={iconPaddingCorrection}
              onClick={onStartIconClick}
              size={startIconSize}
              sx={{
                pointerEvents: onStartIconClick ? undefined : 'none',
                position: 'relative',
                zIndex: 2,
              }}
            />
          )}
          <Stack space={3} sx={{ flex: 1 }}>
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
              isInteractive={!!onEndIconClick}
              marginRight={iconPaddingCorrection}
              marginY={iconPaddingCorrection}
              onClick={onEndIconClick}
              size={endIconSize}
              sx={{
                pointerEvents: onEndIconClick ? undefined : 'none',
                position: 'relative',
                zIndex: 2,
              }}
            />
          )}
        </Stack>
      </Box>
    );
  },
);
