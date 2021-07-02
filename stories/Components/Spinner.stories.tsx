import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Spinner, SpinnerProps } from '../../src';
import * as argTypes from '../argTypes';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    color: argTypes.color,
    colorIsBackground: { control: { type: 'boolean' } },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm'],
    },
  },
} as Meta;

export const Default: Story<SpinnerProps> = (args) => <Spinner {...args} />;

Default.args = {
  color: 'brandPrimary',
  size: 'md',
};
