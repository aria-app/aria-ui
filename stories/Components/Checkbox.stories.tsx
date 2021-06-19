import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Checkbox, CheckboxProps } from '../../src';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    labelSide: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
    },
    onIsCheckedChange: { action: 'onIsCheckedChange' },
  },
} as Meta;

export const Default: Story<CheckboxProps> = args => <Checkbox {...args} />;

Default.args = {
  disabled: false,
  isChecked: true,
  label: 'Checkbox label',
  labelSide: 'right',
};

export const Disabled: Story<CheckboxProps> = args => <Checkbox {...args} />;

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const MultilineLabel: Story<CheckboxProps> = args => (
  <Box sx={{ maxWidth: 320 }}>
    <Checkbox {...args} />
  </Box>
);

MultilineLabel.args = {
  ...Default.args,
  label:
    'This is a long label that will cause wrapping when the checkbox is used',
};
