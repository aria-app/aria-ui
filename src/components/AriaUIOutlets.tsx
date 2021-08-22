import React, { FC } from 'react';

import { ImperativeDialogOutlet } from './ImperativeDialogOutlet';

export type AriaUIOutletsProps = Record<string, never>;

export const AriaUIOutlets: FC<AriaUIOutletsProps> = () => {
  return (
    <>
      <ImperativeDialogOutlet />
    </>
  );
};
