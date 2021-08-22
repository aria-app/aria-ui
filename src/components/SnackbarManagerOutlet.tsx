import React, { FC, useCallback } from 'react';

import { useSnackbarManager, useThemeWithDefault } from '../hooks';
import { SnackbarStack, SnackbarStackOnItemsChange } from './SnackbarStack';

export type SnackbarManagerOutletProps = Record<string, never>;

export const SnackbarManagerOutlet: FC<SnackbarManagerOutletProps> = () => {
  const { configs, setConfigs } = useSnackbarManager();
  const theme = useThemeWithDefault();

  const handleItemsChange = useCallback<SnackbarStackOnItemsChange>(
    (newConfigs) => {
      setConfigs(newConfigs);
    },
    [setConfigs],
  );

  return (
    <SnackbarStack
      items={configs}
      onItemsChange={handleItemsChange}
      sx={{
        bottom: theme.space(4),
        left: '50%',
        position: 'absolute',
        transform: 'translateX(-50%)',
      }}
    />
  );
};
