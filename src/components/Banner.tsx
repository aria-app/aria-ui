import { merge } from 'lodash';
import React, { FC, KeyboardEventHandler } from 'react';

import { Button } from './Button';
import { Stack, StackProps } from './Stack';
import { Text } from './Text';

export interface BannerProps extends StackProps {
  confirmText?: string;
  dismissText?: string;
  message?: string;
  onConfirm?: KeyboardEventHandler<HTMLDivElement>;
  onDismiss?: KeyboardEventHandler<HTMLDivElement>;
}

export const Banner: FC<BannerProps> = props => {
  const {
    confirmText,
    dismissText,
    message,
    onConfirm,
    onDismiss,
    sx,
    ...rest
  } = props;

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
      <Stack
        align={[, , 'center']}
        direction={[, , 'row']}
        space={4}
        sx={{ flex: 1 }}
      >
        {message && <Text sx={{ flex: 1 }}>{message}</Text>}
        {(onConfirm || onDismiss) && (
          <Stack
            alignSelf={['end', 'end', undefined]}
            direction="row"
            marginBottom={[-4, -4, 0]}
            marginRight={-4}
            space={2}
          >
            {onDismiss && (
              <Button
                onClick={onDismiss}
                text={dismissText}
                variant="minimal"
              />
            )}
            {onConfirm && (
              <Button
                onClick={onConfirm}
                text={confirmText}
                variant="minimal"
              />
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

Banner.defaultProps = {
  confirmText: 'Confirm',
  dismissText: 'Dismiss',
};
