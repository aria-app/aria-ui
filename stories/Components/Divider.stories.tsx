import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Divider, DividerProps } from '../../src';

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    thickness: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm'],
    },
  },
} as Meta;

export const Default: Story<DividerProps> = args => (
  <Box sx={{ maxWidth: 768, width: '100vw' }}>
    <Divider {...args} />
  </Box>
);

Default.args = {
  thickness: 'md',
};
