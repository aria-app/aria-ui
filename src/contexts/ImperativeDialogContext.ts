import { createContext } from 'react';

import {
  ImperativeDialogAlertOptions,
  ImperativeDialogConfig,
  ImperativeDialogConfirmOptions,
} from '../types';

export interface ImperativeDialogContextValue {
  alert: (options: ImperativeDialogAlertOptions) => Promise<void>;
  configs: ImperativeDialogConfig[];
  confirm: (options: ImperativeDialogConfirmOptions) => Promise<boolean>;
  setConfigs: (configs: ImperativeDialogConfig[]) => void;
}

export const ImperativeDialogContext = createContext<ImperativeDialogContextValue>(
  {
    alert: async () => {
      throw new Error(
        'Imperative Dialog "alert" function was called without a proper provider. Please use the AriaUIProviders or ImperativeDialogProvider.',
      );
    },
    configs: [],
    confirm: async () => {
      throw new Error(
        'Imperative Dialog "confirm" function was called without a proper provider. Please use the AriaUIProviders or ImperativeDialogProvider.',
      );
    },
    setConfigs: () => {
      throw new Error(
        'Imperative Dialog "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or ImperativeDialogProvider.',
      );
    },
  },
);
