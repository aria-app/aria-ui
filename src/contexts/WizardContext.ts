import { createContext } from 'react';

export interface WizardOptions {
  currentIndex: number;
  goBack: () => void;
  goForward: () => void;
  goToIndex: (index: number) => void;
  stepCount: number;
}

export const WizardContext = createContext<WizardOptions>({
  currentIndex: 0,
  goBack: () => {},
  goForward: () => {},
  goToIndex: () => {},
  stepCount: 0,
});
