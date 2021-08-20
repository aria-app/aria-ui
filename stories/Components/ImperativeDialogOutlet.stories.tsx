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
  const imperativeDialog = useImperativeDialog();

  const handleAlert = useCallback(() => {
    (async () => {
      const result = await imperativeDialog.alert({
        message: 'This is an alert!',
      });

      console.log('result', result);
    })();
  }, [imperativeDialog]);

  const handleConfirm = useCallback(() => {
    (async () => {
      const result = await imperativeDialog.confirm({
        cancelText: 'No',
        confirmText: 'Yes',
        message: 'Please confirm your action.',
        title: 'Are you sure?',
      });

      console.log('result', result);
    })();
  }, [imperativeDialog]);

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
