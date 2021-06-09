import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Dialog, DialogProps } from '../../src';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    isOpen: true,
  },
  argTypes: {
    children: { control: { type: 'text' } },
    fullWidth: { control: { type: 'boolean' } },
    isOpen: { control: { type: 'boolean' } },
    onCancel: { action: 'onCancel' },
    onConfirm: { action: 'onConfirm' },
    title: { control: { type: 'text' } },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<DialogProps> = args => {
  const portalContainer = document.querySelector('#root');
  return <Dialog {...args} portalContainer={portalContainer} />;
};

Default.args = {
  children: 'This is some text content to go inside the Dialog component.',
  title: 'Dialog Title',
};
