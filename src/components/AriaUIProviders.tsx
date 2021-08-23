import React, { FC, ReactNode } from 'react';

import { ImperativeDialogProvider } from './ImperativeDialogProvider';
import { SnackbarManagerProvider } from './SnackbarManagerProvider';

export interface AriaUIProvidersProps {
  children: ReactNode;
}

export const AriaUIProviders: FC<AriaUIProvidersProps> = (props) => {
  const { children } = props;

  return (
    <ImperativeDialogProvider>
      <SnackbarManagerProvider>{children}</SnackbarManagerProvider>
    </ImperativeDialogProvider>
  );
};
