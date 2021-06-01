import { Meta, Story } from '@storybook/react';
import React, { ElementType } from 'react';

import { Box, BoxProps, Text, useScreenSizeType } from '../src';
import { colors } from './constants';

const spacingArgType = {
  control: {
    type: 'number',
  },
};

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    backgroundColor: {
      control: {
        type: 'select',
      },
      options: colors,
    },
    isInteractive: {
      control: { type: 'boolean' },
    },
    margin: spacingArgType,
    marginBottom: spacingArgType,
    marginLeft: spacingArgType,
    marginRight: spacingArgType,
    marginTop: spacingArgType,
    marginX: spacingArgType,
    marginY: spacingArgType,
    padding: spacingArgType,
    paddingBottom: spacingArgType,
    paddingLeft: spacingArgType,
    paddingRight: spacingArgType,
    paddingTop: spacingArgType,
    paddingX: spacingArgType,
    paddingY: spacingArgType,
  },
} as Meta;

export const Default: Story<BoxProps<ElementType>> = args => <Box {...args} />;

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
  component: 'div',
};

export const Responsive: Story<BoxProps<ElementType>> = args => {
  const screenSizeType = useScreenSizeType();

  return (
    <Box {...args} padding={[4, 8, 16]}>
      <Text>Screen Size: {screenSizeType}</Text>
    </Box>
  );
};

Responsive.args = {
  backgroundColor: 'backgroundContrast',
  component: 'div',
};
