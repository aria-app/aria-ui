import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Toggle, ToggleProps } from '../../src';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    labelSide: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
    },
    onIsCheckedChange: { action: 'onIsCheckedChange' },
  },
} as Meta;

export const Default: Story<ToggleProps> = (args) => <Toggle {...args} />;

Default.args = {
  disabled: false,
  isChecked: true,
  label: 'Toggle label',
  labelSide: 'right',
};

export const Disabled: Story<ToggleProps> = (args) => <Toggle {...args} />;

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const MultilineLabel: Story<ToggleProps> = (args) => (
  <Box sx={{ maxWidth: 320 }}>
    <Toggle {...args} />
  </Box>
);

MultilineLabel.args = {
  ...Default.args,
  label:
    'This is a long label that will cause wrapping when the toggle is used',
};
