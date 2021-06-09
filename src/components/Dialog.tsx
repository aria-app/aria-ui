import { AnimatePresence } from 'framer-motion';
import React, { forwardRef, MouseEventHandler, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { Box, BoxProps } from './Box';
import { Button } from './Button';
import { MotionBox } from './MotionBox';
import { Overlay } from './Overlay';
import { Stack } from './Stack';
import { Text } from './Text';

export type DialogMaxWidth = 'lg' | 'md' | 'sm' | number;

export interface DialogProps extends Omit<BoxProps<'aside'>, 'title'> {
  cancelText?: string;
  confirmText?: string;
  fullWidth?: boolean;
  id?: any;
  isContentPadded?: boolean;
  isOpen?: boolean;
  maxWidth?: DialogMaxWidth;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  portalContainer?: Element;
  title?: string;
  windowProps?: BoxProps<'div'>;
}

export const Dialog = forwardRef<HTMLElement, DialogProps>(function Dialog(
  props,
  ref,
) {
  const {
    cancelText = 'Cancel',
    children,
    confirmText = 'Confirm',
    fullWidth = false,
    id: idProp,
    isContentPadded = true,
    isOpen,
    maxWidth,
    onCancel,
    onConfirm,
    portalContainer = document.body,
    sx,
    title = '',
    windowProps = {},
    ...rest
  } = props;
  const theme = useThemeWithDefault();

  const id = idProp || title?.replace(/ /g, '') || undefined;

  const windowMaxWidth = useMemo(() => {
    if (typeof maxWidth === 'number' || !maxWidth) {
      return maxWidth;
    }

    return {
      lg: 900,
      md: 600,
      sm: 480,
    }[maxWidth];
  }, [maxWidth]);

  return createPortal(
    <Box
      as="aside"
      ref={ref}
      sx={mergeSX(
        {
          bottom: 0,
          display: 'flex',
          label: 'Dialog',
          left: 0,
          pointerEvents: 'none',
          position: 'absolute',
          right: 0,
          top: 0,
        },
        sx,
      )}
      {...rest}
    >
      <Overlay isVisible={isOpen} sx={{ zIndex: 9 }} />
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            animate={{ opacity: 1 }}
            aria-labelledby={`${id}__title`}
            aria-modal="true"
            backgroundColor="backgroundContrast"
            borderRadius="md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            role="dialog"
            transition={{ bounce: 0 }}
            {...windowProps}
            sx={mergeSX(
              {
                left: '50%',
                maxWidth: windowMaxWidth,
                pointerEvents: 'all',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: fullWidth
                  ? `calc(100% - ${theme.space(24)}px)`
                  : undefined,
                zIndex: 10,
              },
              windowProps.sx,
            )}
          >
            <Stack space={6}>
              {title && (
                <Box paddingTop={6} paddingX={6}>
                  <Text variant="header">{title}</Text>
                </Box>
              )}
              <Box paddingX={isContentPadded ? 6 : undefined}>{children}</Box>
              {(onCancel || onConfirm) && (
                <Box paddingBottom={4} paddingX={6} sx={{ display: 'flex' }}>
                  <Stack direction="row" space={2} sx={{ marginLeft: 'auto' }}>
                    <Button onClick={onCancel} text={cancelText} />
                    <Button
                      onClick={onConfirm}
                      text={confirmText}
                      variant="contained"
                    />
                  </Stack>
                </Box>
              )}
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>,
    portalContainer,
  );
});
