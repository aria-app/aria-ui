import React, { FC, ReactNode } from 'react';

import { DialogManagerProvider } from './DialogManagerProvider';
import { SnackbarManagerProvider } from './SnackbarManagerProvider';

export interface AriaUIProvidersProps {
  children: ReactNode;
}

export const AriaUIProviders: FC<AriaUIProvidersProps> = (props) => {
  const { children } = props;

  return (
    <DialogManagerProvider>
      <SnackbarManagerProvider>{children}</SnackbarManagerProvider>
    </DialogManagerProvider>
  );
};
