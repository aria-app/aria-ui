import { Theme } from '../types';
import { baseTheme } from './baseTheme';

export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    backgroundDefault: '#f5f5f5',
    brandContrast: '#2f2a9b',
    brandPrimary: '#5944ff',
    brandSubtle: '#9b9bf9',
    textPrimary: '#333333',
  },
};
