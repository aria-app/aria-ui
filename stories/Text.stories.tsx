import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Text, TextProps } from '../src';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default: Story<TextProps> = args => <Text {...args} />;

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
};
