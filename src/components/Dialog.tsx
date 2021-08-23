import FocusTrap from 'focus-trap-react';
import { AnimatePresence } from 'framer-motion';
import CloseIcon from 'mdi-react/CloseIcon';
import React, {
  forwardRef,
  MouseEventHandler,
  RefCallback,
  useCallback,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';

import { mergeSX } from '../helpers';
import { useScreenSizeType, useThemeWithDefault } from '../hooks';
import { DialogFocusedButton } from '../types';
import { Box, BoxProps } from './Box';
import { Button, ButtonProps } from './Button';
import { IconButton, IconButtonProps } from './IconButton';
import { MotionBox } from './MotionBox';
import { Overlay } from './Overlay';
import { Stack } from './Stack';
import { Text } from './Text';

export type DialogMaxWidth = 'auto' | 'lg' | 'md' | 'sm' | number;

export interface DialogProps extends Omit<BoxProps<'aside'>, 'title'> {
  cancelProps?: ButtonProps;
  cancelText?: string;
  closeProps?: IconButtonProps;
  confirmProps?: ButtonProps;
  confirmText?: string;
  focusedButton?: DialogFocusedButton;
  id?: any;
  isContentPadded?: boolean;
  isFocusTrapped?: boolean;
  isFullWidth?: boolean;
  isOpen?: boolean;
  maxWidth?: DialogMaxWidth;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onCloseComplete?: () => void;
  onOverlayClick?: MouseEventHandler<HTMLElement>;
  portalContainer?: Element;
  title?: string;
  windowProps?: BoxProps<'div'>;
}

export const Dialog = forwardRef<HTMLElement, DialogProps>(function Dialog(
  props,
  ref,
) {
  const {
    cancelProps = {},
    cancelText = 'Cancel',
    children,
    confirmProps = {},
    confirmText = 'Confirm',
    focusedButton = 'confirm',
    id: idProp,
    isContentPadded = true,
    isFocusTrapped,
    isFullWidth = true,
    isOpen,
    maxWidth = 'md',
    onCancel,
    onClose,
    onConfirm,
    onCloseComplete,
    onOverlayClick,
    portalContainer = document.body,
    sx,
    title = '',
    windowProps = {},
    ...rest
  } = props;
  const screenSizeType = useScreenSizeType();
  const theme = useThemeWithDefault();

  const id = idProp || title?.replace(/ /g, '') || undefined;

  const windowMaxWidth = useMemo(() => {
    if (maxWidth === 'auto' || typeof maxWidth === 'number') {
      return maxWidth;
    }

    return {
      lg: 768,
      md: 480,
      sm: 320,
    }[maxWidth];
  }, [maxWidth]);

  const windowPaddingBottom = useMemo(() => {
    if (isContentPadded) return 6;

    return onCancel || onConfirm ? 6 : undefined;
  }, [isContentPadded, onCancel, onConfirm]);

  const windowPaddingTop = useMemo(() => {
    if (isContentPadded) return 6;

    return title ? 6 : undefined;
  }, [isContentPadded, title]);

  const windowWidth = useMemo(() => {
    if (!isFullWidth) return undefined;

    const paddingX = theme.space(
      {
        lg: 12,
        md: 12,
        sm: 6,
      }[screenSizeType],
    ) as number;

    return `calc(100% - ${paddingX * 2}px)`;
  }, [isFullWidth, screenSizeType, theme]);

  const handleCancelButtonRef = useCallback<RefCallback<HTMLElement>>(
    (ref) => {
      if (!ref) return;

      if (focusedButton === 'cancel') {
        ref.focus();
      }
    },
    [focusedButton],
  );

  const handleConfirmButtonRef = useCallback<RefCallback<HTMLElement>>(
    (ref) => {
      if (!ref) return;

      if (focusedButton === 'confirm') {
        ref.focus();
      }
    },
    [focusedButton],
  );

  const handleWindowAnimationComplete = useCallback(
    ({ opacity }) => {
      if (opacity === 0) {
        onCloseComplete?.();
      }
    },
    [onCloseComplete],
  );

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
      <Overlay isVisible={isOpen} sx={{ zIndex: 1 }} />
      {isOpen && onOverlayClick && (
        <Box
          data-testid="aria-ui-dialog-overlay"
          onClick={onOverlayClick}
          sx={{
            bottom: 0,
            left: 0,
            pointerEvents: 'all',
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 2,
          }}
        />
      )}
      <AnimatePresence>
        {isOpen && (
          <FocusTrap active={isFocusTrapped || !!onCancel || !!onConfirm}>
            <MotionBox
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              aria-labelledby={`${id}__title`}
              aria-modal="true"
              backgroundColor="backgroundContrast"
              borderRadius="md"
              exit={{ opacity: 0, scale: 0.1, x: '-50%', y: '-50%' }}
              initial={{ opacity: 0, scale: 0.1, x: '-50%', y: '-50%' }}
              onAnimationComplete={handleWindowAnimationComplete}
              paddingBottom={windowPaddingBottom}
              paddingTop={windowPaddingTop}
              role="dialog"
              {...windowProps}
              sx={mergeSX(
                {
                  left: '50%',
                  maxWidth: windowMaxWidth,
                  pointerEvents: 'all',
                  position: 'absolute',
                  top: '50%',
                  width: windowWidth,
                  zIndex: 3,
                },
                windowProps.sx,
              )}
            >
              <Stack space={8}>
                {(title || onClose) && (
                  <Box paddingX={6}>
                    <Stack align="center" direction="row" space={4}>
                      <Text sx={{ flexGrow: 1 }} variant="header">
                        {title}
                      </Text>
                      {onClose && (
                        <IconButton
                          icon={<CloseIcon />}
                          margin={-3}
                          onClick={onClose}
                        />
                      )}
                    </Stack>
                  </Box>
                )}
                <Box paddingX={isContentPadded ? 6 : undefined}>{children}</Box>
                {(onCancel || onConfirm) && (
                  <Box paddingX={6} sx={{ display: 'flex' }}>
                    <Stack
                      direction="row"
                      space={4}
                      sx={{ marginLeft: 'auto' }}
                    >
                      {onCancel && (
                        <Button
                          onClick={onCancel}
                          ref={handleCancelButtonRef}
                          text={cancelText}
                          {...cancelProps}
                        />
                      )}
                      {onConfirm && (
                        <Button
                          onClick={onConfirm}
                          ref={handleConfirmButtonRef}
                          text={confirmText}
                          variant="contained"
                          {...confirmProps}
                        />
                      )}
                    </Stack>
                  </Box>
                )}
              </Stack>
            </MotionBox>
          </FocusTrap>
        )}
      </AnimatePresence>
    </Box>,
    portalContainer,
  );
});
