import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import React, { forwardRef, MouseEventHandler } from 'react';

import { mergeSX } from '../helpers';
import { Status } from '../types';
import { Box, BoxProps } from './Box';
import { Button } from './Button';
import { Icon } from './Icon';
import { Stack } from './Stack';
import { Text } from './Text';

export interface SnackbarProps extends BoxProps<'div'> {
  actionText?: string;
  message?: string;
  onActionClick: MouseEventHandler<HTMLButtonElement>;
  status?: Status;
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(props, ref) {
    const {
      actionText,
      message,
      onActionClick,
      status = 'info',
      sx,
      ...rest
    } = props;
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
        paddingX={4}
        paddingY={4}
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
          <Text>{message}</Text>
          {onActionClick && (
            <Button
              color="textPrimary"
              marginRight={-4}
              marginY={-4}
              onClick={onActionClick}
              text={actionText}
              variant="minimal"
            />
          )}
        </Stack>
      </Box>
    );
  },
);
