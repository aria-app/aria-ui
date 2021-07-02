import { AnimatePresence } from 'framer-motion';
import React, { forwardRef, useCallback } from 'react';

import { mergeSX } from '../helpers';
import { Status } from '../types';
import { Box, BoxProps } from './Box';
import { MotionBox } from './MotionBox';
import { Snackbar, SnackbarOnDismiss } from './Snackbar';
import { Stack } from './Stack';

export interface SnackbarStackItem {
  id: number;
  message: string;
  status?: Status;
}

export interface SnackbarStackProps extends BoxProps<'div'> {
  items?: SnackbarStackItem[];
  onItemsChange?: (items?: SnackbarStackItem[]) => void;
}

export const SnackbarStack = forwardRef<HTMLDivElement, SnackbarStackProps>(
  function SnackbarStack(props, ref) {
    const { items = [], onItemsChange, sx, ...rest } = props;

    const handleSnackbarDismiss = useCallback<SnackbarOnDismiss>(
      (dismissedId) => {
        onItemsChange?.(items.filter((item) => item.id !== dismissedId));
      },
      [items, onItemsChange],
    );

    return (
      <Box
        as="div"
        ref={ref}
        sx={mergeSX(
          {
            label: 'SnackbarStack',
          },
          sx,
        )}
        {...rest}
      >
        <Stack direction="column-reverse" space={2}>
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <MotionBox
                initial={{ opacity: 0, scale: 0.3, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                key={item.id}
                layout
              >
                <Snackbar
                  message={item.message}
                  messageId={item.id}
                  onDismiss={handleSnackbarDismiss}
                  status={item.status}
                />
              </MotionBox>
            ))}
          </AnimatePresence>
        </Stack>
      </Box>
    );
  },
);
