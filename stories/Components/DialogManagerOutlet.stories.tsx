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
import { DialogFocusedButton } from '../../src/types';
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
  argTypes: {
    focusedButton: {
      control: { type: 'inline-radio' },
      options: ['cancel', 'confirm'],
    },
  },
} as Meta;

type DialogManagerOutletArgs = DialogManagerOutletProps & {
  focusedButton: DialogFocusedButton;
};

export const Default: Story<DialogManagerOutletArgs> = ({
  focusedButton,
  ...rest
}) => {
  const { prompt } = useDialogManager();

  const handleAlert = useCallback(() => {
    (async () => {
      const result = await prompt({
        message: 'This is an alert!',
      });

      console.log('result', result);
    })();
  }, [prompt]);

  const handleConfirm = useCallback(() => {
    (async () => {
      const result = await prompt({
        canCancel: true,
        cancelText: 'No',
        confirmText: 'Yes',
        focusedButton,
        message: 'Please confirm your action.',
        title: 'Are you sure?',
      });

      console.log('result', result);
    })();
  }, [focusedButton, prompt]);

  return (
    <>
      <Box backgroundColor="backgroundContrast" borderRadius="md" padding={4}>
        <Stack space={4}>
          <Button onClick={handleAlert} text="Alert" variant="contained" />
          <Button onClick={handleConfirm} text="Confirm" variant="contained" />
        </Stack>
      </Box>
      <DialogManagerOutlet {...rest} />
    </>
  );
};

Default.args = {
  focusedButton: 'confirm',
};
