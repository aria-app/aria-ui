import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Snackbar, SnackbarProps } from '../../src';
import * as argTypes from '../argTypes';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  argTypes: {
    message: { control: { type: 'text' } },
    onDismiss: { action: 'onDismiss' },
    status: argTypes.status,
  },
} as Meta;

export const Default: Story<SnackbarProps> = args => <Snackbar {...args} />;

Default.args = {
  message: 'Snackbar message',
};

export const StatusIcon: Story<SnackbarProps> = args => <Snackbar {...args} />;

StatusIcon.args = {
  message: 'Snackbar message',
  status: 'warning',
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
