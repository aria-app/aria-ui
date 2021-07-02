import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Text, Tooltip, TooltipProps } from '../../src';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [(Story) => <Box padding={16}>{Story()}</Box>],
} as Meta;

export const Default: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <Text>Hover me</Text>
  </Tooltip>
);

Default.args = {
  text: 'Tooltip Text',
};

export const Open: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <Text>Hover me</Text>
  </Tooltip>
);

Open.args = {
  text: 'Tooltip Text',
  visible: true,
};

export const Closed: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <Text>Hover me</Text>
  </Tooltip>
);

Closed.args = {
  ...Default.args,
  visible: false,
};

export const CustomContent: Story<TooltipProps> = (args) => (
  <Tooltip content={<Text color="error">Something went wrong!</Text>} {...args}>
    <Text>Hover me</Text>
  </Tooltip>
);

CustomContent.args = {
  ...Default.args,
};
