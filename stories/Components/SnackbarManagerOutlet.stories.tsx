import { Meta, Story } from '@storybook/react';
import React from 'react';

import {
  SnackbarManagerOutlet,
  SnackbarManagerOutletProps,
  SnackbarManagerProvider,
} from '../../src';
import { DecoratorStory } from '../DecoratorStory';

export default {
  title: 'Components/SnackbarManagerOutlet',
  component: SnackbarManagerOutlet,
  decorators: [
    (storyFn) => (
      <SnackbarManagerProvider>
        <DecoratorStory storyFn={storyFn} />
      </SnackbarManagerProvider>
    ),
  ],
} as Meta;

export const Default: Story<SnackbarManagerOutletProps> = (args) => {
  return (
    <>
      <SnackbarManagerOutlet {...args} />
    </>
  );
};

Default.args = {};
