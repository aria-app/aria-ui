import { Meta, Story } from '@storybook/react';
import StarIcon from 'mdi-react/StarIcon';
import React from 'react';

import { IconButton, IconButtonProps } from '../../src';
import * as argTypes from '../argTypes';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    color: argTypes.color,
    colorIsBackground: { control: { type: 'boolean' } },
    onClick: { action: 'onClick' },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm'],
    },
  },
} as Meta;

export const Default: Story<IconButtonProps> = (args) => (
  <IconButton icon={<StarIcon />} {...args} />
);

Default.args = {
  size: 'md',
};

export const Disabled: Story<IconButtonProps> = (args) => (
  <IconButton icon={<StarIcon />} {...args} />
);

Disabled.args = {
  ...Default.args,
  disabled: true,
};
