import React, { FC } from 'react';

import { DialogManagerOutlet } from './DialogManagerOutlet';
import { SnackbarManagerOutlet } from './SnackbarManagerOutlet';

export type AriaUIOutletsProps = Record<string, never>;

export const AriaUIOutlets: FC<AriaUIOutletsProps> = () => {
  return (
    <>
      <DialogManagerOutlet />
      <SnackbarManagerOutlet />
    </>
  );
};
