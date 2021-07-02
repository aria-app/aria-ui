import { AnimatePresence } from 'framer-motion';
import React, { forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { MotionBox, MotionBoxProps } from './MotionBox';

export interface FadeProps extends MotionBoxProps<'div'> {
  in?: any;
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref,
) {
  const { in: inProp, sx, ...rest } = props;

  const isMounted = inProp;

  return (
    <AnimatePresence initial={false}>
      {isMounted && (
        <MotionBox
          animate={{ opacity: 1 }}
          as="div"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          ref={ref}
          sx={mergeSX(
            {
              label: 'Fade',
            },
            sx,
          )}
          {...rest}
        />
      )}
    </AnimatePresence>
  );
});
