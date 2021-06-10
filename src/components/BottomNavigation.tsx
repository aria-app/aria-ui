import React, {
  FC,
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  useCallback,
} from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { Icon, IconProps } from './Icon';
import { MotionBox } from './MotionBox';
import { Stack } from './Stack';
import { Text } from './Text';

export interface NavigationItem {
  icon: IconProps['icon'];
  label?: string;
  name: string;
}

interface BottomNavigationItemProps {
  isSelected: boolean;
  item: NavigationItem;
  itemCount: number;
  onSelect: (item: NavigationItem, e: MouseEvent<HTMLElement>) => void;
}

const BottomNavigationItem: FC<BottomNavigationItemProps> = props => {
  const { isSelected, item, itemCount, onSelect } = props;
  const { icon, label } = item;

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    e => {
      if (isSelected) return;

      onSelect(item, e);
    },
    [isSelected, item, onSelect],
  );

  return (
    <Box
      isInteractive
      onClick={handleClick}
      padding={4}
      sx={{
        flexBasis: `${(1 / itemCount) * 100}%`,
        label: 'BottomNavigationItem',
      }}
    >
      <MotionBox
        animate={{ scale: isSelected ? 1 : 0.8 }}
        initial={false}
        transition={{
          damping: 5,
          mass: 1,
          stiffness: 50,
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
};

export interface BottomNavigationProps extends BoxProps<'nav'> {
  items?: NavigationItem[];
  onSelectedNameChange: (name: string, e: MouseEvent<HTMLElement>) => void;
  selectedName?: string;
}

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation(props, ref) {
    const {
      items = [],
      onSelectedNameChange,
      selectedName,
      sx,
      ...rest
    } = props;

    const getIsSelected = useCallback<(item: NavigationItem) => boolean>(
      ({ name }) => name === selectedName,
      [selectedName],
    );

    const handleItemSelect = useCallback<
      (item: NavigationItem, e: MouseEvent<HTMLElement>) => void
    >(
      ({ name }, e) => {
        onSelectedNameChange(name, e);
      },
      [onSelectedNameChange],
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
            <BottomNavigationItem
              isSelected={getIsSelected(item)}
              item={item}
              itemCount={items.length}
              key={`${item.label}${index}`}
              onSelect={handleItemSelect}
            />
          ))}
        </Stack>
      </Box>
    );
  },
);
