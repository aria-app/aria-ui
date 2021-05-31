import { Theme } from '../types';
import { baseTheme } from './baseTheme';

export const lightTheme: Theme = {
  ...baseTheme,
  palette: {
    backgroundDefault: '#f5f5f5',
    textPrimary: '#333',
  },
};
