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
    text: { control: { type: 'text' } },
    color: argTypes.color,
    disabled: { control: { type: 'boolean' } },
    isLoading: { control: { type: 'boolean' } },
    onClick: { action: 'onClick' },
    variant: {
      control: { type: 'inline-radio' },
      options: buttonVariants,
    },
  },
} as Meta;

export const Default: Story<ButtonProps & {
  endIconChoice: string;
  startIconChoice: string;
}> = ({ endIconChoice, startIconChoice, ...rest }) => (
  <Button
    endIcon={
      {
        none: undefined,
        chevronRight: <ChevronRightIcon />,
        search: <SearchIcon />,
      }[endIconChoice]
    }
    startIcon={
      {
        none: undefined,
        chevronRight: <ChevronRightIcon />,
        search: <SearchIcon />,
      }[startIconChoice]
    }
    {...rest}
  />
);

Default.args = {
  endIconChoice: 'none',
  startIconChoice: 'none',
  text: 'Click me',
  variant: 'outlined',
};

Default.argTypes = {
  endIconChoice: {
    control: {
      type: 'inline-radio',
    },
    options: ['none', 'chevronRight', 'search'],
  },
  startIconChoice: {
    control: {
      type: 'inline-radio',
    },
    options: ['none', 'chevronRight', 'search'],
  },
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

export const VariantsWithStartIcon: Story<ButtonProps> = args => (
  <Variants {...args} />
);

VariantsWithStartIcon.args = {
  ...Variants.args,
  startIcon: <SearchIcon />,
  text: 'Search',
};

VariantsWithStartIcon.argTypes = Variants.argTypes;

export const VariantsWithEndIcon: Story<ButtonProps> = args => (
  <Variants {...args} />
);

VariantsWithEndIcon.args = {
  ...Variants.args,
  endIcon: <ChevronRightIcon />,
  text: 'Go Forward',
};

VariantsWithEndIcon.argTypes = Variants.argTypes;
