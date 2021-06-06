import { AnimatePresence } from 'framer-motion';
import { merge } from 'lodash';
import React, { forwardRef } from 'react';

import { MotionBox, MotionBoxProps } from './MotionBox';

export interface OverlayProps extends MotionBoxProps<'div'> {
  isVisible?: boolean;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(props, ref) {
    const { isVisible = true, sx, ...rest } = props;

    return (
      <AnimatePresence>
        {isVisible && (
          <MotionBox
            animate={{ opacity: 0.3 }}
            as="div"
            aria-hidden="true"
            backgroundColor="black"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            ref={ref}
            sx={merge(
              {
                bottom: 0,
                label: 'Overlay',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
              },
              sx,
            )}
            transition={{ duration: 0.25 }}
            {...rest}
          />
        )}
      </AnimatePresence>
    );
  },
);
