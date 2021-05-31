import { Meta, Story } from '@storybook/react';
import React, { ElementType } from 'react';

import { Text, TextProps } from '../src';
import { colors, textVariants } from './constants';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: {
        type: 'select',
      },
      options: colors,
    },
    variant: {
      control: {
        type: 'select',
      },
      options: textVariants,
    },
  },
} as Meta;

export const Default: Story<TextProps<ElementType>> = args => (
  <Text {...args} />
);

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
  color: 'textPrimary',
  component: 'span',
  variant: 'body',
};
