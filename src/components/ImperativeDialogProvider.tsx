import { uniqueId } from 'lodash';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { ImperativeDialogContext } from '../contexts';
import {
  ImperativeDialogAlertOptions,
  ImperativeDialogConfig,
  ImperativeDialogConfirmOptions,
} from '../types';

export interface ImperativeDialogProviderProps {
  children: ReactNode;
}

export const ImperativeDialogProvider: FC<ImperativeDialogProviderProps> = ({
  children,
}) => {
  const [configs, setConfigs] = useState<ImperativeDialogConfig[]>([]);

  const handleAlert = useCallback<
    (options: ImperativeDialogAlertOptions) => Promise<void>
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
    (options: ImperativeDialogConfirmOptions) => Promise<boolean>
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
    <ImperativeDialogContext.Provider value={value}>
      {children}
    </ImperativeDialogContext.Provider>
  );
};
