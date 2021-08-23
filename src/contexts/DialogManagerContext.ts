import { createContext } from 'react';

import {
  DialogManagerAlertOptions,
  DialogManagerConfig,
  DialogManagerConfirmOptions,
} from '../types';

export interface DialogManagerContextValue {
  alert: (options: DialogManagerAlertOptions) => Promise<void>;
  configs: DialogManagerConfig[];
  confirm: (options: DialogManagerConfirmOptions) => Promise<boolean>;
  setConfigs: (configs: DialogManagerConfig[]) => void;
}

export const DialogManagerContext = createContext<DialogManagerContextValue>({
  alert: async () => {
    throw new Error(
      'Dialog Manager "alert" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
  configs: [],
  confirm: async () => {
    throw new Error(
      'Dialog Manager "confirm" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
  setConfigs: () => {
    throw new Error(
      'Dialog Manager "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
});
