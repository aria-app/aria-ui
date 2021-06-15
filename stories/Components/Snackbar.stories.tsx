import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Snackbar, SnackbarProps } from '../../src';
import * as argTypes from '../argTypes';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  argTypes: {
    message: { control: { type: 'text' } },
    status: argTypes.status,
  },
} as Meta;

export const Default: Story<SnackbarProps> = args => <Snackbar {...args} />;

Default.args = {
  actionText: 'Action',
  message: 'Snackbar message',
  status: 'warning',
};

Default.argTypes = {
  onActionClick: { action: 'onActionClick' },
};

export const WithoutAction: Story<SnackbarProps> = args => (
  <Snackbar {...args} />
);

WithoutAction.args = {
  message: 'Snackbar message',
  status: 'warning',
};

export const MessageOnly: Story<SnackbarProps> = args => <Snackbar {...args} />;

MessageOnly.args = {
  message: 'Snackbar message',
};

export const LongMessage: Story<SnackbarProps> = args => (
  <Box sx={{ maxWidth: 320 }}>
    <Snackbar {...args} />
  </Box>
);

LongMessage.args = {
  message:
    "A really long message in the Snackbar component that can't fit in a normal way.",
};
