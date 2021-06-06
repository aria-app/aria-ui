import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Overlay } from '../../src';

export default {
  title: 'Components/Overlay',
  component: Overlay,
  argTypes: {
    showComponent: { control: { type: 'boolean' }, name: 'Show Component' },
  },
} as Meta;

export const Default: Story<{ showComponent: boolean }> = ({
  showComponent,
}) => <>{showComponent ? <Overlay /> : null}</>;

Default.args = { showComponent: true };
