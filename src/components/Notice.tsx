import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import InformationIcon from 'mdi-react/InformationIcon';
import React, { forwardRef } from 'react';

import { mergeSX } from '../helpers';
import { Status } from '../types';
import { Box, BoxProps } from './Box';
import { Icon } from './Icon';
import { Stack } from './Stack';
import { Text } from './Text';

export interface NoticeProps extends Omit<BoxProps<'div'>, 'size'> {
  size?: 'lg' | 'md' | 'sm';
  status?: Status;
}

export const Notice = forwardRef<HTMLDivElement, NoticeProps>(function Notice(
  props,
  ref,
) {
  const { children, size = 'md', status = 'info', sx, ...rest } = props;

  const color = status === 'info' ? 'textSecondary' : status;

  return (
    <Box
      as="div"
      backgroundColor="backgroundContrast"
      borderColor={color}
      borderRadius="md"
      borderWidth={3}
      padding={
        {
          lg: 4,
          md: 3,
          sm: 2,
        }[size]
      }
      ref={ref}
      role="alert"
      sx={mergeSX(
        {
          label: 'Notice',
        },
        sx,
      )}
      {...rest}
    >
      <Stack
        align="start"
        direction="row"
        space={
          {
            lg: 3,
            md: 2,
            sm: 2,
          }[size]
        }
      >
        <Icon
          color={color}
          icon={
            {
              error: <AlertCircleIcon />,
              info: <InformationIcon />,
              success: <CheckCircleIcon />,
              warning: <AlertCircleOutlineIcon />,
            }[status]
          }
          sx={{ display: 'block' }}
        />
        <Box
          paddingY={
            {
              lg: 1.25,
              md: 1.5,
              sm: 1.25,
            }[size]
          }
        >
          <Text
            color="textSecondary"
            variant={
              {
                lg: 'emphasized',
                md: 'label',
                sm: 'helper',
              }[size]
            }
          >
            {children}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
});
