import CloseIcon from 'mdi-react/CloseIcon';
import React, { forwardRef, MouseEvent } from 'react';

import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { Text } from './Text';

export interface ChipProps extends BoxProps<'div'> {
  label?: string;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  props,
  ref,
) {
  const { label, onDelete, sx, ...rest } = props;

  return (
    <Box
      as="div"
      backgroundColor="backgroundContrast"
      borderRadius="md"
      height={8}
      padding={2}
      ref={ref}
      sx={mergeSX(
        {
          display: 'flex',
          label: 'Chip',
        },
        sx,
      )}
      {...rest}
    >
      <Stack align="center" direction="row" space={1}>
        {label && (
          <Text block variant="helper">
            {label}
          </Text>
        )}
        {onDelete && (
          <IconButton
            height={6}
            icon={<CloseIcon />}
            marginRight={-1}
            onClick={onDelete}
            padding={1}
            size="sm"
            width={6}
          />
        )}
      </Stack>
    </Box>
  );
});
