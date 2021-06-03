import { Meta, Story } from '@storybook/react';
import { orderBy } from 'lodash';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import React from 'react';

import { Box, Button, ButtonProps } from '../src';
import * as argTypes from './argTypes';
import { buttonVariants } from './constants';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: argTypes.color,
    disabled: { control: { type: 'boolean' } },
    isLoading: { control: { type: 'boolean' } },
    onClick: { action: 'onClick' },
    text: { control: { type: 'text' } },
    variant: {
      control: { type: 'inline-radio' },
      options: buttonVariants,
    },
  },
} as Meta;

export const Default: Story<ButtonProps> = args => <Button {...args} />;

Default.args = {
  text: 'Click me',
  variant: 'outlined',
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
        variant={buttonVariant}
        {...rest}
        text={text || buttonVariant}
      />
    ))}
  </Box>
);

Variants.args = {};

Variants.argTypes = {
  variant: { table: { disable: true } },
};

export const WithStartIcon: Story<ButtonProps> = args => <Variants {...args} />;

WithStartIcon.args = {
  ...Variants.args,
  startIcon: <SearchIcon />,
  text: 'Search',
};

WithStartIcon.argTypes = Variants.argTypes;

export const WithEndIcon: Story<ButtonProps> = args => <Variants {...args} />;

WithEndIcon.args = {
  ...Variants.args,
  endIcon: <ChevronRightIcon />,
  text: 'Go Forward',
};

WithEndIcon.argTypes = Variants.argTypes;
