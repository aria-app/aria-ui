import { Meta, Story } from '@storybook/react';
import AccountBoxIcon from 'mdi-react/AccountBoxIcon';
import React from 'react';

import { NavigationItem, NavigationItemProps } from '../../src';

export default {
  title: 'Components/NavigationItem',
  component: NavigationItem,
  argTypes: {
    icon: { table: { disable: true } },
    onSelect: { action: 'onSelect' },
  },
} as Meta;

export const Default: Story<NavigationItemProps> = args => (
  <NavigationItem {...args} />
);

Default.args = {
  icon: <AccountBoxIcon />,
  isSelected: false,
  label: 'Profile',
  value: 'profile',
};

export const Selected: Story<NavigationItemProps> = args => (
  <NavigationItem {...args} />
);

Selected.args = {
  ...Default.args,
  isSelected: true,
};
