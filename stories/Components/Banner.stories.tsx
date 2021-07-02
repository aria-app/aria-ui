import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Banner, BannerProps } from '../../src';
import { status } from '../argTypes';

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onDismiss: { action: 'onConfirm' },
    showConfirmButton: { control: { type: 'boolean' } },
    showDismissButton: { control: { type: 'boolean' } },
    status,
  },
} as Meta;

export const Default: Story<
  BannerProps & {
    showConfirmButton: boolean;
    showDismissButton: boolean;
  }
> = ({
  onConfirm,
  onDismiss,
  showConfirmButton,
  showDismissButton,
  ...rest
}) => (
  <Banner
    onConfirm={showConfirmButton ? onConfirm : undefined}
    onDismiss={showDismissButton ? onDismiss : undefined}
    {...rest}
  />
);

Default.args = {
  confirmText: 'Confirm',
  dismissText: 'Dismiss',
  message:
    'This is a sample message that can be used to stretch out a component and test its ability to handle text.',
  showConfirmButton: true,
  showDismissButton: true,
};
