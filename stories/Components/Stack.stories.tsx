import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Stack, StackProps, Text } from '../../src';
import { stackAlignments, stackDirections } from '../constants';

export default {
  title: 'Components/Stack',
  component: Stack,
  argTypes: {
    align: { control: { type: 'inline-radio' }, options: stackAlignments },
    direction: { control: { type: 'inline-radio' }, options: stackDirections },
    dividerThickness: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm'],
    },
    isDivided: { control: { type: 'boolean' } },
    space: { control: { type: 'number' } },
  },
} as Meta;

export const Default: Story<StackProps> = args => (
  <Stack {...args}>
    <Box backgroundColor="backgroundContrast">
      <Text>First Item</Text>
    </Box>
    <Box backgroundColor="brandSubtle" height={10}>
      <Text>Second Item</Text>
    </Box>
    <Box backgroundColor="backgroundContrast">
      <Text>Third Item</Text>
    </Box>
  </Stack>
);

Default.args = {
  align: 'stretch',
  direction: 'column',
  dividerThickness: 'md',
  space: 4,
};
