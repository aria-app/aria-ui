import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Text, TextProps } from '../src';

const Template: Story<TextProps> = args => <Text {...args} />;

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  children: 'Some default text',
};
