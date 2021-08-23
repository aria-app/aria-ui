import { uniqueId } from 'lodash';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { DialogManagerContext } from '../contexts';
import { DialogManagerAddDialogOptions, DialogManagerConfig } from '../types';

export interface DialogManagerProviderProps {
  children: ReactNode;
}

export const DialogManagerProvider: FC<DialogManagerProviderProps> = ({
  children,
}) => {
  const [configs, setConfigs] = useState<DialogManagerConfig[]>([]);

  const handleAddDialog = useCallback<
    (options: DialogManagerAddDialogOptions) => Promise<boolean>
  >(
    ({ canCancel, cancelText, confirmText, message, title }) =>
      new Promise((resolve) => {
        setConfigs([
          ...configs,
          {
            canCancel,
            cancelText,
            confirmText,
            id: uniqueId(),
            isOpen: true,
            message,
            onResolve: (result) => resolve(!!result),
            title,
          },
        ]);
      }),
    [configs, setConfigs],
  );

  const value = useMemo(
    () => ({
      addDialog: handleAddDialog,
      configs,
      setConfigs,
    }),
    [configs, handleAddDialog, setConfigs],
  );

  return (
    <DialogManagerContext.Provider value={value}>
      {children}
    </DialogManagerContext.Provider>
  );
};
