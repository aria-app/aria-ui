import React, { forwardRef, MouseEvent, useCallback } from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import {
  NavigationItem,
  NavigationItemItem,
  NavigationItemOnSelect,
  NavigationItemValue,
} from './NavigationItem';
import { Stack } from './Stack';

export interface NavigationRailProps extends BoxProps<'nav'> {
  items?: NavigationItemItem[];
  onValueChange: (
    value: NavigationItemValue,
    e: MouseEvent<HTMLElement>,
  ) => void;
  value?: NavigationItemValue;
}

export const NavigationRail = forwardRef<HTMLElement, NavigationRailProps>(
  function NavigationRail(props, ref) {
    const { items = [], onValueChange, sx, value, ...rest } = props;

    const getIsSelected = useCallback<(item: NavigationItemValue) => boolean>(
      (itemValue) => itemValue === value,
      [value],
    );

    const handleItemSelect = useCallback<NavigationItemOnSelect>(
      (selectedValue, e) => {
        onValueChange(selectedValue, e);
      },
      [onValueChange],
    );

    return (
      <Box
        as="nav"
        backgroundColor="backgroundContrast"
        ref={ref}
        sx={mergeSX(
          {
            display: 'flex',
            flex: 0,
            flexDirection: 'column',
            label: 'NavigationRail',
          },
          sx,
        )}
        {...rest}
      >
        <Stack as="ul">
          {items.map((item, index) => (
            <NavigationItem
              icon={item.icon}
              label={item.label}
              isSelected={getIsSelected(item.value)}
              key={`${item.label}${index}`}
              onSelect={handleItemSelect}
              sx={{
                label: 'NavigationRailItem',
              }}
              value={item.value}
            />
          ))}
        </Stack>
      </Box>
    );
  },
);
