import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { forwardRef, MouseEvent, MouseEventHandler } from 'react';

import { mergeSX } from '../helpers';
import { Status } from '../types';
import { Box, BoxProps } from './Box';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { Text } from './Text';

export type SnackbarOnDismiss = (
  dismissedId: number,
  e: MouseEvent<HTMLButtonElement>,
) => void;

export interface SnackbarProps extends BoxProps<'div'> {
  message?: string;
  messageId: number;
  onDismiss?: SnackbarOnDismiss;
  status?: Status;
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(props, ref) {
    const {
      message,
      messageId,
      onDismiss,
      status = 'info',
      sx,
      ...rest
    } = props;

    const handleDismissButtonClick: MouseEventHandler<HTMLButtonElement> = (
      e,
    ) => {
      onDismiss?.(messageId, e);
    };

    const statusColor = status === 'info' ? 'textSecondary' : status;

    const statusIcon =
      status === 'info'
        ? undefined
        : {
            error: <AlertCircleIcon />,
            success: <CheckCircleIcon />,
            warning: <AlertCircleOutlineIcon />,
          }[status];

    return (
      <Box
        as="div"
        backgroundColor="backgroundContrast"
        borderRadius="md"
        padding={4}
        ref={ref}
        role="alert"
        sx={mergeSX(
          {
            label: 'Snackbar',
          },
          sx,
        )}
        {...rest}
      >
        <Stack align="center" direction="row" space={4}>
          {statusIcon && (
            <Icon
              color={statusColor}
              icon={statusIcon}
              marginLeft={-1}
              marginY={-1}
            />
          )}
          <Text sx={{ flex: 1 }}>{message}</Text>
          <IconButton
            icon={<CloseIcon />}
            marginRight={-3}
            marginY={-3}
            onClick={handleDismissButtonClick}
            sx={{ alignSelf: 'flex-start' }}
          />
        </Stack>
      </Box>
    );
  },
);
