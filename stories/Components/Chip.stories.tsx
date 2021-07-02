import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Chip, ChipProps, Inline } from '../../src';

export default {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as Meta;

export const Default: Story<ChipProps> = (args) => <Chip {...args} />;

Default.args = {
  label: 'Label',
};

Default.argTypes = {
  onDelete: { action: 'onDelete' },
};

export const WithoutDelete: Story<ChipProps> = (args) => <Chip {...args} />;

WithoutDelete.args = {
  ...Default.args,
  label: 'Permanent',
};

export const List: Story<ChipProps & { fruits: string[] }> = ({
  fruits,
  ...args
}) => (
  <Box sx={{ maxWidth: 320 }}>
    <Inline space={2}>
      {fruits.map((fruit) => (
        <Chip key={fruit} {...args} label={fruit} />
      ))}
    </Inline>
  </Box>
);

List.args = {
  ...Default.args,
  fruits: [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
    'honeydew',
  ],
};

List.argTypes = {
  ...Default.argTypes,
};
