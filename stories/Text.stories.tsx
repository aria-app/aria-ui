import { Meta, Story } from '@storybook/react';
import { orderBy } from 'lodash';
import React, { ElementType } from 'react';

import { Box, Text, TextProps } from '../src';
import { baseTheme } from '../src/themes/baseTheme';
import * as argTypes from './argTypes';
import { colors, textVariants } from './constants';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    color: argTypes.color,
    colorIsBackground: { control: { type: 'boolean' } },
    variant: {
      control: { type: 'select' },
      options: textVariants,
    },
  },
} as Meta;

export const Default: Story<TextProps<ElementType>> = args => (
  <Text {...args} />
);

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog',
};

export const Colors: Story<TextProps<ElementType>> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  color: colorProp,
  ...rest
}) => (
  <Box style={{ maxWidth: 900 }}>
    <Text variant="header">Foreground Colors</Text>
    {colors.map(color => (
      <Text key={color} color={color} {...rest}>
        {children || color}
      </Text>
    ))}
    <Text variant="header">Background Colors</Text>
    {colors.map(color => (
      <Box key={`bg-${color}`} backgroundColor={color}>
        <Text color={color} {...rest} colorIsBackground>
          {children || color}
        </Text>
      </Box>
    ))}
  </Box>
);

Colors.args = {
  component: 'div',
};

Colors.argTypes = {
  color: { table: { disable: true } },
  colorIsBackground: { table: { disable: true } },
};

export const Variants: Story<TextProps<ElementType>> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant,
  ...rest
}) => (
  <Box style={{ maxWidth: 900 }}>
    {orderBy(
      textVariants,
      textVariant => baseTheme.textVariants[textVariant].fontSize,
      'desc',
    ).map(textVariant => (
      <Text key={textVariant} variant={textVariant} {...rest}>
        {children || textVariant}
      </Text>
    ))}
  </Box>
);

Variants.args = {
  component: 'div',
};

Variants.argTypes = {
  variant: { table: { disable: true } },
};
