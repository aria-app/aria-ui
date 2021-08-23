import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';

import {
  AriaUIOutlets,
  AriaUIOutletsProps,
  AriaUIProviders,
  Box,
  Button,
  Stack,
  useDialogManager,
  useSnackbarManager,
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
  const { alert } = useDialogManager();
  const { addSnackbar } = useSnackbarManager();

  const handleAddSnackbar = useCallback(() => {
    addSnackbar({
      message: 'Adding a snackbar with AriaUIProviders + AriaUIOutlets!',
    });
  }, [addSnackbar]);

  const handleAlert = useCallback(() => {
    alert({ message: 'Alerting with AriaUIProviders + AriaUIOutlets!' });
  }, [alert]);

  return (
    <>
      <Box backgroundColor="backgroundContrast" borderRadius="md" padding={4}>
        <Stack space={4}>
          <Button onClick={handleAlert} text="Alert" variant="contained" />
          <Button
            onClick={handleAddSnackbar}
            text="Add Snackbar"
            variant="contained"
          />
        </Stack>
      </Box>
      <AriaUIOutlets />
    </>
  );
};

Default.args = {};
