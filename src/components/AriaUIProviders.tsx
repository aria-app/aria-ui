import React, { FC, ReactNode } from 'react';

import { ImperativeDialogProvider } from './ImperativeDialogProvider';

export interface AriaUIProvidersProps {
  children: ReactNode;
}

export const AriaUIProviders: FC<AriaUIProvidersProps> = (props) => {
  const { children } = props;

  return <ImperativeDialogProvider>{children}</ImperativeDialogProvider>;
};
