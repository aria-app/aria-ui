import { Meta, Story } from '@storybook/react';
import React from 'react';

import { RadioButton, RadioGroup, RadioGroupProps } from '../../src';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    onValueChange: { action: 'onValueChange' },
    value: {
      control: { type: 'inline-radio' },
      options: [undefined, 'a', 'b', 'c'],
    },
  },
} as Meta;

export const Default: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <RadioButton label="Alpha" value="a" />
    <RadioButton label="Bravo" value="b" />
    <RadioButton label="Charlie" value="c" />
  </RadioGroup>
);

Default.args = {
  label: 'Radio Group Label',
  value: 'a',
};

export const Disabled: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <RadioButton label="Alpha" value="a" />
    <RadioButton label="Bravo" value="b" />
    <RadioButton label="Charlie" value="c" />
  </RadioGroup>
);

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const DisabledButton: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <RadioButton label="Alpha" value="a" />
    <RadioButton label="Bravo" value="b" />
    <RadioButton disabled label="Charlie" value="c" />
  </RadioGroup>
);

DisabledButton.args = {
  ...Default.args,
};

export const WithError: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <RadioButton label="Alpha" value="a" />
    <RadioButton label="Bravo" value="b" />
    <RadioButton label="Charlie" value="c" />
  </RadioGroup>
);

WithError.args = {
  ...Default.args,
  error: 'Wrong choice',
};
