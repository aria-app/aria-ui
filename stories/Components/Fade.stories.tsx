import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Fade, FadeProps } from '../../src';

export default {
  title: 'Components/Fade',
  component: Fade,
} as Meta;

export const Default: Story<FadeProps> = args => <Fade {...args} />;

Default.args = {
  children: 'Now you see me...',
  in: true,
};
