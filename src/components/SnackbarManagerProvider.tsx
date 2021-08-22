import { uniqueId } from 'lodash';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import {
  SnackbarManagerContext,
  SnackbarManagerContextValue,
} from '../contexts';
import { SnackbarManagerConfig } from '../types';

export interface SnackbarManagerProviderProps {
  children: ReactNode;
}

export const SnackbarManagerProvider: FC<SnackbarManagerProviderProps> = ({
  children,
}) => {
  const [configs, setConfigs] = useState<SnackbarManagerConfig[]>([
    {
      id: uniqueId(),
      message: 'Your progress was saved',
      status: 'success',
    },
  ]);

  const handleAddSnackbar = useCallback<
    SnackbarManagerContextValue['addSnackbar']
  >(
    ({ message, status }) => {
      setConfigs([...configs, { id: uniqueId(), message, status }]);
    },
    [configs, setConfigs],
  );

  const value = useMemo(
    () => ({
      addSnackbar: handleAddSnackbar,
      configs,
      setConfigs,
    }),
    [configs, handleAddSnackbar, setConfigs],
  );

  return (
    <SnackbarManagerContext.Provider value={value}>
      {children}
    </SnackbarManagerContext.Provider>
  );
};
