import { Meta, Story } from '@storybook/react';
import React from 'react';

import { FormGroup, FormGroupProps } from '../../src';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  argTypes: {
    error: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    secondaryLabel: { control: { type: 'text' } },
    success: { control: { type: 'text' } },
    warning: { control: { type: 'text' } },
  },
} as Meta;

export const Default: Story<FormGroupProps> = (args) => (
  <FormGroup {...args}>
    <span>Content</span>
  </FormGroup>
);

Default.args = {
  disabled: false,
  label: 'Label',
};

export const Disabled: Story<FormGroupProps> = (args) => (
  <FormGroup {...args}>
    <span>Content</span>
  </FormGroup>
);

Disabled.args = {
  ...Default.args,
  disabled: true,
  error: 'Error message',
  secondaryLabel: 'Secondary label',
};

export const WithError: Story<FormGroupProps> = (args) => (
  <FormGroup {...args}>
    <span>Content</span>
  </FormGroup>
);

WithError.args = {
  ...Default.args,
  error: 'Error message',
};

export const WithSecondaryLabel: Story<FormGroupProps> = (args) => (
  <FormGroup {...args}>
    <span>Content</span>
  </FormGroup>
);

WithSecondaryLabel.args = {
  ...Default.args,
  secondaryLabel: 'Secondary label',
};

export const WithSuccess: Story<FormGroupProps> = (args) => (
  <FormGroup {...args}>
    <span>Content</span>
  </FormGroup>
);

WithSuccess.args = {
  ...Default.args,
  success: 'Success message',
};

export const WithWarning: Story<FormGroupProps> = (args) => (
  <FormGroup {...args}>
    <span>Content</span>
  </FormGroup>
);

WithWarning.args = {
  ...Default.args,
  warning: 'Warning message',
};
