import { createContext } from 'react';

import {
  SnackbarManagerAddSnackbarOptions,
  SnackbarManagerConfig,
} from '../types';

export interface SnackbarManagerContextValue {
  addSnackbar: (options: SnackbarManagerAddSnackbarOptions) => void;
  configs: SnackbarManagerConfig[];
  setConfigs: (configs: SnackbarManagerConfig[]) => void;
}

export const SnackbarManagerContext = createContext<SnackbarManagerContextValue>(
  {
    addSnackbar: () => {
      throw new Error(
        'Snackbar Manager "addSnackbar" function was called without a proper provider. Please use the AriaUIProviders or SnackbarManagerProvider.',
      );
    },
    configs: [],
    setConfigs: () => {
      throw new Error(
        'Snackbar Manager "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or SnackbarManagerProvider.',
      );
    },
  },
);
