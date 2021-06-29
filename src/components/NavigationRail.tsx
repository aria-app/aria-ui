import React, { forwardRef, MouseEvent, useCallback } from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { NavigationItem, NavigationItemItem } from './NavigationItem';
import { Stack } from './Stack';

export interface NavigationRailProps extends BoxProps<'nav'> {
  items?: NavigationItemItem[];
  onValueChange: (value: string, e: MouseEvent<HTMLElement>) => void;
  value?: string;
}

export const NavigationRail = forwardRef<HTMLElement, NavigationRailProps>(
  function NavigationRail(props, ref) {
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
              isSelected={getIsSelected(item)}
              item={item}
              key={`${item.label}${index}`}
              onSelect={handleItemSelect}
            />
          ))}
        </Stack>
      </Box>
    );
  },
);
