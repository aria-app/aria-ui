import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Checkbox, CheckboxProps } from '../../src';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    onIsCheckedChange: { action: 'onIsCheckedChange' },
  },
} as Meta;

export const Default: Story<CheckboxProps> = args => <Checkbox {...args} />;

Default.args = {
  isChecked: true,
  label: 'Checkbox label',
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
