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
  const { prompt } = useDialogManager();
  const { notify } = useSnackbarManager();

  const handleNotify = useCallback(() => {
    notify({
      message: 'Notifying with AriaUIProviders + AriaUIOutlets!',
    });
  }, [notify]);

  const handlePrompt = useCallback(() => {
    prompt({ message: 'Prompting with AriaUIProviders + AriaUIOutlets!' });
  }, [prompt]);

  return (
    <>
      <Box backgroundColor="backgroundContrast" borderRadius="md" padding={4}>
        <Stack space={4}>
          <Button onClick={handleNotify} text="Notify" variant="contained" />
          <Button onClick={handlePrompt} text="Prompt" variant="contained" />
        </Stack>
      </Box>
      <AriaUIOutlets />
    </>
  );
};

Default.args = {};
