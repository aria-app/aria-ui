import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Text, Tooltip, TooltipProps } from '../../src';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as Meta;

export const Default: Story<TooltipProps> = args => (
  <Tooltip {...args}>
    <Text>Hover me</Text>
  </Tooltip>
);

Default.args = {
  text: 'Tooltip Text',
};
