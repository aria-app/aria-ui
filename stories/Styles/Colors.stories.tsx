import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Stack, Text } from '../../src';
import { colors } from '../constants';

export default {
  title: 'Styles/Colors',
} as Meta;

export const Colors: Story<never> = () => (
  <Stack space={2}>
    {colors.map(color => (
      <Box
        key={color}
        backgroundColor={color}
        borderRadius="md"
        paddingX={6}
        paddingY={3}
      >
        <Text color={color} colorIsBackground={true}>
          {color}
        </Text>
      </Box>
    ))}
  </Stack>
);
