import { Meta, Story } from '@storybook/react';
import StarIcon from 'mdi-react/StarIcon';
import React from 'react';

import { Icon, IconProps } from '../src';
import * as argTypes from './argTypes';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    color: argTypes.color,
    colorIsBackground: { control: { type: 'boolean' } },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm'],
    },
  },
} as Meta;

export const Default: Story<IconProps> = args => (
  <Icon icon={<StarIcon />} {...args} />
);

Default.args = {
  size: 'md',
};
