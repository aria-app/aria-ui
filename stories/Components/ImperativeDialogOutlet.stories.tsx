import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ImperativeDialogOutlet, ImperativeDialogOutletProps } from '../../src';

export default {
  title: 'Components/ImperativeDialogOutlet',
  component: ImperativeDialogOutlet,
} as Meta;

export const Default: Story<ImperativeDialogOutletProps> = (args) => (
  <ImperativeDialogOutlet {...args} />
);

Default.args = {};
