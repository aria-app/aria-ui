import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, TextField, TextFieldProps } from '../src';

export default {
  title: 'TextField',
  component: TextField,
} as Meta;

export const Default: Story<TextFieldProps> = args => (
  <Box backgroundColor="backgroundContrast" borderRadius="md" padding={8}>
    <TextField {...args} />
  </Box>
);

Default.args = {
  placeholder: 'Placeholder text',
};
