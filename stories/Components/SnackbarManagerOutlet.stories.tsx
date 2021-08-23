import { Meta, Story } from '@storybook/react';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import React, { FC, useCallback, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Select,
  SelectOption,
  SnackbarManagerOutlet,
  SnackbarManagerOutletProps,
  SnackbarManagerProvider,
  Stack,
  TextField,
  useSnackbarManager,
} from '../../src';
import { Status } from '../../src/types';
import { DecoratorStory } from '../DecoratorStory';

interface StatusSelectProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const StatusSelect: FC<StatusSelectProps> = (props) => {
  const { onStatusChange, status } = props;
  const options = useMemo<SelectOption<Status>[]>(
    () => [
      { label: 'Error', value: 'error' },
      { label: 'Info', value: 'info' },
      { label: 'Success', value: 'success' },
      { label: 'Warning', value: 'warning' },
    ],
    [],
  );

  const startIcon = useMemo(
    () =>
      status === 'info'
        ? undefined
        : {
            error: <AlertCircleIcon />,
            success: <CheckCircleIcon />,
            warning: <AlertCircleOutlineIcon />,
          }[status],
    [status],
  );

  const startIconColor = useMemo(
    () => (status === 'info' ? 'textSecondary' : status),
    [status],
  );

  return (
    <Select
      label="Status"
      onValueChange={onStatusChange}
      options={options}
      startIcon={startIcon}
      startIconColor={startIconColor}
      value={status}
    />
  );
};

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
  const [message, setMessage] = useState<string>('Your progress was saved!');
  const [status, setStatus] = useState<Status>('success');
  const { notify } = useSnackbarManager();

  const handleNotify = useCallback(() => {
    notify({ message, status });
  }, [notify, message, status]);

  return (
    <>
      <Box backgroundColor="backgroundContrast" borderRadius="md" padding={6}>
        <Stack space={6}>
          <TextField
            label="Message"
            onValueChange={setMessage}
            placeholder="Enter a message"
            value={message}
          />
          <StatusSelect onStatusChange={setStatus} status={status} />
          <Button onClick={handleNotify} text="Notify" variant="contained" />
        </Stack>
      </Box>
      <SnackbarManagerOutlet {...args} />
    </>
  );
};

Default.args = {};
