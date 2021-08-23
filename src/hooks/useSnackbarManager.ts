import { useContext } from 'react';

import {
  SnackbarManagerContext,
  SnackbarManagerContextValue,
} from '../contexts';

export function useSnackbarManager(): SnackbarManagerContextValue {
  return useContext(SnackbarManagerContext);
}
