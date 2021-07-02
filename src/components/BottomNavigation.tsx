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

export interface BottomNavigationProps extends BoxProps<'nav'> {
  items?: NavigationItemItem[];
  onValueChange: (
    value: NavigationItemValue,
    e: MouseEvent<HTMLElement>,
  ) => void;
  value?: NavigationItemValue;
}

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation(props, ref) {
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
            justifyContent: 'center',
            label: 'BottomNavigation',
          },
          sx,
        )}
        {...rest}
      >
        <Stack direction="row" sx={{ maxWidth: 480, width: '100%' }}>
          {items.map((item, index) => (
            <NavigationItem
              icon={item.icon}
              label={item.label}
              isSelected={getIsSelected(item.value)}
              key={`${item.label}${index}`}
              onSelect={handleItemSelect}
              sx={{
                flexBasis: `${(1 / items.length) * 100}%`,
                label: 'BottomNavigationItem',
              }}
              value={item.value}
            />
          ))}
        </Stack>
      </Box>
    );
  },
);
