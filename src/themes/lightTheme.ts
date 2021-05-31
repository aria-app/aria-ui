import { baseTheme } from './baseTheme';
import { Theme } from './theme';

export const lightTheme: Theme = {
  ...baseTheme,
  palette: {
    backgroundDefault: '#f5f5f5',
    textPrimary: '#333',
  },
};
