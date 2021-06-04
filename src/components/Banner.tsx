import { merge } from 'lodash';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import React, { FC, KeyboardEventHandler, useMemo } from 'react';

import { Status } from '../types';
import { Button } from './Button';
import { Icon } from './Icon';
import { Stack, StackProps } from './Stack';
import { Text } from './Text';

export interface BannerProps extends StackProps {
  confirmText?: string;
  dismissText?: string;
  headline?: string;
  message?: string;
  onConfirm?: KeyboardEventHandler<HTMLDivElement>;
  onDismiss?: KeyboardEventHandler<HTMLDivElement>;
  status?: Status;
}

export const Banner: FC<BannerProps> = props => {
  const {
    confirmText = 'Confirm',
    dismissText = 'Dismiss',
    headline,
    message,
    status,
    sx,
    ...rest
  } = props;

  const statusIcon = useMemo(
    () =>
      status
        ? {
            error: <AlertCircleIcon />,
            info: <AlertCircleIcon />,
            success: <AlertCircleIcon />,
            warning: <AlertCircleIcon />,
          }[status]
        : undefined,
    [status],
  );

  return (
    <Stack
      backgroundColor="backgroundContrast"
      direction="row"
      paddingX={6}
      paddingY={[6, 6, 4]}
      role="alert"
      space={6}
      sx={merge({ width: '100%' }, sx)}
      {...rest}
    >
      {status && <Icon icon={statusIcon} />}
      <Stack
        align={[, , 'center']}
        direction={[, , 'row']}
        space={4}
        sx={{ flex: 1 }}
      >
        <Stack space={2} sx={{ flex: 1 }}>
          {headline && <Text variant="header">{headline}</Text>}
          {message && <Text color="textSecondary">{message}</Text>}
        </Stack>
        <Stack
          alignSelf={['end', 'end', undefined]}
          direction="row"
          marginBottom={[-4, -4, 0]}
          marginRight={-4}
          space={2}
        >
          <Button text={dismissText} variant="minimal" />
          <Button text={confirmText} variant="minimal" />
        </Stack>
      </Stack>
    </Stack>
  );
};
