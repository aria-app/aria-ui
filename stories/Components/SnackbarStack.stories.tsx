import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SnackbarStack, SnackbarStackProps } from '../../src';

export default {
  title: 'Components/SnackbarStack',
  component: SnackbarStack,
  argTypes: {
    onItemsChange: { action: 'onItemsChange' },
  },
} as Meta;

export const Default: Story<SnackbarStackProps> = (args) => (
  <SnackbarStack {...args} />
);

Default.args = {
  items: [
    {
      id: '1',
      message: 'Your progress was saved',
      status: 'success',
    },
    {
      id: '2',
      message: 'There are new items available in the shop',
    },
    {
      id: '3',
      message: 'Inventory almost full',
      status: 'warning',
    },
    {
      id: '4',
      message: 'Health low',
      status: 'error',
    },
  ],
};
