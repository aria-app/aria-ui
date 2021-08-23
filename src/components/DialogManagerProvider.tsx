import { uniqueId } from 'lodash';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { DialogManagerContext } from '../contexts';
import { DialogManagerConfig, DialogManagerPromptOptions } from '../types';

export interface DialogManagerProviderProps {
  children: ReactNode;
}

export const DialogManagerProvider: FC<DialogManagerProviderProps> = ({
  children,
}) => {
  const [configs, setConfigs] = useState<DialogManagerConfig[]>([]);

  const handlePrompt = useCallback<
    (options: DialogManagerPromptOptions) => Promise<boolean>
  >(
    ({ canCancel, cancelText, confirmText, focusedButton, message, title }) =>
      new Promise((resolve) => {
        setConfigs([
          ...configs,
          {
            canCancel,
            cancelText,
            confirmText,
            focusedButton,
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
      prompt: handlePrompt,
      configs,
      setConfigs,
    }),
    [configs, handlePrompt, setConfigs],
  );

  return (
    <DialogManagerContext.Provider value={value}>
      {children}
    </DialogManagerContext.Provider>
  );
};
