import { Meta, Story } from '@storybook/react';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import FruitCitrusIcon from 'mdi-react/FruitCitrusIcon';
import React from 'react';

import { Box, Select, SelectProps, Stack } from '../../src';

export default {
  title: 'Components/Select',
  component: Select,
  decorators: [
    Story => (
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
  args: {
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ],
    placeholder: 'No value',
  },
  argTypes: {
    onValueChange: { action: 'onValueChange' },
    startIcon: { table: { disable: true } },
    value: {
      control: { type: 'inline-radio' },
      options: [undefined, 1, 2],
    },
  },
} as Meta;

export const Default: Story<SelectProps> = args => <Select {...args} />;

Default.args = {
  label: 'Some label text',
  secondaryLabel: 'A secondary label',
};

export const Disabled: Story<SelectProps> = args => <Select {...args} />;

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Statuses: Story<SelectProps> = args => (
  <Stack space={6}>
    <Select {...args} error="error" />
    <Select {...args} success="success" />
    <Select {...args} warning="warning" />
    <Select
      {...args}
      success="success"
      warning="warning beats success for setting border"
    />
    <Select
      {...args}
      error="error beats both for setting border"
      success="success"
      warning="warning"
    />
  </Stack>
);

Statuses.args = {};

export const WithStartIcon: Story<SelectProps> = args => <Select {...args} />;

WithStartIcon.args = {
  label: 'Favorite Citrus',
  options: [
    { label: 'Lemon', value: 'lemon' },
    { label: 'Lime', value: 'lime' },
    { label: 'Orange', value: 'orange' },
  ],
  startIcon: <FruitCitrusIcon />,
  value: 'lime',
};

WithStartIcon.argTypes = {
  value: {
    control: { type: 'inline-radio' },
    options: [undefined, 'lemon', 'lime', 'orange'],
  },
};

export const WithEndIconOtherThanChevron: Story<SelectProps> = args => (
  <Select {...args} />
);

WithEndIconOtherThanChevron.args = {
  endIcon: <DotsHorizontalIcon />,
};
