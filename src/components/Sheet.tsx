import { AnimatePresence } from 'framer-motion';
import { merge } from 'lodash';
import React, { forwardRef, MouseEventHandler, useMemo } from 'react';

import { useScreenSizeType } from '../hooks';
import { Spacing } from '../types';
import { Box, BoxProps } from './Box';
import { MotionBox } from './MotionBox';
import { Overlay } from './Overlay';

export interface SheetProps extends BoxProps<'div'> {
  isOpen?: boolean;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  rightPanelWidth?: Spacing;
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  props,
  ref,
) {
  const {
    children,
    isOpen = false,
    onOverlayClick,
    rightPanelWidth = 80,
    sx,
    ...rest
  } = props;
  const screenSizeType = useScreenSizeType();
  const duration = 0.25;

  const scrollWellScreenSizeProps = useMemo(() => {
    if (screenSizeType === 'sm') {
      return {
        animate: { overflowY: isOpen ? 'auto' : 'hidden' },
        transition: { delay: isOpen ? duration : undefined },
      };
    }

    return {};
  }, [isOpen, screenSizeType]);

  const scrollWellScreenSizeSx = useMemo(() => {
    if (screenSizeType === 'sm') {
      return {
        overflowX: 'hidden',
      };
    }

    return {
      overflow: 'hidden',
    };
  }, [screenSizeType]);

  const sheetScreenSizeProps = useMemo(() => {
    if (screenSizeType === 'sm') {
      return {
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: '100%' },
        initial: { opacity: 0, x: 0, y: '100%' },
      };
    }

    return {
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: '100%', y: 0 },
      initial: { opacity: 0, x: '100%', y: 0 },
    };
  }, [screenSizeType]);

  return (
    <Box
      ref={ref}
      sx={merge(
        {
          height: '100%',
          label: 'Sheet',
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
        },
        sx,
      )}
      {...rest}
    >
      <Overlay isVisible={isOpen} transition={{ duration }} />
      <MotionBox
        paddingTop={['calc(100vh - 320px)', undefined]}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          label: 'Sheet',
          left: 0,
          pointerEvents: isOpen ? 'all' : 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
          ...scrollWellScreenSizeSx,
        }}
        {...scrollWellScreenSizeProps}
      >
        {isOpen && onOverlayClick && (
          <Box
            onClick={onOverlayClick}
            sx={{
              bottom: 0,
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 1,
            }}
          />
        )}
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              backgroundColor="backgroundContrast"
              borderTopLeftRadius={['md', undefined]}
              borderTopRightRadius={['md', undefined]}
              height={[undefined, '100%']}
              marginLeft={[undefined, 'auto']}
              marginTop={['auto', undefined]}
              sx={{
                overflowY: screenSizeType === 'sm' ? undefined : 'auto',
                position: 'relative',
                zIndex: 2,
              }}
              transition={{ duration, type: 'spring', bounce: 0 }}
              width={['auto', rightPanelWidth]}
              {...sheetScreenSizeProps}
            >
              {children}
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
});
