import { Meta, Story } from '@storybook/react';
import React from 'react';

import { RadioButton, RadioGroup, RadioGroupProps } from '../../src';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
} as Meta;

export const Default: Story<RadioGroupProps> = args => (
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

Default.argTypes = {
  value: {
    control: { type: 'inline-radio' },
    options: [undefined, 'a', 'b', 'c'],
  },
};

export const Disabled: Story<RadioGroupProps> = args => (
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

Disabled.argTypes = {
  ...Default.argTypes,
};

export const WithError: Story<RadioGroupProps> = args => (
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

WithError.argTypes = {
  ...Default.argTypes,
};
