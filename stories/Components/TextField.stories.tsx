import { Meta, Story } from '@storybook/react';
import SearchIcon from 'mdi-react/SearchIcon';
import SendIcon from 'mdi-react/SendIcon';
import React from 'react';

import { Box, Stack, TextField, TextFieldProps } from '../../src';

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    error: { control: { type: 'text' } },
    onValueChange: { action: 'onValueChange' },
    placeholder: { control: { type: 'text' } },
    success: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    warning: { control: { type: 'text' } },
  },
} as Meta;

export const Default: Story<TextFieldProps> = args => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="md"
    padding={8}
    sx={{ maxWidth: 320, width: '100vw' }}
  >
    <TextField {...args} />
  </Box>
);

Default.args = {
  label: 'Label',
  secondaryLabel: 'Secondary label',
  value: 'Value',
};

export const Statuses: Story<TextFieldProps> = args => (
  <Box backgroundColor="backgroundContrast" borderRadius="md" padding={8}>
    <Stack space={6}>
      <TextField {...args} error="error" />
      <TextField {...args} success="success" />
      <TextField {...args} warning="warning" />
      <TextField
        {...args}
        success="success"
        warning="warning beats success for setting border"
      />
      <TextField
        {...args}
        error="error beats both for setting border"
        success="success"
        warning="warning"
      />
    </Stack>
  </Box>
);

Statuses.args = {};

export const ValueVersusPlaceholder: Story<TextFieldProps> = args => (
  <Box backgroundColor="backgroundContrast" borderRadius="md" padding={8}>
    <Stack space={4}>
      <TextField {...args} value="Value" />
      <TextField {...args} placeholder="Placeholder" />
    </Stack>
  </Box>
);

ValueVersusPlaceholder.args = {};

export const WithEndIcon: Story<TextFieldProps> = args => (
  <Box backgroundColor="backgroundContrast" borderRadius="md" padding={8}>
    <TextField {...args} endIcon={<SendIcon />} />
  </Box>
);

WithEndIcon.args = { placeholder: 'Enter a message...' };

WithEndIcon.argTypes = {
  onEndIconClick: { action: 'onEndIconClick' },
};

export const WithStartIcon: Story<TextFieldProps> = args => (
  <Box backgroundColor="backgroundContrast" borderRadius="md" padding={8}>
    <TextField {...args} startIcon={<SearchIcon />} />
  </Box>
);

WithStartIcon.args = { value: 'Search' };
