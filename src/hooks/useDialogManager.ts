import { useContext } from 'react';

import { DialogManagerContext, DialogManagerContextValue } from '../contexts';

export function useDialogManager(): DialogManagerContextValue {
  return useContext(DialogManagerContext);
}
