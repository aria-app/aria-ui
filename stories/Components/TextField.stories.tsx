import { Meta, Story } from '@storybook/react';
import SearchIcon from 'mdi-react/SearchIcon';
import SendIcon from 'mdi-react/SendIcon';
import React from 'react';

import { Box, Stack, TextField, TextFieldProps } from '../../src';

export default {
  title: 'Components/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        padding={8}
        sx={{ maxWidth: 320, width: '100vw' }}
      >
        {Story()}
      </Box>
    ),
  ],
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

export const Default: Story<TextFieldProps> = (args) => <TextField {...args} />;

Default.args = {
  id: 'default',
  label: 'Label',
  secondaryLabel: 'Secondary label',
  value: 'Value',
};

export const Disabled: Story<TextFieldProps> = (args) => (
  <TextField {...args} />
);

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Statuses: Story<TextFieldProps> = (args) => (
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
);

Statuses.args = {};

export const ValueVersusPlaceholder: Story<TextFieldProps> = (args) => (
  <Stack space={4}>
    <TextField {...args} value="Value" />
    <TextField {...args} placeholder="Placeholder" />
  </Stack>
);

ValueVersusPlaceholder.args = {};

export const WithEndIcon: Story<TextFieldProps> = (args) => (
  <TextField {...args} />
);

WithEndIcon.args = {
  endIcon: <SendIcon />,
  placeholder: 'Enter a message...',
};

WithEndIcon.argTypes = {
  onEndIconClick: { action: 'onEndIconClick' },
};

export const WithStartIcon: Story<TextFieldProps> = (args) => (
  <TextField {...args} />
);

WithStartIcon.args = {
  startIcon: <SearchIcon />,
  value: 'Search',
};
