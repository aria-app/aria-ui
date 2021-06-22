import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Tab, Tabs, TabsProps } from '../../src';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    direction: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
    },
    onValueChange: { action: 'onValueChange' },
    value: {
      control: { type: 'inline-radio' },
      options: ['a', 'b', 'c'],
    },
  },
} as Meta;

export const Default: Story<TabsProps> = args => (
  <Tabs {...args}>
    <Tab label="Alpha" value="a" />
    <Tab label="Bravo" value="b" />
    <Tab label="Charlie" value="c" />
  </Tabs>
);

Default.args = {
  direction: 'horizontal',
  value: 'a',
};

export const WithDisabled: Story<TabsProps> = args => (
  <Tabs {...args}>
    <Tab label="Alpha" value="a" />
    <Tab disabled label="Bravo" value="b" />
    <Tab label="Charlie" value="c" />
  </Tabs>
);

WithDisabled.args = {
  ...Default.args,
};

export const Vertical: Story<TabsProps> = args => (
  <Box sx={{ width: 240 }}>
    <Tabs {...args}>
      <Tab label="Alpha" value="a" />
      <Tab label="Bravo" value="b" />
      <Tab label="Charlie" value="c" />
    </Tabs>
  </Box>
);

Vertical.args = {
  ...Default.args,
  direction: 'vertical',
};
