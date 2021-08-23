import { createContext } from 'react';

import { DialogManagerConfig, DialogManagerPromptOptions } from '../types';

export interface DialogManagerContextValue {
  configs: DialogManagerConfig[];
  prompt: (options: DialogManagerPromptOptions) => Promise<boolean>;
  setConfigs: (configs: DialogManagerConfig[]) => void;
}

export const DialogManagerContext = createContext<DialogManagerContextValue>({
  configs: [],
  prompt: async () => {
    throw new Error(
      'Dialog Manager "prompt" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
  setConfigs: () => {
    throw new Error(
      'Dialog Manager "setConfigs" function was called without a proper provider. Please use the AriaUIProviders or DialogManagerProvider.',
    );
  },
});
