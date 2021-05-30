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
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

export const Default: Story<TextProps> = args => <Text {...args} />;

Default.args = {
  children: 'Some default text',
};
