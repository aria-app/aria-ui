import React, { forwardRef, MouseEvent, MouseEventHandler } from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { Box, BoxProps } from './Box';
import { MotionBox } from './MotionBox';
import { Text } from './Text';

export type TabOnSelect = (
  value: number | string,
  e: MouseEvent<HTMLDivElement>,
) => void;

export interface TabProps extends Omit<BoxProps<'div'>, 'onSelect'> {
  disabled?: boolean;
  isSelected?: boolean;
  label: string;
  onSelect?: TabOnSelect;
  value: number | string;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(function Tab(
  props,
  ref,
) {
  const { disabled, isSelected, label, onSelect, sx, value, ...rest } = props;
  const theme = useThemeWithDefault();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled || isSelected) return;

    onSelect?.(value, e);
  };

  return (
    <Box
      as="div"
      borderRadius="md"
      height={11}
      isInteractive={!disabled}
      onClick={handleClick}
      paddingX={4}
      ref={ref}
      role="tab"
      sx={mergeSX(
        {
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : undefined,
          display: 'flex',
          flexShrink: 0,
          label: 'Tab',
          opacity: disabled ? theme.disabledOpacity : undefined,
          position: 'relative',
        },
        sx,
      )}
      {...rest}
    >
      {isSelected && (
        <MotionBox
          backgroundColor="brandPrimary"
          borderRadius="md"
          layoutId="selectedTab"
          sx={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
      <Text
        color={isSelected ? 'brandPrimary' : undefined}
        colorIsBackground={isSelected}
        sx={{ position: 'relative', zIndex: 1 }}
        variant="label"
      >
        {label}
      </Text>
    </Box>
  );
});
