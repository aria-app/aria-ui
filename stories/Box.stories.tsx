import { Meta, Story } from '@storybook/react';
import React, { ElementType } from 'react';

import { Box, BoxProps } from '../src';
import { colors } from './constants';

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    backgroundColor: {
      control: {
        type: 'select',
      },
      options: colors,
    },
    color: {
      control: {
        type: 'select',
      },
      options: colors,
    },
  },
} as Meta;

export const Default: Story<BoxProps<ElementType>> = args => <Box {...args} />;

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
  backgroundColor: 'backgroundDefault',
  color: 'textPrimary',
  component: 'div',
};
