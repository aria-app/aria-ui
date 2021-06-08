import React, { forwardRef, MouseEventHandler } from 'react';

import { mergeSX } from '../helpers';
import { Button } from './Button';
import { Stack, StackProps } from './Stack';
import { Text } from './Text';

export interface BannerProps extends StackProps {
  confirmText?: string;
  dismissText?: string;
  message?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  props,
  ref,
) {
  const {
    confirmText = 'Confirm',
    dismissText = 'Dismiss',
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
      ref={ref}
      role="alert"
      space={6}
      sx={mergeSX({ label: 'Banner', width: '100%' }, sx)}
      {...rest}
    >
      <Stack
        align={['stretch', 'stretch', 'center']}
        direction={['column', 'column', 'row']}
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
});
