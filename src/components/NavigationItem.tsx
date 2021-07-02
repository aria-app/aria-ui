import React, {
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useCallback,
} from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { Icon } from './Icon';
import { MotionBox } from './MotionBox';
import { Stack } from './Stack';
import { Text } from './Text';

export type NavigationItemValue = number | string;

export interface NavigationItemItem {
  icon: ReactElement;
  label?: string;
  value: NavigationItemValue;
}

export type NavigationItemOnSelect = (
  selectedValue: NavigationItemValue,
  e: MouseEvent<HTMLElement>,
) => void;

export interface NavigationItemProps extends Omit<BoxProps<'li'>, 'onSelect'> {
  icon: ReactElement;
  isSelected?: boolean;
  label?: string;
  value: NavigationItemValue;
  onSelect?: NavigationItemOnSelect;
}

export const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  function NavigationItem(props, ref) {
    const { icon, isSelected, label, onSelect, sx, value, ...rest } = props;

    const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
      (e) => {
        onSelect?.(value, e);
      },
      [onSelect, value],
    );

    return (
      <Box
        as="li"
        isInteractive
        onClick={handleClick}
        padding={4}
        ref={ref}
        sx={mergeSX(
          {
            label: 'NavigationItem',
            listStyle: 'none',
          },
          sx,
        )}
        {...rest}
      >
        <MotionBox
          animate={{ scale: isSelected ? 1 : 0.8 }}
          initial={false}
          transition={{
            damping: 5,
            mass: 1,
            stiffness: 100,
            type: 'spring',
          }}
        >
          <Stack align="center" space={2}>
            <Icon
              color={isSelected ? 'brandContrast' : 'textSecondary'}
              icon={icon}
            />
            {label && (
              <Text
                color={isSelected ? 'brandContrast' : 'textSecondary'}
                variant="label"
              >
                {label}
              </Text>
            )}
          </Stack>
        </MotionBox>
      </Box>
    );
  },
);
