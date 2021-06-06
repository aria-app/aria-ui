import { Meta, Story } from '@storybook/react';
import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';

import { Box, ListItem, ListItemProps } from '../../src';

export default {
  title: 'Components/ListItem',
  component: ListItem,
  argTypes: {
    primaryText: { control: { type: 'text' } },
    secondaryText: { control: { type: 'text' } },
    startIcon: { table: { disable: true } },
  },
} as Meta;

export const Default: Story<ListItemProps> = args => (
  <Box backgroundColor="backgroundContrast" borderRadius="sm">
    <ListItem {...args} />
  </Box>
);

Default.args = {
  primaryText: 'Some Primary Text',
  secondaryText: 'Some Secondary Text',
  startIcon: <HomeIcon />,
};
