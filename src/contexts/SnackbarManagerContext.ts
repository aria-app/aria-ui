import { createContext } from 'react';

import { SnackbarManagerConfig } from '../types';

export interface SnackbarManagerContextValue {
  configs: SnackbarManagerConfig[];
  setConfigs: (configs: SnackbarManagerConfig[]) => void;
}

export const SnackbarManagerContext = createContext<SnackbarManagerContextValue>(
  {
    configs: [],
    setConfigs: () => {
      throw new Error(
        'Snackbar Manager "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or SnackbarManagerProvider.',
      );
    },
  },
);
