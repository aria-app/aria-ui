import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';

import {
  Button,
  DialogManagerOutlet,
  DialogManagerOutletProps,
  DialogManagerProvider,
  Stack,
  useDialogManager,
} from '../../src';
import { DecoratorStory } from '../DecoratorStory';

export default {
  title: 'Components/DialogManagerOutlet',
  component: DialogManagerOutlet,
  decorators: [
    (storyFn) => (
      <DialogManagerProvider>
        <DecoratorStory storyFn={storyFn} />
      </DialogManagerProvider>
    ),
  ],
} as Meta;

export const Default: Story<DialogManagerOutletProps> = (args) => {
  const { alert, confirm } = useDialogManager();

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
      <DialogManagerOutlet {...args} />
    </>
  );
};

Default.args = {};
