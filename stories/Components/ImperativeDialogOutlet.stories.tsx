import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';

import {
  Button,
  ImperativeDialogOutlet,
  ImperativeDialogOutletProps,
  ImperativeDialogProvider,
  Stack,
  useImperativeDialog,
} from '../../src';
import { DecoratorStory } from '../DecoratorStory';

export default {
  title: 'Components/ImperativeDialogOutlet',
  component: ImperativeDialogOutlet,
  decorators: [
    (storyFn) => (
      <ImperativeDialogProvider>
        <DecoratorStory storyFn={storyFn} />
      </ImperativeDialogProvider>
    ),
  ],
} as Meta;

export const Default: Story<ImperativeDialogOutletProps> = (args) => {
  const { alert, confirm } = useImperativeDialog();

  const handleAlert = useCallback(() => {
    (async () => {
      const result = await alert({
        message: 'This is an alert!',
      });

      console.log('result', result);
    })();
  }, [alert]);

  const handleConfirm = useCallback(() => {
    (async () => {
      const result = await confirm({
        cancelText: 'No',
        confirmText: 'Yes',
        message: 'Please confirm your action.',
        title: 'Are you sure?',
      });

      console.log('result', result);
    })();
  }, [confirm]);

  return (
    <>
      <Stack space={4}>
        <Button onClick={handleAlert} text="Alert" />
        <Button onClick={handleConfirm} text="Confirm" />
      </Stack>
      <ImperativeDialogOutlet {...args} />
    </>
  );
};

Default.args = {};
