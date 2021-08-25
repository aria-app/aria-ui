import { createContext } from 'react';

import { SnackbarManagerConfig, SnackbarManagerNotifyOptions } from '../types';

export interface SnackbarManagerContextValue {
  configs: SnackbarManagerConfig[];
  notify: (options: SnackbarManagerNotifyOptions) => void;
  setConfigs: (configs: SnackbarManagerConfig[]) => void;
}

export const SnackbarManagerContext =
  createContext<SnackbarManagerContextValue>({
    configs: [],
    notify: () => {
      throw new Error(
        'Snackbar Manager "notify" function was called without a proper provider. Please use the AriaUIProviders or SnackbarManagerProvider.',
      );
    },
    setConfigs: () => {
      throw new Error(
        'Snackbar Manager "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or SnackbarManagerProvider.',
      );
    },
  });
