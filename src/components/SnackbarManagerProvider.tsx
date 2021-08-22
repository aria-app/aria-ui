import React, { FC, ReactNode, useMemo, useState } from 'react';

import { SnackbarManagerContext } from '../contexts';
import { SnackbarManagerConfig } from '../types';

export interface SnackbarManagerProviderProps {
  children: ReactNode;
}

export const SnackbarManagerProvider: FC<SnackbarManagerProviderProps> = ({
  children,
}) => {
  const [configs, setConfigs] = useState<SnackbarManagerConfig[]>([
    {
      id: 1,
      message: 'Your progress was saved',
      status: 'success',
    },
  ]);

  const value = useMemo(
    () => ({
      configs,
      setConfigs,
    }),
    [configs, setConfigs],
  );

  return (
    <SnackbarManagerContext.Provider value={value}>
      {children}
    </SnackbarManagerContext.Provider>
  );
};
