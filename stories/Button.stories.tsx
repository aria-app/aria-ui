import { Meta, Story } from '@storybook/react';
import { orderBy } from 'lodash';
import React from 'react';

import { Box, Button, ButtonProps } from '../src';
import * as argTypes from './argTypes';
import { buttonVariants } from './constants';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    text: { control: { type: 'text' } },
    color: argTypes.color,
    colorIsBackground: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
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

export const Variants: Story<ButtonProps> = ({
  text,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant,
  ...rest
}) => (
  <Box
    sx={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}
  >
    {orderBy(
      buttonVariants,
      buttonVariant => buttonVariants[buttonVariant],
      'desc',
    ).map(buttonVariant => (
      <Button
        key={buttonVariant}
        text={text || buttonVariant}
        variant={buttonVariant}
        {...rest}
      />
    ))}
  </Box>
);

Variants.args = {};

Variants.argTypes = {
  variant: { table: { disable: true } },
};
