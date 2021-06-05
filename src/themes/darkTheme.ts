import readableColor from 'polished/lib/color/readableColor';

import { Theme } from '../types';
import { baseTheme } from './baseTheme';

const colors: Theme['colors'] = {
  backgroundContrast: '#333',
  backgroundDefault: '#555',
  border: '#777',
  brandContrast: '#9b9bf9',
  brandPrimary: '#5944ff',
  brandSubtle: '#2f2a9b',
  error: '#fc381b',
  success: '#6fbf50',
  textPrimary: '#fff',
  textSecondary: '#ccc',
  warning: '#febb3f',
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors,
  getForegroundColor: backgroundColor => {
    const themeColor =
      colors[backgroundColor as keyof Theme['colors']] || backgroundColor;

    if (!themeColor || backgroundColor === 'transparent')
      return colors.textPrimary;

    return readableColor(themeColor, colors.textPrimary);
  },
  getColor: color => {
    const themeColor = colors[color as keyof Theme['colors']];

    if (!color || !themeColor) return color;

    return themeColor;
  },
};
