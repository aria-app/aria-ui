import { Meta, Story } from '@storybook/react';
import React, { ElementType } from 'react';

import { Box, BoxProps } from '../src';

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default: Story<BoxProps<ElementType<any>>> = args => (
  <Box {...args} />
);
Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
  color: 'red',
  component: 'footer',
};
