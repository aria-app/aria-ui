import { createContext } from 'react';

import { DialogManagerAddDialogOptions, DialogManagerConfig } from '../types';

export interface DialogManagerContextValue {
  addDialog: (options: DialogManagerAddDialogOptions) => Promise<boolean>;
  configs: DialogManagerConfig[];
  setConfigs: (configs: DialogManagerConfig[]) => void;
}

export const DialogManagerContext = createContext<DialogManagerContextValue>({
  addDialog: async () => {
    throw new Error(
      'Dialog Manager "addDialog" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
  configs: [],
  setConfigs: () => {
    throw new Error(
      'Dialog Manager "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
});
