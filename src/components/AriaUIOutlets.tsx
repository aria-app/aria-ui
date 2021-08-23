import React, { FC } from 'react';

import { ImperativeDialogOutlet } from './ImperativeDialogOutlet';
import { SnackbarManagerOutlet } from './SnackbarManagerOutlet';

export type AriaUIOutletsProps = Record<string, never>;

export const AriaUIOutlets: FC<AriaUIOutletsProps> = () => {
  return (
    <>
      <ImperativeDialogOutlet />
      <SnackbarManagerOutlet />
    </>
  );
};
