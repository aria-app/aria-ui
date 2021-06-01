import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Button, ButtonProps } from '../src';
import * as argTypes from './argTypes';
import { buttonVariants } from './constants';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    text: { control: { type: 'text' } },
    color: argTypes.color,
    colorIsBackground: { control: { type: 'boolean' } },
    onClick: { action: 'onClick' },
    variant: {
      control: { type: 'select' },
      options: buttonVariants,
    },
  },
  args: {},
} as Meta;

export const Default: Story<ButtonProps> = args => <Button {...args} />;

Default.args = {
  text: 'Click me',
};
