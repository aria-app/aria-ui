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

export interface NavigationItemItem {
  icon: ReactElement;
  label?: string;
  name: string;
}

export interface NavigationItemProps extends Omit<BoxProps<'li'>, 'onSelect'> {
  isSelected?: boolean;
  item: NavigationItemItem;
  onSelect?: (item: NavigationItemItem, e: MouseEvent<HTMLElement>) => void;
}

export const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  function NavigationItem(props, ref) {
    const { isSelected, item, onSelect, sx } = props;
    const { icon, label } = item;

    const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
      e => {
        onSelect?.(item, e);
      },
      [item, onSelect],
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
