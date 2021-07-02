import { AnimateSharedLayout } from 'framer-motion';
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  MouseEvent,
  useCallback,
} from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { Tab, TabOnSelect } from './Tab';

export interface TabsProps extends BoxProps<'div'> {
  direction?: 'horizontal' | 'vertical';
  onValueChange: (
    value: number | string | undefined,
    e: MouseEvent<HTMLDivElement>,
  ) => void;
  value: number | string | undefined;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  props,
  ref,
) {
  const {
    children,
    direction = 'horizontal',
    onValueChange,
    sx,
    value,
    ...rest
  } = props;

  const tabChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Tab,
  );

  const handleTabSelect = useCallback<TabOnSelect>(
    (tabValue, e) => {
      onValueChange?.(tabValue, e);
    },
    [onValueChange],
  );

  return (
    <Box
      as="div"
      ref={ref}
      role="tablist"
      sx={mergeSX(
        {
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          label: 'Tabs',
        },
        sx,
      )}
      {...rest}
    >
      <AnimateSharedLayout>
        {tabChildren.map((child) =>
          isValidElement(child)
            ? cloneElement(child, {
                isSelected: child.props.value === value,
                onSelect: handleTabSelect,
              })
            : child,
        )}
      </AnimateSharedLayout>
    </Box>
  );
});
