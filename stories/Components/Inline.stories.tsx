import { Meta, Story } from '@storybook/react';
import { range } from 'lodash';
import React from 'react';

import { Box, Inline, InlineProps } from '../../src';
import * as argTypes from '../argTypes';

export default {
  title: 'Components/Inline',
  component: Inline,
  argTypes: {
    align: {
      control: { type: 'inline-radio' },
      options: [undefined, 'start', 'center', 'end'],
    },
    alignY: {
      control: { type: 'inline-radio' },
      options: [undefined, 'stretch', 'start', 'center', 'end'],
    },
    space: argTypes.spacing,
  },
} as Meta;

export const Default: Story<InlineProps> = (args) => (
  <Box backgroundColor="backgroundContrast" sx={{ maxWidth: 240 }}>
    <Inline {...args}>
      {range(0, 8).map((n) => (
        <Box backgroundColor="textSecondary" key={n}>
          <Box height={n % 2 === 0 ? 10 : 12} width={10} />
        </Box>
      ))}
    </Inline>
  </Box>
);

Default.args = {
  align: 'start',
  alignY: 'stretch',
  space: 2,
};
