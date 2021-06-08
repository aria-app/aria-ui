import { Meta, Story } from '@storybook/react';
import FruitCitrusIcon from 'mdi-react/FruitCitrusIcon';
import React from 'react';

import { Box, Select, SelectProps } from '../../src';

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ],
  },
  argTypes: {
    onValueChange: { action: 'onValueChange' },
    startIcon: { table: { disable: true } },
  },
} as Meta;

export const Default: Story<SelectProps> = args => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="md"
    padding={8}
    sx={{ maxWidth: 320, width: '100vw' }}
  >
    <Select {...args} />
  </Box>
);

Default.args = {
  label: 'Some label text',
  options: [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
  ],
  secondaryLabel: 'A secondary label',
  value: 1,
};

export const WithStartIcon: Story<SelectProps> = args => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="md"
    padding={8}
    sx={{ maxWidth: 320, width: '100vw' }}
  >
    <Select {...args} />
  </Box>
);

WithStartIcon.args = {
  startIcon: <FruitCitrusIcon />,
};
