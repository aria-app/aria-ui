import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Select, SelectProps } from '../../src';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    myProp: { control: { type: 'text' } },
  },
} as Meta;

export const Default: Story<SelectProps> = args => <Select {...args} />;

Default.args = {
  options: [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
  ],
  value: 2,
};
