import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { useSpring } from 'framer-motion';
import React, { FC, ReactElement, ReactNode } from 'react';
import { Instance } from 'tippy.js';

import { mergeSX } from '../helpers';
import { MotionBox, MotionBoxProps } from './MotionBox';
import { Text } from './Text';

export interface TooltipProps extends TippyProps {
  content?: ReactNode;
  popupProps?: MotionBoxProps<'div'>;
  text?: string;
}

export const Tooltip: FC<TooltipProps> = function Tooltip(props) {
  const { children, content, popupProps = {}, text, ...rest } = props;
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }: Instance) => {
    const cleanup = scale.onChange(value => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  return (
    <Tippy
      animation
      onHide={onHide}
      onMount={onMount}
      render={(attributes: any) => (
        <MotionBox
          backgroundColor="backgroundContrast"
          borderRadius="md"
          padding={2}
          role="tooltip"
          style={{ scale, opacity }}
          sx={mergeSX(
            {
              label: 'Tooltip',
            },
            popupProps?.sx,
          )}
          tabIndex={-1}
          {...attributes}
          {...popupProps}
        >
          {text && !content && <Text variant="helper">{text}</Text>}
          {content}
        </MotionBox>
      )}
      {...rest}
    >
      {children as ReactElement<any>}
    </Tippy>
  );
};
