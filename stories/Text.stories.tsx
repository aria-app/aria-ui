import { Meta, Story } from '@storybook/react';
import { orderBy } from 'lodash';
import React, { ElementType } from 'react';

import { Box, Text, TextProps } from '../src';
import { baseTheme } from '../src/themes/baseTheme';
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
    color: {
      control: {
        type: 'select',
      },
      options: colors,
    },
    colorIsBackground: {
      control: {
        type: 'boolean',
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: textVariants,
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
} as Meta;

export const Default: Story<TextProps<ElementType>> = args => (
  <Text {...args} />
);

Default.args = {
  color: 'textPrimary',
  component: 'span',
  variant: 'body',
};

export const Colors: Story<TextProps<ElementType>> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  color: colorProp,
  ...rest
}) => (
  <Box style={{ maxWidth: 900 }}>
    <Text variant="header">Foreground Colors</Text>
    {colors.map(color => (
      <Text key={color} color={color} {...rest} />
    ))}
    <Text variant="header">Background Colors</Text>
    {colors.map(color => (
      <Box key={`bg-${color}`} backgroundColor={color}>
        <Text color={color} colorIsBackground {...rest} />
      </Box>
    ))}
  </Box>
);

Colors.args = {
  component: 'div',
};

Colors.argTypes = {
  color: { table: { disable: true } },
};

export const Variants: Story<TextProps<ElementType>> = ({
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
      <Text key={textVariant} variant={textVariant} {...rest} />
    ))}
  </Box>
);

Variants.args = {
  component: 'div',
};

Variants.argTypes = {
  variant: { table: { disable: true } },
};
