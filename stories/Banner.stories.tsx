import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Banner, BannerProps } from '../src';

export default {
  title: 'Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<BannerProps> = args => <Banner {...args} />;

Default.args = {
  headline: 'Headline',
  message: 'Message',
  status: 'error',
};
