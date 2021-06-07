import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, BoxProps, Text, useScreenSizeType } from '../../src';
import { borderRadius, color as colorArgType, spacing } from '../argTypes';

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    backgroundColor: colorArgType,
    borderColor: colorArgType,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    bottom: spacing,
    children: { control: { type: 'text' } },
    height: spacing,
    isInteractive: { control: { type: 'boolean' } },
    left: spacing,
    margin: spacing,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    marginX: spacing,
    marginY: spacing,
    padding: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    paddingX: spacing,
    paddingY: spacing,
    right: spacing,
    size: spacing,
    top: spacing,
    width: spacing,
  },
} as Meta;

export const Default: Story<BoxProps<'div'>> = args => <Box {...args} />;

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
};

export const Responsive: Story<BoxProps<'div'>> = args => {
  const screenSizeType = useScreenSizeType();

  return (
    <Box {...args} padding={[4, 8, 16]}>
      <Text>Screen Size: {screenSizeType}</Text>
    </Box>
  );
};

Responsive.args = {
  backgroundColor: 'backgroundContrast',
  borderRadius: 'md',
};
