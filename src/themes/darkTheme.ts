import { Theme } from '../types';
import { baseTheme } from './baseTheme';

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    backgroundDefault: '#333333',
    brandContrast: '#9b9bf9',
    brandPrimary: '#5944ff',
    brandSubtle: '#2f2a9b',
    textPrimary: '#ffffff',
  },
};
