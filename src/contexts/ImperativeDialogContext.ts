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
    alert: async () => undefined,
    configs: [],
    confirm: async () => false,
    setConfigs: () => {},
  },
);
