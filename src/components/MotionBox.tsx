import { motion, MotionProps } from 'framer-motion';
import { ElementType } from 'react';

import { Merge } from '../types';
import { Box, BoxProps, defaultBoxElement } from './Box';

export type MotionBoxProps<
  E extends ElementType = typeof defaultBoxElement
> = Merge<BoxProps<E>, MotionProps>;

export const MotionBox = motion(Box);
