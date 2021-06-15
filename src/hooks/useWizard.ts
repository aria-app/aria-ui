import { useContext } from 'react';

import { WizardContext, WizardOptions } from '../contexts';

export function useWizard(): WizardOptions {
  return useContext(WizardContext);
}
