import { uniqueId } from 'lodash';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { DialogManagerContext } from '../contexts';
import {
  DialogManagerAlertOptions,
  DialogManagerConfig,
  DialogManagerConfirmOptions,
} from '../types';

export interface DialogManagerProviderProps {
  children: ReactNode;
}

export const DialogManagerProvider: FC<DialogManagerProviderProps> = ({
  children,
}) => {
  const [configs, setConfigs] = useState<DialogManagerConfig[]>([]);

  const handleAlert = useCallback<
    (options: DialogManagerAlertOptions) => Promise<void>
  >(
    ({ confirmText, message, title }) =>
      new Promise((resolve) => {
        setConfigs([
          ...configs,
          {
            confirmText,
            id: uniqueId(),
            isOpen: true,
            message,
            onResolve: () => resolve(),
            title,
            variant: 'alert',
          },
        ]);
      }),
    [configs, setConfigs],
  );

  const handleConfirm = useCallback<
    (options: DialogManagerConfirmOptions) => Promise<boolean>
  >(
    ({ cancelText, confirmText, message, title }) =>
      new Promise((resolve) => {
        setConfigs([
          ...configs,
          {
            cancelText,
            confirmText,
            id: uniqueId(),
            isOpen: true,
            message,
            onResolve: (result) => resolve(!!result),
            title,
            variant: 'confirm',
          },
        ]);
      }),
    [configs, setConfigs],
  );

  const value = useMemo(
    () => ({
      alert: handleAlert,
      configs,
      confirm: handleConfirm,
      setConfigs,
    }),
    [configs, handleAlert, handleConfirm, setConfigs],
  );

  return (
    <DialogManagerContext.Provider value={value}>
      {children}
    </DialogManagerContext.Provider>
  );
};
