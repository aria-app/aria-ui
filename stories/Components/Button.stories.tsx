import { Meta, Story } from '@storybook/react';
import { orderBy } from 'lodash';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import React from 'react';

import { Button, ButtonProps, Stack } from '../../src';
import * as argTypes from '../argTypes';
import { buttonVariants } from '../constants';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: argTypes.color,
    disabled: { control: { type: 'boolean' } },
    endIcon: { table: { disable: true } },
    endIconSize: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm'],
    },
    isLoading: { control: { type: 'boolean' } },
    onClick: { action: 'onClick' },
    startIcon: { table: { disable: true } },
    startIconSize: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm'],
    },
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
  <Stack space={4}>
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
  </Stack>
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

WithStartIcon.argTypes = {
  ...Variants.argTypes,
  startIcon: { table: { disable: true } },
};

export const WithEndIcon: Story<ButtonProps> = args => <Variants {...args} />;

WithEndIcon.args = {
  ...Variants.args,
  endIcon: <ChevronRightIcon />,
  text: 'Go Forward',
};

WithEndIcon.argTypes = {
  ...Variants.argTypes,
  endIcon: { table: { disable: true } },
};
