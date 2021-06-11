import { Meta, Story } from '@storybook/react';
import AccountBoxIcon from 'mdi-react/AccountBoxIcon';
import React from 'react';

import { NavigationItem, NavigationItemProps } from '../../src';

export default {
  title: 'Components/NavigationItem',
  component: NavigationItem,
  argTypes: {
    item: { table: { disable: true } },
    onSelect: { action: 'onSelect' },
  },
} as Meta;

export const Default: Story<NavigationItemProps> = args => (
  <NavigationItem {...args} />
);

Default.args = {
  isSelected: false,
  item: { icon: <AccountBoxIcon />, label: 'Profile', name: 'profile' },
};
