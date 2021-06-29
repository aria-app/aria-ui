import { createTheme } from './createTheme';

export const darkTheme = createTheme({
  colors: {
    backgroundContrast: '#444455',
    backgroundDefault: '#222238',
    border: '#334',
    brandContrast: '#9b9bf9',
    brandPrimary: '#5944ff',
    brandSubtle: '#2f2a9b',
    error: '#fc381b',
    success: '#6fbf50',
    textPrimary: '#fff',
    textSecondary: '#9696b6',
    warning: '#febb3f',
  },
  disabledOpacity: 0.5,
});
