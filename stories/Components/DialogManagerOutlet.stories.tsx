import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';

import {
  Box,
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
  const { addDialog } = useDialogManager();

  const handleAlert = useCallback(() => {
    (async () => {
      const result = await addDialog({
        message: 'This is an alert!',
      });

      console.log('result', result);
    })();
  }, [addDialog]);

  const handleConfirm = useCallback(() => {
    (async () => {
      const result = await addDialog({
        canCancel: true,
        cancelText: 'No',
        confirmText: 'Yes',
        message: 'Please confirm your action.',
        title: 'Are you sure?',
      });

      console.log('result', result);
    })();
  }, [addDialog]);

  return (
    <>
      <Box backgroundColor="backgroundContrast" borderRadius="md" padding={4}>
        <Stack space={4}>
          <Button onClick={handleAlert} text="Alert" variant="contained" />
          <Button onClick={handleConfirm} text="Confirm" variant="contained" />
        </Stack>
      </Box>
      <DialogManagerOutlet {...args} />
    </>
  );
};

Default.args = {};
