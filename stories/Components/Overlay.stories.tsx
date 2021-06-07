import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Overlay, OverlayProps } from '../../src';

export default {
  title: 'Components/Overlay',
  component: Overlay,
  argTypes: {
    isVisible: { control: { type: 'boolean' } },
  },
} as Meta;

export const Default: Story<OverlayProps> = args => <Overlay {...args} />;

Default.args = { isVisible: true };
