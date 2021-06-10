import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Dialog, DialogProps, Stack, TextField } from '../../src';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    isContentPadded: true,
    isFullWidth: true,
    isOpen: true,
  },
  argTypes: {
    children: { control: { type: 'text' } },
    isContentPadded: { control: { type: 'boolean' } },
    isFullWidth: { control: { type: 'boolean' } },
    isOpen: { control: { type: 'boolean' } },
    maxWidth: {
      control: { type: 'inline-radio' },
      options: [undefined, 'sm', 'md', 'lg'],
    },
    onOverlayClick: { action: 'onOverlayClick' },
    title: { control: { type: 'text' } },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
} as Meta;

export const Default: Story<DialogProps> = args => <Dialog {...args} />;

Default.args = {
  children: 'This is some text content to go inside the Dialog component.',
  isOpen: true,
  title: 'Dialog Title',
};

Default.argTypes = {
  onCancel: { action: 'onCancel' },
  onConfirm: { action: 'onConfirm' },
};

export const Form: Story<DialogProps> = args => (
  <Dialog {...args}>
    <Stack space={6}>
      <TextField inputProps={{ defaultValue: 'John Doe' }} label="Name" />
      <TextField
        inputProps={{ defaultValue: 'United States' }}
        label="Location"
      />
    </Stack>
  </Dialog>
);

Form.args = {
  confirmText: 'Save',
  isOpen: true,
  title: 'A Dialog Form',
};

Form.argTypes = {
  onCancel: { action: 'onCancel' },
  onConfirm: { action: 'onConfirm' },
};

export const Closed: Story<DialogProps> = args => <Dialog {...args} />;

Closed.args = {
  ...Default.args,
  isOpen: false,
};

Closed.argTypes = Default.argTypes;

Closed.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};

export const LongTitle: Story<DialogProps> = args => <Dialog {...args} />;

LongTitle.args = {
  ...Default.args,
  title: 'Dialog Title that is very long and must wrap to another line',
};

LongTitle.argTypes = Default.argTypes;

LongTitle.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};

export const ConfirmOnly: Story<DialogProps> = args => <Dialog {...args} />;

ConfirmOnly.args = {
  ...Default.args,
  confirmText: 'Ok',
};

ConfirmOnly.argTypes = {
  onConfirm: { action: 'onConfirm' },
};

ConfirmOnly.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};

export const CancelOnly: Story<DialogProps> = args => <Dialog {...args} />;

CancelOnly.args = {
  ...Default.args,
  cancelText: 'Go Back',
};

CancelOnly.argTypes = {
  onCancel: { action: 'onCancel' },
};

CancelOnly.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};

export const NoActions: Story<DialogProps> = args => <Dialog {...args} />;

NoActions.args = {
  ...Default.args,
};

NoActions.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};

export const ContentOnly: Story<DialogProps> = args => <Dialog {...args} />;

ContentOnly.args = {
  ...Default.args,
  isContentPadded: false,
  title: '',
};

ContentOnly.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};

export const ContentOnlyPadded: Story<DialogProps> = args => (
  <Dialog {...args} />
);

ContentOnlyPadded.args = {
  ...Default.args,
  title: '',
};

ContentOnlyPadded.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};
