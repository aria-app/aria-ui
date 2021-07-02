import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Tab, TabProps } from '../../src';

export default {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
} as Meta;

export const Default: Story<TabProps> = (args) => <Tab {...args} />;

Default.args = {
  disabled: false,
  isSelected: false,
  label: 'Tab Label',
  value: 'tab value',
};

export const Selected: Story<TabProps> = (args) => <Tab {...args} />;

Selected.args = {
  ...Default.args,
  isSelected: true,
};

export const Disabled: Story<TabProps> = (args) => <Tab {...args} />;

Disabled.args = {
  ...Default.args,
  disabled: true,
};
