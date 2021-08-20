import { useContext } from 'react';

import {
  ImperativeDialogContext,
  ImperativeDialogContextValue,
} from '../contexts';

export function useImperativeDialog(): ImperativeDialogContextValue {
  return useContext(ImperativeDialogContext);
}
