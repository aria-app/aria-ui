import React, { forwardRef, MouseEvent, useCallback } from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { NavigationItem, NavigationItemItem } from './NavigationItem';
import { Stack } from './Stack';

export interface BottomNavigationProps extends BoxProps<'nav'> {
  items?: NavigationItemItem[];
  onValueChange: (value: string, e: MouseEvent<HTMLElement>) => void;
  value?: string;
}

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation(props, ref) {
    const { items = [], onValueChange, sx, value, ...rest } = props;

    const getIsSelected = useCallback<(item: NavigationItemItem) => boolean>(
      item => item.value === value,
      [value],
    );

    const handleItemSelect = useCallback<
      (item: NavigationItemItem, e: MouseEvent<HTMLElement>) => void
    >(
      (item, e) => {
        onValueChange(item.value, e);
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
              isSelected={getIsSelected(item)}
              item={item}
              key={`${item.label}${index}`}
              onSelect={handleItemSelect}
              sx={{
                flexBasis: `${(1 / items.length) * 100}%`,
                label: 'BottomNavigationItem',
              }}
            />
          ))}
        </Stack>
      </Box>
    );
  },
);
