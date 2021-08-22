import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';

import {
  AriaUIOutlets,
  AriaUIOutletsProps,
  AriaUIProviders,
  Button,
  useImperativeDialog,
} from '../../src';
import { DecoratorStory } from '../DecoratorStory';

export default {
  component: AriaUIOutlets,
  decorators: [
    (storyFn) => (
      <AriaUIProviders>
        <DecoratorStory storyFn={storyFn} />
      </AriaUIProviders>
    ),
  ],
  title: 'Components/AriaUIOutlets',
} as Meta;

export const Default: Story<AriaUIOutletsProps> = () => {
  const { alert } = useImperativeDialog();

  const handleAlert = useCallback(() => {
    alert({ message: 'Alerting with AriaUIProviders + AriaUIOutlets!' });
  }, [alert]);

  return (
    <>
      <Button onClick={handleAlert} text="Alert" />
      <AriaUIOutlets />
    </>
  );
};
