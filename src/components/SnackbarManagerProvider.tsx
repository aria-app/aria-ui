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
  const [configs, setConfigs] = useState<SnackbarManagerConfig[]>([]);

  const handleNotify = useCallback<SnackbarManagerContextValue['notify']>(
    ({ message, status }) => {
      setConfigs([...configs, { id: uniqueId(), message, status }]);
    },
    [configs, setConfigs],
  );

  const value = useMemo(
    () => ({
      configs,
      notify: handleNotify,
      setConfigs,
    }),
    [configs, handleNotify, setConfigs],
  );

  return (
    <SnackbarManagerContext.Provider value={value}>
      {children}
    </SnackbarManagerContext.Provider>
  );
};
