import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, RadioButton, RadioButtonProps } from '../../src';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
} as Meta;

export const Default: Story<RadioButtonProps> = args => (
  <RadioButton {...args} />
);

Default.args = {
  disabled: false,
  isChecked: true,
  label: 'RadioButton label',
  value: 'value',
};

export const Disabled: Story<RadioButtonProps> = args => (
  <RadioButton {...args} />
);

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const MultilineLabel: Story<RadioButtonProps> = args => (
  <Box sx={{ maxWidth: 320 }}>
    <RadioButton {...args} />
  </Box>
);

MultilineLabel.args = {
  ...Default.args,
  label:
    'This is a long label that will cause wrapping when the checkbox is used',
};
